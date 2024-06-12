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
      imageUrl: "",
      name: "Lilie 1",
      type: "type",
      mesurements: [],
    },
    className: "max-w-[66px]",
  },
};
