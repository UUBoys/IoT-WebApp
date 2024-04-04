// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import Menu from "@/modules/common/components/Menu";

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: "Components/Menu",
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    children: <p>Menu</p>,
    className: "text-black",
    items: [
      {
        label: "profile",
        onClick: (e) => console.log(e),
      },
      {
        label: "settings",
        onClick: (e) => console.log(e),
      },
      {
        label: "logout",
        onClick: (e) => console.log(e),
      },
    ],
  },
};
