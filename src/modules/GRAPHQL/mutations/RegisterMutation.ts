import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Mutation($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      token
    }
  }
`;
