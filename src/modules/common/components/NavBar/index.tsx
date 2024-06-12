import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { isInRestrictedPath } from "@/modules/helpers/general";

const Navbar: React.FC = () => {
  const { pathname } = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isInRestrictedPath(pathname)) return null;

  return (
    <>
      <nav className="max-h-25 fixed left-0 top-0 z-50 flex w-full items-center  justify-start border-b !border-background-100 shadow-2xl !bg-white">
        <div className="p-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="inline-flex items-center rounded-lg p-2 text-sm !text-primary-500 hover:!bg-secondary-200 hover:!text-white transition-all"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6 "
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <Link
                href="/"
                className="ml-5 inline-flex items-center text-xl font-semibold text-white"
              >
                <img className="mr-2 h-10" src="/images/logo.png" alt="logo" />
                <span className={"text-black"}>PotFriend</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={clsx(
          isSidebarOpen && "!w-64",
          "fixed left-0 top-0 z-40 h-screen w-0 overflow-hidden border-r !border-background-100 !bg-white pt-16 transition-all sm:translate-x-0 md:w-16 "
        )}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto !bg-white px-3 pb-4">
          <ul className="space-y-2 pt-4 font-medium">
            <li>
              <Link
                href="/"
                className={clsx(
                  pathname === "/" && "!bg-primary-500 !text-white",
                  " text-nowrap group flex flex-nowrap items-center rounded-lg p-2 text-common-400 hover:!bg-secondary-300 hover:!text-white transition-all "
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 max-w-6 max-h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>

                {isSidebarOpen && <span className="ms-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className="text-nowrap group flex w-full flex-nowrap items-center rounded-lg p-2  text-red-500 hover:!bg-danger-500 hover:!text-white transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 max-w-6 max-h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>

                {isSidebarOpen && <span className="ms-3">Odhlásit se</span>}
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
