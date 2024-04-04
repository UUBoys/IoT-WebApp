/* eslint-disable react/no-array-index-key */
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

export type MenuItemProps = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: (menu?: MenuItemProps) => void;
  className?: string;
  render?: (menu: MenuItemProps) => React.ReactNode;
};

type MenuProps = {
  className?: string;
  items: MenuItemProps[];
  children: React.ReactNode;
  menuClassName?: string;
};

const Menu: React.FC<MenuProps> = ({
  items,
  children,
  className,
  menuClassName = "",
}) => {
  const { push } = useRouter();

  const handleClick = (e: MenuItemProps) => {
    if (e.onClick) {
      e.onClick(e);
    }
    if (e.href) {
      push(e.href);
    }
  };

  return (
    <HeadlessMenu as="div" className="relative ml-3">
      <div>
        <HeadlessMenu.Button className={className || ""}>
          {children}
        </HeadlessMenu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessMenu.Items
          className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 focus:outline-none ${menuClassName} shadow-2xl`}
        >
          <div className="p-1 ">
            {items.map((item, index) => {
              if (item.render) {
                return item.render(item);
              }
              return (
                <HeadlessMenu.Item key={index}>
                  {({ active }) => (
                    <button
                      onClick={() => handleClick(item)}
                      className={`${
                        active ? "bg-[#FFAD32] text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md p-2 text-sm`}
                    >
                      {item.label}
                    </button>
                  )}
                </HeadlessMenu.Item>
              );
            })}
          </div>
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
};

export default Menu;
