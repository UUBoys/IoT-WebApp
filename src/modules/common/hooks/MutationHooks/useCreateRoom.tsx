import { FetchResult, useMutation } from "@apollo/client";

import { Mutation, MutationCreateRoomArgs } from "@/generated/graphql";
import { CREATE_ROOM_MUTATION } from "@/modules/GRAPHQL/mutations/CreateRoomMutation";

interface ICreateRoomHook {
  createRoomAsync: (name: string) => Promise<FetchResult<Mutation>>;
}

export const useCreateRoom = (): ICreateRoomHook => {
  const [createRoom] = useMutation<Mutation>(CREATE_ROOM_MUTATION, {
    context: { shouldTrackStatus: true, withConfirmation: true },
    onCompleted: (data) => {
      if (!data.updatePlant) return;
      console.log(data);
    },
  });

  const createRoomAsync = async (name: string) => {
    const variables: MutationCreateRoomArgs = {
      room: {
        name: name,
        plants: [],
      },
    };

    console.log(variables);
    return createRoom({
      variables,
    });
  };
  return { createRoomAsync };
};
