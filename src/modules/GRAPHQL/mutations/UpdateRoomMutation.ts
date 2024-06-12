import { gql } from "@apollo/client";

export const UPDATE_ROOM_MUTATION = gql`
  mutation UpdateRoom($roomUpdate: UpdateRoomInput!) {
    updateRoom(roomUpdate: $roomUpdate) {
      id
    }
  }
`;
