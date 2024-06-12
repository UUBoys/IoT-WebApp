import { FetchResult, useMutation } from "@apollo/client";

import { Mutation, MutationDeleteRoomArgs } from "@/generated/graphql";
import { DELETE_ROOM_MUTATION } from "@/modules/GRAPHQL/mutations/DeleteRoomMutation";

interface IDeleteRoomHook {
  deleteRoomAsync: (roomId: string) => Promise<FetchResult<Mutation>>;
}

export const useDeleteRoom = (): IDeleteRoomHook => {
  const [deleteRoom] = useMutation<Mutation>(DELETE_ROOM_MUTATION, {
    context: { shouldTrackStatus: true, withConfirmation: true },
    onCompleted: (data) => {
      if (!data.deleteRoom) return;
      console.log(data);
    },
  });

  const deleteRoomAsync = async (roomId: string) => {
    const variables: MutationDeleteRoomArgs = {
      roomId,
    };
    return deleteRoom({
      variables,
    });
  };
  return { deleteRoomAsync };
};
