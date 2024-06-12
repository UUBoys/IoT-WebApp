import { gql } from "@apollo/client";

export const GET_PLANT = gql`
  query Plant($plantId: String!) {
    plant(id: $plantId) {
      id
      type
      name
      description
      imageUrl
      lastHeartbeat
      isOnline
      measurements {
        id
        value
        date
      }
    }
  }
`;
