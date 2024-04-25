import { gql } from "@apollo/client";

export const DELETE_ROOM_MUTATION = gql`
mutation AddPlantsToRoom($addPlants: AddPlantsToRoomInput!) {
  addPlantsToRoom(addPlants: $addPlants) {
  }
}

`;
