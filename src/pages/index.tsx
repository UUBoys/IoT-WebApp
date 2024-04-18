"use client";

import { NextPage } from "next";
import React from "react";

import SpaceWithDevices from "@/modules/common/components/SpaceWithDevices";
import { uuid } from "@/modules/helpers/general";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen w-full sm:p-10">
      <SpaceWithDevices
        space={{
          id: uuid(),
          name: "Obývák",
          devices: [
            {
              id: "1",
              name: "Philips Hue",
              description: "RGB LED Strip",
              image: "",
            },
          ],
        }}
      />
    </div>
  );
};

export default Home;
