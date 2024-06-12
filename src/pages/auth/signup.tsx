/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */

"use client";

import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Mutation } from "react-query";

import { MutationRegisterArgs } from "@/generated/graphql";
import { REGISTER_MUTATION } from "@/modules/GRAPHQL/mutations/RegisterMutation";
import { IRegister, signUpSchema } from "@/modules/utils/schemas/auth";

const SignUp: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(signUpSchema),
  });
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session } = useSession();

  const [mutateRegisterAsync] = useMutation<Mutation>(REGISTER_MUTATION, {
    context: { shouldTrackStatus: true, withConfirmation: true },
  });
  const [defaultError, setDefaultError] = useState<string>("");

  const handleSignUp = async ({
    username,
    email,
    password,
    passwordCheck,
  }: IRegister) => {
    console.log(username, email, password, passwordCheck);
    if (password !== passwordCheck) {
      setDefaultError("Passwords do not match");
      return;
    }

    const variables: MutationRegisterArgs = {
      registerInput: {
        name: username,
        email,
        password,
      },
    };

    const res = await mutateRegisterAsync({
      variables,
    });

    setDefaultError("");
    if (res.errors?.length && res.errors?.length > 0) {
      setDefaultError(res.errors?.[0].message ?? "");
    } else {
      await signIn("credentials", { email, password, redirect: false });
      router.push("/");
    }
  };

  useEffect(() => {
    if (session?.accessToken) router.push("/");
  }, [router, session?.accessToken]);

  return (
    <div className="flex h-screen w-full items-center bg-white">
      <section className="w-full bg-white bg-opacity-60 bg-[url('/images/register-wallpaper.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
        <div className="pt:mt-0 mx-auto flex w-full flex-col items-center justify-center px-6 py-8 md:h-screen">
          <a
            href="#"
            className="mb-4 inline-flex items-center text-xl font-semibold text-white"
          >
            <img className="mr-2 h-14" src="/images/logo.png" alt="logo" />
            PotFriend
          </a>
          <div className="w-full rounded-lg !bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6 lg:space-y-8">
              <h2 className="text-center text-xl font-bold leading-tight tracking-tight !text-black md:text-2xl">
                {t("pages.auth.register.header")}
              </h2>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(handleSignUp)}
                action=""
              >
                <div>
                  {" "}
                  {errors.username && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.username?.message}
                    </p>
                  )}
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium !text-gray-300"
                  >
                    Jméno
                  </label>
                  <input
                    type="text"
                    {...register("username")}
                    id="name"
                    className=" block w-full rounded-lg border border-background-100 !bg-background-50 p-2.5 !text-black !placeholder-gray-400 focus:!bg-white sm:text-sm outline-none focus:outline-none"
                    placeholder="Jméno"
                  />
                </div>
                <div>
                  {" "}
                  {errors.email && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.email?.message}
                    </p>
                  )}
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium !text-gray-300"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    id="email"
                    className=" block w-full rounded-lg border border-background-100 !bg-background-50 p-2.5 !text-black !placeholder-gray-400 focus:!bg-white sm:text-sm outline-none focus:outline-none"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  {errors.password && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.password?.message}
                    </p>
                  )}
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium !text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    id="password"
                    placeholder="••••••••"
                    className=" block w-full rounded-lg border border-background-100 !bg-background-50 p-2.5 !text-black !placeholder-gray-400 focus:!bg-white sm:text-sm outline-none focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium !text-gray-300"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    {...register("passwordCheck")}
                    id="confirm-password"
                    placeholder="••••••••"
                    className=" block w-full rounded-lg border border-background-100 !bg-background-50 p-2.5 !text-black !placeholder-gray-400 focus:!bg-white sm:text-sm outline-none focus:outline-none"
                  />
                </div>
                {defaultError !== "" && (
                  <p className="mt-2 text-xl italic text-red-500">
                    {defaultError}
                  </p>
                )}
                <button
                  type="submit"
                  onClick={() => {
                    console.log("clicked");
                  }}
                  className="!hover:bg-primary-700 !focus:ring-primary-800 w-full rounded-lg !bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                  Vytvořit účet
                </button>
                <p className="text-center text-sm font-light !text-gray-300">
                  <Link
                    href="/auth/signin"
                    className="font-medium !text-primary-500 hover:underline"
                  >
                    Již máte účet?
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
