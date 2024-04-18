// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import Button from ".";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button Default",
    color: "primary",
  },
};
