import { gql } from "@apollo/client";

export const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoom($roomId: String!) {
    deleteRoom(roomId: $roomId) {
      id
    }
  }
`;
