import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Select, { SelectItemProps } from "@/modules/common/components/Select";

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Components/Select",
};

const items: SelectItemProps[] = [
  {
    label: "profile",
    value: "profile - test",
  },
  {
    label: "test",
    value: "profile - test",
  },
];

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = () => {
  const [selected, setSelected] = useState<SelectItemProps | undefined>(
    undefined
  );

  const handleSelectedChange = (e: SelectItemProps) => setSelected(e);

  return (
    <div>
      <p className="text-black">selected item {selected && selected.label}</p>
      <Select
        items={items}
        defaultSelected={selected}
        onSelectedChange={handleSelectedChange}
        className="w-[300px]"
      />
    </div>
  );
};
Default.args = {};
