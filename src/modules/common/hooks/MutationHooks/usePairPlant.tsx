import { FetchResult, useMutation } from "@apollo/client";

import { Mutation, MutationPairPlantArgs } from "@/generated/graphql";
import { PAIR_PLANT_MUTATION } from "@/modules/GRAPHQL/mutations/PairPlantMutation";

interface IUserPairPlantHook {
  pairPlantAsync: (
    type: string,
    name: string,
    token: string,
    imageUrl?: string,
    description?: string
  ) => Promise<FetchResult<Mutation>>;
}

export const usePairPlant = (): IUserPairPlantHook => {
  const [pairPlant] = useMutation<Mutation>(PAIR_PLANT_MUTATION, {
    context: { shouldTrackStatus: false, withConfirmation: false },
    onCompleted: (data) => {
      if (!data.pairPlant) return;
      console.log(data);
    },
  });

  const pairPlantAsync = async (
    type: string,
    name: string,
    token: string,
    imageUrl?: string,
    description?: string
  ) => {
    const variables: MutationPairPlantArgs = {
      pairPlantInput: {
        name,
        type,
        pairingCode: token,
        imageUrl,
        description: description ?? "",
      },
    };
    return pairPlant({
      variables,
    });
  };
  return { pairPlantAsync };
};
