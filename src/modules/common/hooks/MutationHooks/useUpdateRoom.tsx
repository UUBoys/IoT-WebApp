import { FetchResult, useMutation } from "@apollo/client";

import { Mutation, MutationUpdateRoomArgs } from "@/generated/graphql";
import { UPDATE_ROOM_MUTATION } from "@/modules/GRAPHQL/mutations/UpdateRoomMutation";
import { IRoom } from "@/modules/utils/schemas/room";

interface IUpdateRoomHook {
  updateRoomAsync: (room: IRoom) => Promise<FetchResult<Mutation>>;
}

export const useUpdateRoom = (): IUpdateRoomHook => {
  const [updateRoom] = useMutation<Mutation>(UPDATE_ROOM_MUTATION, {
    context: { shouldTrackStatus: true, withConfirmation: true },
    onCompleted: (data) => {
      if (!data.updateRoom) return;
    },
  });

  const updateRoomAsync = async (room: IRoom) => {
    const variables: MutationUpdateRoomArgs = {
      roomUpdate: { name: room.name, roomId: room.id },
    };

    return updateRoom({
      variables,
    });
  };
  return { updateRoomAsync };
};
