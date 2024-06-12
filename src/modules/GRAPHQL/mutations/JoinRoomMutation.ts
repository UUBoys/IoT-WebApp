import { gql } from "@apollo/client";

export const JOIN_ROOM_MUTATION = gql`
  mutation Mutation($joinRoom: JoinRoomInput!) {
    joinRoom(joinRoom: $joinRoom)
  }
`;
