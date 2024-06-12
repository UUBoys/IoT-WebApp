import { useQuery } from "@apollo/client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Query } from "@/generated/graphql";
import { CHECK_PAIRING_PROCESS } from "@/modules/GRAPHQL/queries/CheckPairingProcess";

interface IUseCheckPairingProccessHook {
  isPaired: boolean | null;
  loading: boolean;
  error: string | null;
  setPairingCode: Dispatch<SetStateAction<string>>;
}

export const useCheckPairingProccess = (
  pairingCodePar?: string
): IUseCheckPairingProccessHook => {
  const [isPaired, setIsPaired] = useState<boolean | null>(false);
  const [pairingCode, setPairingCode] = useState<string>(pairingCodePar ?? "");
  const [debouncedPairingCode, setDebouncedPairingCode] =
    useState<string>(pairingCode);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  // Set loading state and start time when pairing code is set
  useEffect(() => {
    if (pairingCode && pairingCode !== "") {
      setLoading(true);
      setLoadingStartTime(Date.now());
    }
  }, [pairingCode]);

  // Debounce the pairing code update
  useEffect(() => {
    if (loadingStartTime !== null) {
      const elapsed = Date.now() - loadingStartTime;
      if (elapsed < 5000) {
        const handler = setTimeout(() => {
          setDebouncedPairingCode(pairingCode);
        }, 5000 - elapsed);

        return () => {
          clearTimeout(handler);
        };
      } else {
        setDebouncedPairingCode(pairingCode);
      }
    } else {
      setDebouncedPairingCode(pairingCode);
    }
  }, [pairingCode, loadingStartTime]);

  // Check for timeout
  useEffect(() => {
    if (loading && loadingStartTime !== null) {
      const timeoutHandler = setTimeout(
        () => {
          if (Date.now() - loadingStartTime >= 15000) {
            setError("Timeout");
            setLoading(false);
          }
        },
        15000 - (Date.now() - loadingStartTime)
      );

      return () => {
        clearTimeout(timeoutHandler);
        setPairingCode("");
      };
    }
  }, [loading, loadingStartTime]);
  const { data, error: queryError } = useQuery<Query>(CHECK_PAIRING_PROCESS, {
    fetchPolicy: "cache-and-network",
    pollInterval: 3000,
    context: { shouldTrackStatus: false, withConfirmation: false },
    variables: { pairingCode: debouncedPairingCode },
    skip: debouncedPairingCode === "" || !debouncedPairingCode,
  });
  // Update state based on query results
  useEffect(() => {
    if (queryError) {
      setError("Something went wrong!");
      setLoading(false);
    } else if (data) {
      console.log(data);
      if (
        !data.checkPairingProcess.serverPaired ||
        !data.checkPairingProcess.userPaired
      ) {
        setIsPaired(false);
        setLoading(true);
        return;
      }
      setIsPaired(true);
      setPairingCode("");
      setLoading(false);
      console.log("Completed");
      setLoadingStartTime(null); // Reset loading start time on successful completion
    }
  }, [data, queryError]);
  console.log(debouncedPairingCode);

  return {
    isPaired,
    loading,
    error,
    setPairingCode,
  };
};