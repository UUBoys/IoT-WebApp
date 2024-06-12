import type { Meta, StoryObj } from "@storybook/react";

import RoomWithPlants from ".";

import { uuid } from "@/modules/helpers/general";

const meta: Meta<typeof RoomWithPlants> = {
  component: RoomWithPlants,
  title: "Components/SpaceWithDevices",
};

export default meta;
type Story = StoryObj<typeof RoomWithPlants>;

export const Default: Story = {
  args: {
    room: {
      id: uuid(),
      name: "Obývák",
      plants: [
        {
          id: "1",
          name: "Philips Hue",
          description: "RGB LED Strip",
          imageUrl:
            "https://images.unsplash.com/photo-1612834420304-4e0b0e6f8c1b",
          mesurements: [],
          type: "RGB LED Strip",
        },
        {
          id: "1",
          name: "Philips Hue",
          description: "RGB LED Strip",
          imageUrl:
            "https://images.unsplash.com/photo-1612834420304-4e0b0e6f8c1b",
          mesurements: [],
          type: "RGB LED Strip",
        },
        {
          id: "1",
          name: "Philips Hue",
          description: "RGB LED Strip",
          imageUrl:
            "https://images.unsplash.com/photo-1612834420304-4e0b0e6f8c1b",
          mesurements: [],
          type: "RGB LED Strip",
        },
      ],
    },
  },
};
