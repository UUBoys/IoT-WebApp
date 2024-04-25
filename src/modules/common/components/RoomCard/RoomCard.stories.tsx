import type { Meta, StoryObj } from "@storybook/react";

import RoomCard from ".";

import { uuid } from "@/modules/helpers/general";

const meta: Meta<typeof RoomCard> = {
  component: RoomCard,
  title: "Components/RoomCard",
};

export default meta;
type Story = StoryObj<typeof RoomCard>;

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
          image: "https://images.unsplash.com/photo-1612834420304-4e0b0e6f8c1b",
          mesurements: [
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
          ],
          type: "RGB",
        },
        {
          id: "2",
          name: "Philips Hue",
          description: "RGB LED Strip",
          image: "https://images.unsplash.com/photo-1612834420304-4e0b0e6f8c1b",
          mesurements: [
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
          ],
          type: "RGB",
        },
        {
          id: "3",
          name: "Philips Hue",
          description: "RGB LED Strip",
          image: "https://images.unsplash.com/photo-1612834420304-4e0b0e6f8c1b",
          mesurements: [
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
          ],
          type: "RGB",
        },
        {
          id: "4",
          name: "Philips Hue",
          description: "RGB LED Strip",
          image: "https://images.unsplash.com/photo-1612834420304-4e0b0e6f8c1b",
          mesurements: [
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
            {
              id: uuid(),
              value: 25,
              date: new Date(),
            },
          ],
          type: "RGB",
        },
      ],
    },
    className: "w-[300px]",
  },
};
