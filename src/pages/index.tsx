/* eslint-disable sonarjs/no-duplicate-string */

"use client";

/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
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
              image: "https://picsum.photos/200/300",
            },
          ],
        }}
      />
    </div>
  );
};

export default Home;
