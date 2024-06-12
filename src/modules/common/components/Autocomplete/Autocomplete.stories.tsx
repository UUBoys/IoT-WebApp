import type { Meta, StoryObj } from "@storybook/react";

import Autocomplete, {
  AutocompleteItemProps,
} from "@/modules/common/components/Autocomplete";

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  title: "Components/Autocomplete",
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const items: AutocompleteItemProps[] = [
  {
    label: "Test",
    value: [],
  },
  {
    label: "Admin",
    value: [],
  },
  {
    label: "testovani",
    value: {},
  },
];

export const Default: Story = {
  args: {
    options: items,
  },
};
