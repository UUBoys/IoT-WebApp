import { gql } from "@apollo/client";

export const GET_ROOM = gql`
  query Rooms {
    query Room($roomId: String!) {
  room(id: $roomId) {
    id
    name
    plants {
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
}
`;
