import type { Meta, StoryObj } from "@storybook/react";
import Lottie from "lottie-react";

import qUpLoaderAnimation from "../../../../../public/animations/qup-loader-animation.json";
import qUpLoaderFailedAnimation from "../../../../../public/animations/qup-loader-fail-animation.json";
import qUpLoaderSuccessAnimation from "../../../../../public/animations/qup-loader-success-animation.json";

import Loader from "@/modules/common/components/Loader";

const meta: Meta<typeof Loader> = {
  component: Loader,
  title: "Components/Loader",
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Lottie
          animationData={qUpLoaderAnimation}
          loop
          className="w-1/4 invert "
        />{" "}
        <div className="mt-[-70px] bg-gradient-to-b from-[#ff8b56] to-[#fe592b] !bg-clip-text text-[20px] font-bold text-transparent md:text-[60px]">
          Načítání...
        </div>
      </>
    ),
  },
};

export const Failed: Story = {
  args: {
    children: (
      <Lottie
        animationData={qUpLoaderFailedAnimation}
        loop={false}
        className="w-1/4 "
      />
    ),
  },
};

export const Success: Story = {
  args: {
    children: (
      <>
        <Lottie
          animationData={qUpLoaderSuccessAnimation}
          loop={false}
          className="w-1/4 "
        />{" "}
      </>
    ),
  },
};
