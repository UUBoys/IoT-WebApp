import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { Query } from "@/generated/graphql";
import { IRoom } from "@/modules/utils/schemas/room";
import { GET_ROOM } from "@/modules/GRAPHQL/queries/GetRoomQuery";

interface IUseRoomHook {
  room: IRoom | null;
  refetchRoom: () => void;
  isRoomLoading: boolean;
}

export const useRoom = (roomId: string | number): IUseRoomHook => {
  const [room, setRoom] = useState<IRoom | null>(null);

  const { data, refetch, loading } = useQuery<Query>(GET_ROOM, {
    fetchPolicy: "cache-and-network",

    context: { shouldTrackStatus: true },
    variables: { roomId },
    skip: !roomId,
  });
  useEffect(() => {
    if (data?.room) {
      console.log(data?.room);
      setRoom(data.room as unknown as IRoom);
    }
  }, [data]);
  return {
    room,
    refetchRoom: refetch,
    isRoomLoading: loading,
  };
};
