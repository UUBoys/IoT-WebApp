import type { Meta, StoryObj } from "@storybook/react";

import LanguageSelector from "@/modules/common/components/LanguageSelector";

const meta: Meta<typeof LanguageSelector> = {
  component: LanguageSelector,
  title: "Components/LanguageSelector",
};

export default meta;
type Story = StoryObj<typeof LanguageSelector>;

export const Default: Story = {
  args: {
    className: "max-w-[66px]",
  },
};
