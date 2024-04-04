/* eslint-disable react/no-array-index-key */
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";

import qUpLoaderAnimation from "../../../../../public/animations/loader-animation.json";
import qUpLoaderFailedAnimation from "../../../../../public/animations/qup-loader-fail-animation.json";
import qUpLoaderSuccessAnimation from "../../../../../public/animations/qup-loader-success-animation.json";

import { LoadingType } from "@/modules/helpers/loader-helpers";

type LoaderProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  isCustom?: boolean;
  loadingType?: LoadingType;
};

const Loader: React.FC<LoaderProps> = ({
  children,
  isLoading,
  isSuccess,
  isError,
  isCustom,
  loadingType,
}) => {
  const [isEnded, setIsEnded] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) setIsEnded(false);
  }, [isLoading]);

  if (isEnded) return null;

  if (!isCustom && (isLoading || isSuccess || isError)) {
    if (isLoading) {
      return (
        <div className="absolute left-0 top-0 z-[1000] ">
          <div className="fixed flex h-screen w-full flex-col  items-center justify-center bg-black/50 backdrop-blur-md transition-all">
            <Lottie
              animationData={qUpLoaderAnimation}
              loop
              className="w-1/4  "
            />{" "}
            <div className="mt-[-70px] bg-gradient-to-b from-[#ff8b56] to-[#fe592b] !bg-clip-text text-[20px] font-bold text-transparent md:text-[60px]">
              Načítání...
            </div>
          </div>
        </div>
      );
    }
    if (isSuccess && loadingType === LoadingType.WITH_CONFIRM) {
      setTimeout(() => {
        setIsEnded(true);
      }, 2000);
      return (
        <div className="absolute left-0 top-0 z-[1000] ">
          <div className="fixed flex h-screen w-full flex-col  items-center justify-center bg-black/50 backdrop-blur-md transition-all">
            <Lottie
              animationData={qUpLoaderSuccessAnimation}
              loop={false}
              className="w-1/4 "
            />
          </div>
        </div>
      );
    }
    if (isError && loadingType === LoadingType.WITH_CONFIRM) {
      setTimeout(() => {
        setIsEnded(true);
      }, 2000);
      return (
        <div className="absolute left-0 top-0 z-[1000] ">
          <div className="fixed flex h-screen w-full flex-col  items-center justify-center bg-black/50 backdrop-blur-md transition-all">
            <Lottie
              animationData={qUpLoaderFailedAnimation}
              loop={false}
              className="w-1/4 "
            />
          </div>
        </div>
      );
    }
  }
  if (!children) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-[1000] ">
      <div className="fixed flex h-screen w-full flex-col  items-center justify-center bg-black/50 backdrop-blur-md transition-all">
        {children}
      </div>
    </div>
  );
};

export default Loader;
