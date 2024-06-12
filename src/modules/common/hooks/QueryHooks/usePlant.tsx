import { useQuery } from "@apollo/client";
import { useState } from "react";

import { Query } from "@/generated/graphql";
import { IPlant } from "@/modules/utils/schemas/plant";
import { GET_PLANT } from "@/modules/GRAPHQL/queries/GetPlantQuery";

interface IUsePlantHook {
  plant: IPlant | null;
  refetchPlant: () => void;
}

export const usePlant = (
  plantId: string | string[] | undefined
): IUsePlantHook => {
  const [plant, setPlant] = useState<IPlant | null>(null);

  const { refetch } = useQuery<Query>(GET_PLANT, {
    fetchPolicy: "cache-and-network",

    context: { shouldTrackStatus: true },
    variables: { plantId },
    skip: !plantId,
    onCompleted(data) {
      if (!data.plant) return;
      setPlant(data.plant as unknown as IPlant);
    },
  });

  return {
    plant,
    refetchPlant: refetch,
  };
};
