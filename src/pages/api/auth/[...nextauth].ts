/* eslint-disable no-param-reassign */
import { ApolloClient, InMemoryCache } from "@apollo/client";
import jwt from "jsonwebtoken";
import NextAuth, { User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { Mutation, MutationLoginArgs } from "../../../generated/graphql";

import { LOGIN_MUTATION } from "@/modules/GRAPHQL/mutations/LoginMutation";
import { signInSchema } from "@/modules/utils/schemas/auth";

export const AUTH_ROUTES = {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  index: "/",
};

export const authOptions: NextAuthOptions = {
  pages: AUTH_ROUTES,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "e-mail",
          type: "text",
          placeholder: "Enter your e-mail/username",
        },
        password: {
          label: "Name",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const creds = await signInSchema.parseAsync(credentials);
        const client = new ApolloClient({
          uri: process.env.API_URL ?? "",
          cache: new InMemoryCache(),
        });
        const variables: MutationLoginArgs = {
          loginInput: {
            email: creds.email,
            password: creds.password,
          },
        };
        let response;
        try {
          response = await client.mutate<Mutation>({
            mutation: LOGIN_MUTATION,
            variables,
            context: {
              shouldTrackStatus: false,
            },
          });
        } catch (error) {
          console.error(error);
        }

        if (response?.errors) {
          throw new Error(response.errors[0].message);
        }

        if (!response?.data?.login?.token) throw new Error("No token");

        const decodedToken = jwt.decode(response.data?.login?.token);

        if (!decodedToken) {
          throw new Error("Invalid user");
        }

        const userObject = { token: response.data?.login?.token };

        return userObject as User;
      },
    }),
  ],
  callbacks: {
    async redirect({ baseUrl, url }) {
      console.log("Redirecting");
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      const decodedToken = jwt.decode(token.accessToken as string) as any;
      if (session.user) {
        session.user.id = decodedToken?.id as string;
        session.user.email = decodedToken?.email as string;
        session.user.firstName = decodedToken?.firstName as string;
        session.user.lastName = decodedToken?.lastName as string;
        session.user.username = decodedToken?.username as string;
        session.user.role = decodedToken?.role as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
