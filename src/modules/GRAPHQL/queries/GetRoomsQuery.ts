import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query Rooms {
    rooms {
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
