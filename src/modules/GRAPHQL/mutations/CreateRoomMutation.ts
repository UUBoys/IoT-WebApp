import { gql } from "@apollo/client";

export const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoom($room: CreateRoomInput!) {
    createRoom(room: $room) {
      id
      name
    }
  }
`;
