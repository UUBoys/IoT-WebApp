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
              image:
                "https://images.unsplash.com/photo-1612834420304-4e0b0e6f8c1b",
            },
            {
              id: "2",
              name: "Philips Hue",
              description: "RGB LED Strip",
              image:
                "https://images.unsplash.com/photo-1612834420304-4e0b0e6f8c1b",
            },
            {
              id: "3",
              name: "Philips Hue",
              description: "RGB LED Strip",
              image:
                "https://images.unsplash.com/photo-1612834420304-4e0b0e6f8c1b",
            },
            {
              id: "4",
              name: "Philips Hue",
              description: "RGB LED Strip",
              image:
                "https://images.unsplash.com/photo-1612834420304-4e0b0e6f8c1b",
            },
          ],
        }}
      />
    </div>
  );
};

export default Home;
