import { FetchResult, useMutation } from "@apollo/client";

import {
  Mutation,
  MutationDeleteRoomArgs,
  MutationRemovePlantArgs,
} from "@/generated/graphql";
import { DELETE_ROOM_MUTATION } from "@/modules/GRAPHQL/mutations/DeleteRoomMutation";
import { REMOVE_PLANT_MUTATION } from "@/modules/GRAPHQL/mutations/RemovePlantMutation";

interface IDeletePlantHook {
  deletePlantAsync: (id: string) => Promise<FetchResult<Mutation>>;
}

export const useDeleteRoom = (): IDeletePlantHook => {
  const [deletePlant] = useMutation<Mutation>(REMOVE_PLANT_MUTATION, {
    context: { shouldTrackStatus: true, withConfirmation: true },
    onCompleted: (data) => {
      if (!data.updatePlant) return;
      console.log(data);
    },
  });

  const deletePlantAsync = async (id: string) => {
    const variables: MutationRemovePlantArgs = {
      id,
    };
    return deletePlant({
      variables,
    });
  };
  return { deletePlantAsync };
};
