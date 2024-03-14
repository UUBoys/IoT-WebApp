/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import GoogleIcon from "@mui/icons-material/Google";
import Lottie from "lottie-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import qUpLoaderAnimation from "../../../public/animations/qup-loader-animation.json";

import Loader from "@/modules/common/components/Loader";

type LoginValues = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { register, handleSubmit } = useForm<LoginValues>();
  const [isLogingIn, setIsLogingIn] = useState(false);
  const { t } = useTranslation();
  const [defaultError, setDefaultError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const handleStudentCredentialsLogin = async ({
    email,
    password,
  }: LoginValues) => {
    setIsLogingIn(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setDefaultError(res.error);
      setIsLogingIn(false);
    } else if (res?.url) {
      const url = new URL(res?.url);
      const redirectUrl = url.searchParams.get("callbackUrl");
      router.push(redirectUrl || res.url);
      return;
    }

    setIsLogingIn(false);
  };

  useEffect(() => {
    if (session?.accessToken) router.push("/");
  }, [router, session?.accessToken]);

  return (
    <div className="flex h-screen w-full items-center bg-gray-100">
      {isLogingIn && (
        <Loader>
          {" "}
          <Lottie
            animationData={qUpLoaderAnimation}
            loop
            className="w-1/4 invert "
          />{" "}
          <div className="mt-[-70px] bg-gradient-to-b from-[#ff8b56] to-[#fe592b] !bg-clip-text text-[20px] font-bold text-transparent md:text-[60px]">
            Načítání...
          </div>
        </Loader>
      )}
      <div className="mx-auto flex h-[500px] w-11/12  flex-col rounded-md bg-white  p-10 shadow-2xl sm:w-[400px]">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="relative top-[-130px] mx-auto flex h-[170px] w-[170px] items-center justify-center rounded-full border-[10px] border-gray-200 bg-white hover:cursor-pointer"
        >
          <div className="  text-center text-6xl font-bold text-primary-500">
            Q
          </div>
        </div>

        <div className="w-full ">
          {defaultError !== "" && (
            <p className="mt-2 text-xl italic text-red-500">{defaultError}</p>
          )}
          <form
            action=""
            onSubmit={handleSubmit(handleStudentCredentialsLogin)}
          >
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium  text-gray-900 dark:text-white"
              >
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="block w-full rounded-lg border !border-primary-100 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-lg placeholder:text-gray-400 focus:border-2  focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder={t("pages.auth.form.email.placeholder")}
                  required
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  className="block w-full rounded-lg border !border-primary-100 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-lg placeholder:text-gray-400 focus:border-primary-500 focus:ring-primary-500  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  required
                  placeholder={t("pages.auth.form.password.placeholder")}
                />
              </label>
            </div>{" "}
            <div className="mb-6">
              <button
                type="submit"
                className="w-full rounded-lg bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-secondary-900 focus:outline-none focus:ring-4  "
              >
                {t("pages.auth.login.button")}
              </button>
            </div>
            <button
              type="button"
              onClick={() => signIn("google")}
              className="w-full rounded-lg bg-[#de5246] px-5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-secondary-900 focus:outline-none focus:ring-4  "
            >
              <GoogleIcon /> {t("pages.auth.form.signInWith.google")}
            </button>
          </form>
          <Link
            href="/auth/signup"
            className="mt-3 block text-center text-sm font-light text-gray-600 dark:text-white"
          >
            {t("pages.auth.login.register")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
