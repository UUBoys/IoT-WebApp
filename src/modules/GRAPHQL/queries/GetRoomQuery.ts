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
        isOnline
        name
        imageUrl
        description
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
