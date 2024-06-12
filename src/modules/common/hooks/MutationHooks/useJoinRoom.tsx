import { FetchResult, useMutation } from "@apollo/client";

import { Mutation, MutationJoinRoomArgs } from "@/generated/graphql";
import { JOIN_ROOM_MUTATION } from "@/modules/GRAPHQL/mutations/JoinRoomMutation";

interface IJoinRoomHook {
  joinRoomAsync: (inviteCode: string) => Promise<FetchResult<Mutation>>;
}

export const useJoinRoom = (): IJoinRoomHook => {
  const [joinRoom] = useMutation<Mutation>(JOIN_ROOM_MUTATION, {
    context: { shouldTrackStatus: true, withConfirmation: true },
    onCompleted: (data) => {
      if (!data.joinRoom) return;
    },
  });

  const joinRoomAsync = async (inviteCode: string) => {
    const variables: MutationJoinRoomArgs = {
      joinRoom: {
        inviteCode,
      },
    };
    return joinRoom({
      variables,
    });
  };
  return { joinRoomAsync };
};
