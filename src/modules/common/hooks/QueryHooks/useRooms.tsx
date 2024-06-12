import { useQuery } from "@apollo/client";
import { useState } from "react";

import { Query } from "@/generated/graphql";
import { GET_ROOMS } from "@/modules/GRAPHQL/queries/GetRoomsQuery";
import { IRoom } from "@/modules/utils/schemas/room";

interface IUseRoomsHook {
  rooms: IRoom[];
  refetchRooms: () => void;
}

export const useRooms = (): IUseRoomsHook => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const { refetch } = useQuery<Query>(GET_ROOMS, {
    fetchPolicy: "cache-and-network",
    context: { shouldTrackStatus: true },
    onCompleted(data) {
      console.log(data);
      if (!data.rooms || data.rooms.length <= 0) {
        return;
      }
      setRooms([...(data.rooms as IRoom[])]);
    },
  });

  return {
    rooms,
    refetchRooms: refetch,
  };
};
