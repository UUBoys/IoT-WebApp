import { useMemo } from "react";

import Loader from "../components/Loader";
import NavBar from "../components/NavBar";

import LayoutContext from "./LyoutContext";

import { LoadingType } from "@/modules/helpers/loader-helpers";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const contextValue = useMemo(() => ({}), []);

  return (
    <LayoutContext.Provider value={contextValue}>
      {" "}
      <div className="z-[1000] flex min-h-screen flex-col">
        <NavBar />
        <Loader
          isCustom={false}
          isError={false}
          isLoading={false}
          isSuccess={false}
          loadingType={LoadingType.WITHOUT_CONFIRM}
        />
        <div className="grow">{children}</div>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
