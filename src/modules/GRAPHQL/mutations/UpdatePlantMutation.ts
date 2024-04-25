import { gql } from "@apollo/client";

export const UPDATE_PLANT_MUTATION = gql`
  mutation UpdatePlant($updatePlantInput: UpdatePlantInput!) {
    updatePlant(updatePlantInput: $updatePlantInput) {
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
