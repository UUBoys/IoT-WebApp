/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import { Combobox, Transition } from "@headlessui/react";
import { ArrowDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";

export type AutocompleteItemProps = {
  label: string;
  // PORTFIX: fix this!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

type AutocompleteProps = {
  options: AutocompleteItemProps[];
  defaultSelected?: AutocompleteItemProps;
  defaultInputValue?: string;
  onChange?: (e: AutocompleteItemProps | undefined) => void;
  className?: string;
};

const Autocomplete = ({
  options,
  defaultSelected,
  defaultInputValue,
  onChange,
  className = "",
}: AutocompleteProps) => {
  const [selected, setSelected] = useState<AutocompleteItemProps | undefined>(
    defaultSelected || undefined
  );
  const [query, setQuery] = useState<string>(defaultInputValue || "");
  const [filteredItems, setFilteredItems] =
    useState<AutocompleteItemProps[]>(options);

  useEffect(() => {
    if (query) {
      setFilteredItems(
        options.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredItems(options);
    }
  }, [options, query]);

  useEffect(() => {
    const _option = options.find((item) => item.value === selected);
    if (_option) {
      if (onChange) onChange(_option);
      setQuery(_option.label);
    }
  }, [onChange, options, selected]);

  return (
    <div className={`${className}`}>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg !bg-background-50 text-left  sm:text-sm">
            <Combobox.Input
              className="w-full border-none !bg-background-50 pr-10 text-sm leading-5 text-gray-400 focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
              value={query}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ArrowDownIcon
                className="h-5 w-5 text-gray-700"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md !bg-background-50 py-1 text-base shadow-lg ring-1  focus:outline-none sm:text-sm">
              {filteredItems.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-600">
                  Nic tu není 😔
                </div>
              ) : (
                filteredItems.map(
                  (item: AutocompleteItemProps, index: number) => (
                    <Combobox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-primary text-gray-300" : "text-gray-700"
                        }`
                      }
                      value={item.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item.label}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-gray-300" : "text-white"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  )
                )
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default Autocomplete;
