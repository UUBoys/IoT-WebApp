/* eslint-disable react/no-array-index-key */
import { Listbox, Transition } from "@headlessui/react";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type SelectItemProps = {
  label: string;
  value?: any;
  render?: (e: SelectItemProps) => React.ReactNode;
  className?: string;
};

type SelectProps = {
  items: SelectItemProps[];
  defaultSelected?: SelectItemProps | undefined;
  onSelectedChange?: (item: SelectItemProps) => void;
  className?: string;
};

const Select: React.FC<SelectProps> = ({
  items,
  defaultSelected,
  onSelectedChange,
  className,
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(defaultSelected || undefined);

  useEffect(() => {
    if (onSelectedChange && selected) {
      onSelectedChange(selected);
    }
  }, [selected]);

  return (
    <div className={className || ""}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-[#FFAD32] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            {selected ? (
              <span className="block truncate text-black">
                {selected && selected.label}
              </span>
            ) : (
              <span className="block truncate text-gray-400">
                {t("components.select.placeholder")}
              </span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ExpandMoreIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, index) => (
                <Listbox.Option
                  key={`${index}key`}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-[rgba(255,173,50,0.1)] text-[#FFAD32]"
                        : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected: selectedItem }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selectedItem ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.label}
                      </span>
                      {selectedItem ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon
                            sx={{ fontSize: "18px", color: "#FFAD32" }}
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
