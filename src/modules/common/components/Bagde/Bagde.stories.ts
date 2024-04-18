import type { Meta, StoryObj } from "@storybook/react";

import Badge from ".";
// import Badge from "@/modules/common/components/Badge.tsx";

const meta = {
  title: "components/Badge",
  component: Badge as React.ComponentType<any> | undefined,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Success: Story = {
  args: {
    children: "Success",
    type: "success",
  },
};
export const Warning: Story = {
  args: {
    children: "warning",
    type: "warning",
  },
};
export const Error: Story = {
  args: {
    children: "error",
    type: "error",
  },
};
