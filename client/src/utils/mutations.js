import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile(
    $name: String!,
    $username: String!,
    $email: String!,
    $password: String!,
    $language: String!
  ) {
    addProfile(
      name: $name,
      username: $username,
      email: $email,
      password: $password,
      language: $language,
    ) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation updateLanguage($newLanguage: String!) {
    updateLanguage(newLanguage: $language) {
      _id
      name
      language
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($newPassword: String!) {
    updatePassword(newPassword: $password) {
      _id
      name
      password
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation updateEmail($newEmail: String!) {
    updateEmail(newEmail: $email) {
      _id
      name
      email
    }
  }
`;
