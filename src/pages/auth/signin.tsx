/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

// import Lottie from "lottie-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { lazy, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Lottie = lazy(() => import("lottie-react"));

import qUpLoaderAnimation from "../../../public/animations/loader-animation.json";

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
      console.log(redirectUrl);
      router.push(redirectUrl || res.url);
      return;
    }

    setIsLogingIn(false);
  };

  useEffect(() => {
    if (session?.accessToken) router.push("/");
  }, [router, session?.accessToken]);

  return (
    <div className="min-h-[100vh]">
      {isLogingIn && (
        <Loader>
          {" "}
          <Lottie
            animationData={qUpLoaderAnimation}
            loop
            className="w-1/4 "
          />{" "}
          <div className="mt-[-70px] bg-gradient-to-b from-[#2bd7fe] to-[#569aff] !bg-clip-text text-[20px] font-bold text-transparent md:text-[60px]">
            Načítání...
          </div>
        </Loader>
      )}
      <section className="min-h-[100vh]  bg-gray-900">
        <div className="mx-auto grid min-h-[100vh] max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-20 lg:py-16">
          <div className="w-full place-self-center lg:col-span-6">
            <div className="mx-auto rounded-lg  bg-gray-800 p-6 shadow sm:max-w-xl sm:p-8">
              <a
                href="#"
                className="mb-4 inline-flex items-center text-xl font-semibold text-white"
              >
                <img className="mr-2 h-14" src="/images/logo.png" alt="logo" />
                PotFriend
              </a>
              <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-white">
                Vítejte zpět!
              </h1>{" "}
              <p className="text-sm font-light text-gray-300">
                Ještě nemáte účet?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium  text-primary-500 hover:underline"
                >
                  Registrace
                </Link>
                .
              </p>
              {defaultError !== "" && (
                <p className="mt-2 text-xl italic text-red-500">
                  {defaultError}
                </p>
              )}
              <form
                className="mt-4 space-y-6 sm:mt-6"
                onSubmit={handleSubmit(handleStudentCredentialsLogin)}
                action="#"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className=" order-gray-600 block w-full  rounded-lg border bg-gray-700 p-2.5 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder={t("pages.auth.form.email.placeholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      name="password"
                      id="password"
                      placeholder={t("pages.auth.form.password.placeholder")}
                      className=" order-gray-600 block w-full  rounded-lg border bg-gray-700 p-2.5 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-0.5 w-full bg-gray-700" />
                  <div className="px-5 text-center text-gray-400">or</div>
                  <div className="h-0.5 w-full bg-gray-700" />
                </div>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="!hover:bg-gray-700 !hover:text-white !focus:ring-gray-700 mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg border !border-gray-600 !bg-gray-800 px-5 py-2.5 text-sm font-medium !text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_13183_10121)">
                        <path
                          d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                          fill="#3F83F8"
                        />
                        <path
                          d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                          fill="#FBBC04"
                        />
                        <path
                          d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                          fill="#EA4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_13183_10121">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    {t("pages.auth.login.googleButton")}
                  </a>
                </div>

                <button
                  type="submit"
                  className="!hover:bg-primary-700 !focus:ring-primary-800 w-full rounded-lg !bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                  {t("pages.auth.login.button")}
                </button>
              </form>
            </div>
          </div>
          <div className="mr-auto place-self-center lg:col-span-6">
            <img
              className="mx-auto hidden lg:flex"
              src="/images/plant-login.webp"
              alt="illustration"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
