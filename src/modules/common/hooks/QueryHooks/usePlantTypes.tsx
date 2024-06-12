import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { Query } from "@/generated/graphql";
import { GET_PLANT_TYPES } from "@/modules/GRAPHQL/queries/GetPlantTypes";

interface IUsePlantTypesHook {
  plantTypes: string[] | null;
  refetchPlantTypes: () => void;
}

export const usePlantTypes = (): IUsePlantTypesHook => {
  const [plantTypes, setPlantTypes] = useState<string[] | null>(null);

  const { data, refetch } = useQuery<Query>(GET_PLANT_TYPES, {
    fetchPolicy: "cache-and-network",

    context: { shouldTrackStatus: true },
  });
  useEffect(() => {
    if (data?.getPlantTypes) {
      console.log(data?.getPlantTypes);
      setPlantTypes(data.getPlantTypes as string[]);
    }
  }, [data]);
  return {
    plantTypes,
    refetchPlantTypes: refetch,
  };
};
