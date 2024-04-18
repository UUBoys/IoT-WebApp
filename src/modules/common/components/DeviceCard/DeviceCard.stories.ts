import type { Meta, StoryObj } from "@storybook/react";

import DeviceCard from ".";

const meta: Meta<typeof DeviceCard> = {
  component: DeviceCard,
  title: "Components/DeviceCard",
};

export default meta;
type Story = StoryObj<typeof DeviceCard>;

export const Default: Story = {
  args: {
    device: {
      description: "Toto je rostlinka lilie. Potřebuje zalévat každý den.",
      id: "sl213-1flfn-3121j-sfnk23",
      image: "",
      name: "Lilie 1",
    },
    className: "max-w-[66px]",
  },
};
