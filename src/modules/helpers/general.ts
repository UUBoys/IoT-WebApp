import { v4 } from "uuid";

const RESTRICTED_PATHS = ["/auth/signin", "/auth/signup"];

export const uuid = v4;

export const isInRestrictedPath = (pathname: string) => {
  return RESTRICTED_PATHS.includes(pathname);
};
