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
  const cln = clsx("rounded-lg bg-gray-700", className);

  return (
    <div className={cln}>
      <div className="relative h-[200px]">
        <Image src={image} alt={name} className=" w-full rounded-t-lg" fill />
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
  );
};

export default DeviceCard;
