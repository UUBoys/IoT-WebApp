import clsx from "clsx";
import { useRouter } from "next/router";
import { useMemo } from "react";

import Loader from "../components/Loader";
import { useApolloStatusStore } from "../stores/apollo-store";

import LayoutContext from "./LyoutContext";

import { isInRestrictedPath } from "@/modules/helpers/general";
import { LoadingType } from "@/modules/helpers/loader-helpers";

import Navbar from "../components/Navbar";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const contextValue = useMemo(() => ({}), []);
  const { pathname } = useRouter();

  const { isLoading, isError, isSuccess, isWithConfirmation } =
    useApolloStatusStore((set) => ({
      isLoading: set.isLoading,
      isError: set.isError,
      isSuccess: set.isSuccess,
      isWithConfirmation: set.isWithConfirmation,
    }));

  return (
    <LayoutContext.Provider value={contextValue}>
      {" "}
      <div className="z-[1000] flex min-h-screen flex-col">
        <Navbar />
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
        <div
          className={clsx(
            !isInRestrictedPath(pathname) && "pt-[64px] sm:pl-[64px]",
            "grow"
          )}
        >
          {children}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
