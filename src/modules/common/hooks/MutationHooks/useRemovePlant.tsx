import { FetchResult, useMutation } from "@apollo/client";

import { Mutation, MutationRemovePlantArgs } from "@/generated/graphql";
import { REMOVE_PLANT_MUTATION } from "@/modules/GRAPHQL/mutations/RemovePlantMutation";

interface IDeletePlantHook {
  deletePlantAsync: (id: string) => Promise<FetchResult<Mutation>>;
}

export const useRemovePlant = (): IDeletePlantHook => {
  const [deletePlant] = useMutation<Mutation>(REMOVE_PLANT_MUTATION, {
    context: { shouldTrackStatus: true, withConfirmation: true },
    onCompleted: (data) => {
      if (!data.removePlant) return;
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
