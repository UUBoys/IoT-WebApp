import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    token?: string;
  }
  interface Session {
    accessToken?: string;
    user?: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      username: string;
      role: string;
    } & DefaultSession["user"];
  }
}
