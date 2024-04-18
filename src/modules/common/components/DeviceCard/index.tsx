import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { IDevice } from "@/modules/utils/schemas/device";
import Badge from "../Bagde";

interface IDeviceCardProps {
  device: IDevice;
  className?: string;
}

const DeviceCard: React.FC<IDeviceCardProps> = ({
  device: { description, id, image, name },
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const cln = clsx("rounded-lg bg-gray-700", className);

  const handleClick = () => {
    console.log("Clicked");
  };

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={"relative"}>
      <div
        className={clsx(
          " w-full h-full z-10 absolute hidden bg-gray-700 rounded-lg",
          isLoading && "!block"
        )}
      >
        <div className="animate-pulse relative h-[200px] bg-gray-300 rounded-t-lg ">
          {/* Skeleton for the image */}
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-4">
            {/* Skeleton for the title */}
            <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
            {/* Skeleton for the badge */}
            <div className="h-6 bg-gray-300 rounded w-20  animate-pulse"></div>
          </div>
          {/* Skeleton for the description */}
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          {/* Skeleton for the link */}
          <div className="h-4 bg-gray-300 rounded w-1/5 animate-pulse"></div>
        </div>
      </div>
      <div className={cln} onClick={handleClick}>
        <div className="relative h-[200px]">
          <Image
            src={image}
            alt={name}
            className=" w-full rounded-t-lg"
            fill
            onLoad={handleImageLoad}
          />
        </div>
        <div className="p-4">
          <div className="flex gap-2 items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <Badge type="success">Active</Badge>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
          <Link href={`/device/${id}`}>Detail</Link>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
