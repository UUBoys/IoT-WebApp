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
