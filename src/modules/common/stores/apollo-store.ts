import { create } from "zustand";

import { LoadingType } from "@/modules/helpers/loader-helpers";

type RequestStatus = {
  id: string;
  type: LoadingType;
  requestName?: string;
  isError?: boolean;
};

type ApolloStatusState = {
  requestQueue: RequestStatus[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isWithConfirmation: boolean;
};

type ApolloStatusActions = {
  addRequest: (request: RequestStatus) => void;
  removeRequest: (id: string) => void;
  updateRequest: (id: string, status: { isError: boolean }) => void;
  checkFinalStatus: () => void;
};

export const useApolloStatusStore = create<
  ApolloStatusState & ApolloStatusActions
>((set) => ({
  requestQueue: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isWithConfirmation: false,
  addRequest: (request) => {
    set((state) => ({
      ...state,
      isLoading: true,
      isSuccess: state.requestQueue.length === 0 ? false : state.isSuccess,
      requestQueue: [...state.requestQueue, request],
      isWithConfirmation: state.requestQueue.some((req) => {
        return req.type === LoadingType.WITH_CONFIRM;
      }),
    }));
  },
  updateRequest: (id: string, status: { isError: boolean }) =>
    set((state) => ({
      ...state,
      requestQueue: state.requestQueue.map((req) =>
        req.id === id ? { ...req, ...status } : req
      ),
    })),
  removeRequest: (id) =>
    set((state) => ({
      ...state,
      isWithConfirmation: state.requestQueue.some((req) => {
        return req.type === LoadingType.WITH_CONFIRM;
      }),
      requestQueue: state.requestQueue.filter((req) => req.id !== id),
    })),
  checkFinalStatus: () =>
    set((state) => {
      const isError = state.requestQueue.some((req) => req.isError);
      const isSuccess = !isError;
      return {
        ...state,
        isLoading: state.requestQueue.length > 0,
        isError,
        isSuccess,
      };
    }),
}));
