import { gql } from "@apollo/client";

export const UPDATE_PLANT_MUTATION = gql`
  mutation UpdateRoom($roomUpdate: UpdatePlantInput!) {
    updateRoom(roomUpdate: $roomUpdate) {
      id
    }
  }
`;
