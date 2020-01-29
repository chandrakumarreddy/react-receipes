import { gql } from "apollo-boost";

export const sign_in = gql`
  mutation($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
    }
  }
`;

export const sign_up = gql`
  mutation($email: String!, $password: String!, $username: String!) {
    signUpUser(email: $email, password: $password, username: $username) {
      token
    }
  }
`;
