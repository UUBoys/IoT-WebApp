import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { Query, Room } from "@/generated/graphql";
import { GET_ROOMS } from "@/modules/GRAPHQL/queries/GetRoomsQuery";
import { IRoom } from "@/modules/utils/schemas/room";

interface IUseRoomsHook {
  rooms: IRoom[];
  refetchRooms: () => void;
}

export const useRooms = (): IUseRoomsHook => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const { data, refetch } = useQuery<Query>(GET_ROOMS, {
    fetchPolicy: "cache-and-network",
    context: { shouldTrackStatus: true },
  });

  useEffect(() => {
    if (data && data.rooms) {
      const filteredRooms: IRoom[] = data.rooms.filter(
        (room): room is IRoom => room !== null && room !== undefined
      );

      const uniqueRooms = filteredRooms.reduce((acc: IRoom[], room: IRoom) => {
        if (!acc.find((r) => r.id === room.id)) {
          acc.push(room);
        }
        return acc;
      }, []);

      setRooms(uniqueRooms);
    }
  }, [data]);

  return {
    rooms,
    refetchRooms: refetch,
  };
};
