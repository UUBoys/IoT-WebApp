import { gql } from "@apollo/client";

export const CHECK_PAIRING_PROCESS = gql`
  query Query($pairingCode: String!) {
    checkPairingProcess(pairingCode: $pairingCode) {
      userPaired
      serverPaired
    }
  }
`;
