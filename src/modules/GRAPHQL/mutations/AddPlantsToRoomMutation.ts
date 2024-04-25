import { gql } from "@apollo/client";

export const ADD_PLANTS_TO_ROOM = gql`
mutation AddPlantsToRoom($addPlants: AddPlantsToRoomInput!) {
  addPlantsToRoom(addPlants: $addPlants) {
  }
}
`;
