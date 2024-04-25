import { FetchResult, useMutation } from "@apollo/client";

import { Mutation, UpdatePlantInput } from "@/generated/graphql";
import { UPDATE_PLANT_MUTATION } from "@/modules/GRAPHQL/mutations/UpdatePlantMutation";

interface IUpdatePlantHook {
  updatePlantAsync: (
    type: string,
    name: string,
    plantId: string
  ) => Promise<FetchResult<Mutation>>;
}

export const useUpdatePlant = (): IUpdatePlantHook => {
  const [updatePlant] = useMutation<Mutation>(UPDATE_PLANT_MUTATION, {
    context: { shouldTrackStatus: true, withConfirmation: true },
    onCompleted: (data) => {
      if (!data.updatePlant) return;
      console.log(data);
    },
  });

  const updatePlantAsync = async (
    type: string,
    name: string,
    plantId: string
  ) => {
    const variables: UpdatePlantInput = {
      name,
      type,
      plantId,
    };
    return updatePlant({
      variables,
    });
  };
  return { updatePlantAsync };
};
