import clsx from "clsx";
import Link from "next/link";

import { IRoom } from "@/modules/utils/schemas/room";

interface IRoomCardProps {
  room: IRoom;
  className?: string;
}

const RoomCard: React.FC<IRoomCardProps> = ({
  room: { id, name, devices },
  className = "",
}) => {
  const cln = clsx("rounded-lg bg-gray-700", className);

  return (
    <div className={cln}>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm py-1 text-gray-500">{devices.length} Devices</p>
        <Link href={`/room/${id}`}> Detail </Link>
      </div>
    </div>
  );
};

export default RoomCard;
