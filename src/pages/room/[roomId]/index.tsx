import React from "react";
import { useRoom } from "@/modules/common/hooks/QueryHooks/useRoom";
import { useRouter } from "next/router";
import Image from "next/image";
import clsx from "clsx";
import { IPlant } from "@/modules/utils/schemas/plant";

const RoomDetail = () => {
  const { query, push } = useRouter();
  const { room } = useRoom(query.roomId as string);
  const renderDeviceBlock = (
    plant: IPlant,
    status: "success" | "danger" | "warning"
  ) => {
    return (
      <div
        onClick={() => {
          push(`${query.roomId}/plant/${plant.id}`);
        }}
        className={"relative bg-transparent cursor-pointer mt-[20px]"}
      >
        <div
          className={clsx(
            "ml-[15px] w-[100px] h-[20px] bg-${status}-500 rounded-t-md flex items-center justify-center shadow-2xl",
            status === "success"
              ? "bg-success-600"
              : status === "danger"
              ? "bg-danger-600"
              : "bg-warning-600"
          )}
        >
          <p className={"text-white font-bold"}>online</p>
        </div>
        <div
          className={
            "w-full border-b border-background-100 flex justify-between items-center flex-row gap-4 bg-white hover:shadow-2xl shadow-lg transition-all hover:scale-[1.01] rounded-md"
          }
        >
          <Image
            src={"https://picsum.photos/200"}
            alt={"device-image"}
            className={"rounded-l-md"}
            height={80}
            width={80}
          />
          <div className={"flex flex-col  justify-evenly h-[70px] w-full"}>
            <p className={"font-bold text-black min-w-max"}>{plant.name}</p>
            <p className={"text-gray-300 line-clamp-3 max-w-full"}>
              {plant.description}
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={"w-full px-4 md:px-20 mt-[40px]"}>
      <p className={"text-black font-bold text-xl"}>{room?.name}</p>

      {room?.plants.map((plant) => {
        return renderDeviceBlock(plant, "success");
      })}
    </div>
  );
};
export default RoomDetail;
