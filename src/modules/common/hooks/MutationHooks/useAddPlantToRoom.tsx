import { FetchResult, useMutation } from "@apollo/client";

import { Mutation, MutationAddPlantsToRoomArgs } from "@/generated/graphql";
import { ADD_PLANTS_TO_ROOM } from "@/modules/GRAPHQL/mutations/AddPlantsToRoomMutation";
import { toast } from "react-toastify";

interface IAddPlantToRoomHook {
  addPlantsToRoomAsync: (
    roomId: string,
    plantsIds: string[]
  ) => Promise<FetchResult<Mutation>>;
}

export const useAddPlantsToRoom = (): IAddPlantToRoomHook => {
  const [addPlantToRoom] = useMutation<Mutation>(ADD_PLANTS_TO_ROOM, {
    context: { shouldTrackStatus: false, withConfirmation: false },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const addPlantsToRoomAsync = async (roomId: string, plantsIds: string[]) => {
    const variables: MutationAddPlantsToRoomArgs = {
      addPlants: {
        roomId,
        plants: [
          ...plantsIds.map((plantId) => ({
            plantId: plantId,
          })),
        ],
      },
    };

    return addPlantToRoom({
      variables,
    });
  };
  return { addPlantsToRoomAsync };
};
