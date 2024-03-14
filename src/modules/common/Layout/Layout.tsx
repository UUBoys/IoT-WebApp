import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo } from "react";

import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { useTicketsForUser } from "../hooks/QueryHooks/useTicketsForUserHook";
import { useApolloStatusStore } from "../stores/apollo-store";
import { useUserAdditionalDataStore } from "../stores/user-aditional-data-store";

import LayoutContext from "./LyoutContext";

import { GetEstablishmentsResponse, Query } from "@/generated/graphql";
import { GET_CREDIT } from "@/modules/GRAPHQL/queries/GetCreditQuery";
import { GET_ESTABLISHMENTS_FOR_USER } from "@/modules/GRAPHQL/queries/GetEstablishmentForUser";
import { LoadingType } from "@/modules/helpers/loader-helpers";
import { IClub } from "@/modules/utils/schemas/club";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  const { tickets, refetchTickets } = useTicketsForUser();
  const { setCredits, setUserOwnedClubs, setUserOwnedTickets } =
    useUserAdditionalDataStore((set) => ({
      setCredits: set.setCredits,
      setUserOwnedClubs: set.setUserOwnedClubs,
      setUserOwnedTickets: set.setUserOwnedTickets,
    }));

  const { isLoading, isError, isSuccess, isWithConfirmation } =
    useApolloStatusStore((set) => ({
      isLoading: set.isLoading,
      isError: set.isError,
      isSuccess: set.isSuccess,
      isWithConfirmation: set.isWithConfirmation,
    }));

  const { data: queryResult, refetch: refetchCredit } = useQuery<Query>(
    GET_CREDIT,
    {
      context: { shouldTrackStatus: true, withConfirmation: false },
    }
  );
  const { refetch: refetchClubs } = useQuery<Query>(
    GET_ESTABLISHMENTS_FOR_USER,
    {
      context: { shouldTrackStatus: true },
      onCompleted(data) {
        if (
          !data.getEstablishmentsForUser?.establishments ||
          data.getEstablishmentsForUser?.establishments?.length <= 0
        )
          return;
        if (data.getEstablishmentsForUser !== null)
          setUserOwnedClubs([
            ...((data.getEstablishmentsForUser as GetEstablishmentsResponse)
              .establishments as IClub[]),
          ]);
      },
    }
  );

  useEffect(() => {
    if (tickets) setUserOwnedTickets([...tickets]);
  }, [setUserOwnedTickets, tickets]);

  const refetchAll = useCallback(async () => {
    refetchCredit();
    refetchClubs();
    refetchTickets();
  }, [refetchCredit, refetchClubs, refetchTickets]);

  useEffect(() => {
    if (session?.user) {
      refetchAll();
    }
  }, [refetchAll, session?.user]);

  useEffect(() => {
    if (queryResult?.getCredit?.balance)
      setCredits(queryResult?.getCredit?.balance as number);
  }, [queryResult, setCredits]);

  const contextValue = useMemo(
    () => ({
      refetchAll,
      refetchCredit,
      refetchClubs,
      refetchTickets,
    }),
    [refetchAll, refetchCredit, refetchClubs, refetchTickets]
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      {" "}
      <div className="z-[1000] flex min-h-screen flex-col">
        <NavBar />
        <Loader
          isCustom={false}
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
          loadingType={
            isWithConfirmation
              ? LoadingType.WITH_CONFIRM
              : LoadingType.WITHOUT_CONFIRM
          }
        />
        <div className="grow">{children}</div>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
