"use client";

/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";

import Feed from "@/modules/common/components/Feed";
import LandingPage from "@/modules/common/components/LandingPage";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return session?.user ? <Feed /> : <LandingPage />;
};

export default Home;
