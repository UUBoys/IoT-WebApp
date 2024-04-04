// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import NavBar from "@/modules/common/components/NavBar";

const meta: Meta<typeof NavBar> = {
  component: NavBar,
  title: "Components/Navbar",
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  args: {},
};
