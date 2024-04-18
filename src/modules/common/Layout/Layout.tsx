import { useMemo } from "react";

import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { useApolloStatusStore } from "../stores/apollo-store";

import LayoutContext from "./LyoutContext";

import { LoadingType } from "@/modules/helpers/loader-helpers";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const contextValue = useMemo(() => ({}), []);

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
