import { gql } from "apollo-boost";

export const sign_in = gql`
  mutation($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
    }
  }
`;
