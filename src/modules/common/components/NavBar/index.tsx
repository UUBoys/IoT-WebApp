/* eslint-disable sonarjs/no-duplicate-string */
import { Menu as HeadlessMenu } from "@headlessui/react";
import AodRoundedIcon from "@mui/icons-material/AodRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MoneyRoundedIcon from "@mui/icons-material/MoneyRounded";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useUserAdditionalDataStore } from "../../stores/user-aditional-data-store";
import LanguageSelector from "../LanguageSelector";

import Menu from "@/modules/common/components/Menu";

const navbarAllowedRoutes = [
  "/",
  "/events",
  "/buyCredits",
  "/clubs",
  "/profile",
  "/profile/settings",
  "/feed",
  "/club/create",
  "/club/*",
  "/clubs",
  "/events/*",
  "/tickets/*",
];

const regexPatterns = navbarAllowedRoutes.map((route) => {
  // Escape forward slashes and replace '*' with '.*' for wildcard matches
  const pattern = route.replace(/\//g, "\\/").replace(/\*/g, ".*");
  return `^${pattern}$`; // The ^ and $ ensure the pattern matches the whole path
});

// Combine all regex patterns into one
const combinedPattern = regexPatterns.join("|");
const routeRegex = new RegExp(combinedPattern);

const NavBar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { pathname, push } = useRouter();
  const { data: session } = useSession();
  const { credits } = useUserAdditionalDataStore((set) => ({
    credits: set.credits,
  }));

  const isRouteAllowed = (routePathname: string) => {
    return routeRegex.test(routePathname);
  };

  if (!isRouteAllowed(pathname)) return null;

  const navigation = [
    {
      name: t("components.navbar.links.events"),
      href: "/events",
      current: pathname === "/events",
      ico: <LocalActivityRoundedIcon sx={{ fontSize: "20px" }} />,
    },
    {
      name: t("components.navbar.links.myTickets"),
      href: "/tickets/myTickets",
      current: pathname === "/tickets/myTickets",
      ico: <AodRoundedIcon sx={{ fontSize: "20px" }} />,
    },
    {
      name: t("components.navbar.links.credits"),
      href: "/buyCredits",
      current: pathname === "/buyCredits",
      ico: <MoneyRoundedIcon sx={{ fontSize: "20px" }} />,
    },
    {
      name: t("components.navbar.links.clubs"),
      href: "/clubs",
      current: pathname === "/clubs",
      ico: <Groups2RoundedIcon sx={{ fontSize: "20px" }} />,
    },
  ];

  return (
    <>
      {/* MOBILE NAVBAR */}
      <div className="fixed left-[5%] top-[10px] z-20 block w-[90%] rounded-lg  bg-white shadow-2xl transition-all lg:hidden">
        <div className="flex w-full items-center justify-between p-[10px]">
          <Link className="flex text-[20px] font-bold" href="/">
            <p className="text-primary">Q</p>
            <p className="text-black">APP</p>
          </Link>
          <div className="flex items-center gap-[20px]">
            <div className="bg-primary flex cursor-pointer items-center  gap-[10px] rounded-full px-[20px] text-center font-bold text-white transition-all hover:shadow-xl">
              <Link
                href="/buyCredits"
                className="relative flex items-center gap-[10px] p-1 text-sm"
              >
                <LocalAtmRoundedIcon className="h-6 w-6 " aria-hidden="true" />
                {credits}
              </Link>
            </div>
            {isMenuOpen ? (
              <CloseRoundedIcon
                sx={{ fontSize: "30px", color: "black" }}
                onClick={() => setIsMenuOpen(false)}
              />
            ) : (
              <MenuRoundedIcon
                sx={{ fontSize: "30px", color: "black" }}
                onClick={() => setIsMenuOpen(true)}
              />
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div className="flex flex-col ">
            <div className="flex justify-between border-b border-b-gray-200">
              {session?.user && (
                <Menu
                  menuClassName="left-[20px]"
                  items={[
                    {
                      label: t("components.navbar.links.userOptions.account"),
                      onClick: () => push("/profile"),
                    },
                    {
                      label: t("components.navbar.links.userOptions.myClubs"),
                      onClick: () => push("/club/myClubs"),
                    },
                    {
                      label: t("components.navbar.links.userOptions.settings"),
                      onClick: () => push("/profile/settings"),
                    },
                    {
                      label: t("components.navbar.links.userOptions.logout"),
                      onClick: () => signOut(),
                    },
                  ]}
                >
                  <HeadlessMenu.Button className="flex flex-col gap-[3px] pb-[10px]">
                    <p className="text-[14px] font-semibold text-gray-500">
                      Testovaci ucet
                    </p>
                    <p className="text-[12px] text-gray-400">test@test.com</p>
                  </HeadlessMenu.Button>
                </Menu>
              )}
              {/* <Link className="flex flex-col p-[10px]" href="/profile">
                <p className="text-[14px] font-semibold text-gray-500">
                  Testovaci ucet
                </p>
                <p className="text-[12px] text-gray-400">test@test.com</p>
              </Link> */}
              <LanguageSelector className="mr-[10px] max-w-[66px]" />
            </div>
            <div className="my-[10px] flex flex-col gap-[10px] px-[10px]">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    item.current
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-secondary-500 hover:text-white",
                    "flex items-center gap-[10px] rounded-md px-3 py-2 text-sm font-medium transition-all"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.ico}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
