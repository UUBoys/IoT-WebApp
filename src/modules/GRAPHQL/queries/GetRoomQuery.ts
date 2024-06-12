import { gql } from "@apollo/client";

export const GET_ROOM = gql`
  query Room($roomId: String!) {
    room(id: $roomId) {
      id
      name
      inviteCode
      plants {
        id
        type
        name
        imageUrl
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
