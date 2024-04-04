"use client";

import moment from "moment";
import "moment/locale/cs";
import "moment/locale/en-gb";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { I18nextProvider } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";

import i18n from "../i18n";

import Modal from "@/modules/common/components/Modal";
import Layout from "@/modules/common/Layout/Layout";
import "@/modules/common/styles/globals.css";

moment.locale(i18n.language === "en" ? "en-gb" : "cs");

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <I18nextProvider i18n={i18n}>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Modal />
        <Toaster visibleToasts={6} position="bottom-left" richColors />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nextProvider>
    </SessionProvider>
  );
};

export default MyApp;
