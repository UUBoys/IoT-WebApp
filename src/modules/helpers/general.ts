import { v4 } from "uuid";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const RESTRICTED_PATHS = ["/auth/signin", "/auth/signup"];
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const uuid = v4;

export const isInRestrictedPath = (pathname: string) => {
  return RESTRICTED_PATHS.includes(pathname);
};

export const loadingStates = [
  {
    text: "Vytvářím virtuální rostlinu",
  },
  {
    text: "Navazuji spojení s reálnou rostlinou",
  },
  {
    text: "Připojuji zařízení k systému",
  },
  {
    text: "Probíhá synchronizace dat",
  },
  {
    text: "Kontroluji stav připojení",
  },
  {
    text: "Probíhá inicializace systému",
  },
  {
    text: "Přidávám rostlinu do místnosti",
  },
  {
    text: "Připravuji zařízení k provozu",
  },
  {
    text: "Zpracovávám informace o rostlině",
  },
];
