import { gql } from "apollo-boost";

export const GET_ALL_RECEIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
      description
      instructions
      likes
      username
    }
  }
`;
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      _id
    }
  }
`;
