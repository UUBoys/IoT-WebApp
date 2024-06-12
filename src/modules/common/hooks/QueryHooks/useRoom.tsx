import { useQuery } from "@apollo/client";
import { useState } from "react";

import { Query } from "@/generated/graphql";
import { IRoom } from "@/modules/utils/schemas/room";
import { GET_ROOM } from "@/modules/GRAPHQL/queries/GetRoomQuery";

interface IUseRoomHook {
  room: IRoom | null;
  refetchRoom: () => void;
}

export const useRoom = (roomId: string | number): IUseRoomHook => {
  const [room, setRoom] = useState<IRoom | null>(null);

  const { refetch } = useQuery<Query>(GET_ROOM, {
    fetchPolicy: "cache-and-network",

    context: { shouldTrackStatus: true },
    variables: { getEventByIdId: roomId },
    onCompleted(data) {
      if (!data.room) return;
      setRoom(data.room as unknown as IRoom);
    },
  });

  return {
    room,
    refetchRoom: refetch,
  };
};
