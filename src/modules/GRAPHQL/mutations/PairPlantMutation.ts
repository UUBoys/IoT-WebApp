import { gql } from "@apollo/client";

export const PAIR_PLANT_MUTATION = gql`
  mutation PairPlant($pairPlantInput: PairPlantInput!) {
    pairPlant(pairPlantInput: $pairPlantInput) {
      id
      type
      name
      lastHeartbeat
      measurements {
        id
        value
        date
      }
    }
  }
`;
