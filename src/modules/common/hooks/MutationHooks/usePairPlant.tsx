import { FetchResult, useMutation } from "@apollo/client";

import { Mutation, PairPlantInput } from "@/generated/graphql";
import { PAIR_PLANT_MUTATION } from "@/modules/GRAPHQL/mutations/PairPlantMutation";

interface IUserPairPlantHook {
  pairPlantAsync: (
    type: string,
    name: string,
    token: string
  ) => Promise<FetchResult<Mutation>>;
}

export const usePairPlant = (): IUserPairPlantHook => {
  const [pairPlant] = useMutation<Mutation>(PAIR_PLANT_MUTATION, {
    context: { shouldTrackStatus: true, withConfirmation: true },
    onCompleted: (data) => {
      if (!data.pairPlant) return;
      console.log(data);
    },
  });

  const pairPlantAsync = async (type: string, name: string, token: string) => {
    const variables: PairPlantInput = {
      name,
      type,
      token,
    };
    return pairPlant({
      variables,
    });
  };
  return { pairPlantAsync };
};
