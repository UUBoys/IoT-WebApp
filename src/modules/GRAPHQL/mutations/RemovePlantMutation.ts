import { gql } from "@apollo/client";

export const REMOVE_PLANT_MUTATION = gql`
 mutation UpdatePlant($removePlantId: Int!) {
  removePlant(id: $removePlantId) {
    
  }
}
`;
