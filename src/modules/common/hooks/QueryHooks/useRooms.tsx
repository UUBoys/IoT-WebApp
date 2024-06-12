// Define Maybe type
import { useEffect, useState } from "react";
import { GET_ROOMS } from "@/modules/GRAPHQL/queries/GetRoomsQuery";
import { useQuery } from "@apollo/client";
import { IRoom } from "@/modules/utils/schemas/room";
import { Query } from "@/generated/graphql";

interface IUseRoomsHook {
  rooms: IRoom[];
  refetchRooms: () => void;
}

export const useRooms = (): IUseRoomsHook => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const { data, refetch } = useQuery<Query>(GET_ROOMS, {
    fetchPolicy: "cache-and-network",
    context: { shouldTrackStatus: true },
    onCompleted(data) {
      if (!data.rooms) return;
      setRooms(data.rooms as unknown as IRoom[]);
    },
  });

  useEffect(() => {
    if (data?.rooms) {
      setRooms(data.rooms as unknown as IRoom[]);
    }
  }, [data]);

  return {
    rooms,
    refetchRooms: refetch,
  };
};
