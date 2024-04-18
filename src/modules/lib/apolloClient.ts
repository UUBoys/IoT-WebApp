/* eslint-disable sonarjs/cognitive-complexity */
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

import { useApolloStatusStore } from "../common/stores/apollo-store";
import { uuid } from "../helpers/general";
import { LoadingType } from "../helpers/loader-helpers";

const httpLink = createHttpLink({
  uri: "/api/",
});

const statusLink = new ApolloLink((operation, forward) => {
  if (!forward) return null;

  const { withConfirmation, shouldTrackStatus } = operation.getContext();
  if (!shouldTrackStatus) return forward(operation);

  const requestId = uuid();

  if (
    useApolloStatusStore
      .getState()
      .requestQueue.find((req) => req.requestName === operation.operationName)
  ) {
    const duplicateRequest = useApolloStatusStore
      .getState()
      .requestQueue.find((req) => req.requestName === operation.operationName);
    if (duplicateRequest)
      useApolloStatusStore.getState().removeRequest(duplicateRequest.id);
  }

  useApolloStatusStore.getState().addRequest({
    id: requestId,
    requestName: operation.operationName,
    type: withConfirmation
      ? LoadingType.WITH_CONFIRM
      : LoadingType.WITHOUT_CONFIRM,
  });

  return new Observable((observer) => {
    let handle: any;
    Promise.resolve(operation)
      .then((oper) => forward(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: (result) => {
            if (result.errors) {
              useApolloStatusStore.getState().updateRequest(requestId, {
                isError: true,
              });
              useApolloStatusStore.getState().removeRequest(requestId);
              useApolloStatusStore.getState().checkFinalStatus();
              console.error(result.errors);
              observer.error(result.errors ?? "Internal Server Error");
            } else {
              useApolloStatusStore.getState().updateRequest(requestId, {
                isError: false,
              });
              useApolloStatusStore.getState().removeRequest(requestId);
              useApolloStatusStore.getState().checkFinalStatus();
              observer.next(result);
            }
          },
          error: (error) => {
            useApolloStatusStore.getState().updateRequest(requestId, {
              isError: true,
            });
            useApolloStatusStore.getState().removeRequest(requestId);
            useApolloStatusStore.getState().checkFinalStatus();
            if (observer.error) observer.error(error);
          },
          complete: observer.complete.bind(observer),
        });
      })
      .catch((error) => {
        useApolloStatusStore.getState().updateRequest(requestId, {
          isError: true,
        });
        useApolloStatusStore.getState().removeRequest(requestId);
        useApolloStatusStore.getState().checkFinalStatus();

        observer.error(error);
      });

    return () => {
      if (handle) handle.unsubscribe();
    };
  });
});

const authLink = setContext(async (_, { headers }) => {
  // Attempt to fetch the session from NextAuth client-side
  const session = await getSession();

  const token = session?.accessToken;
  return {
    headers: {
      ...headers,
      ...(token && { authorization: token ?? "" }),
    },
  };
});

const combinedLink = authLink.concat(statusLink);

const client = new ApolloClient({
  link: combinedLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
