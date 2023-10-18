import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile(
    $username: String!
    $email: String!
    $password: String!
    $language: String!
  ) {
    addProfile(
      username: $username
      email: $email
      password: $password
      language: $language
    ) {
      token
      profile {
        _id
        username
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
        username
      }
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation updateLanguage($newLanguage: String!) {
    updateLanguage(newLanguage: $language) {
      _id
      username
      language
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($newPassword: String!) {
    updatePassword(newPassword: $password) {
      _id
      username
      password
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation updateEmail($newEmail: String!) {
    updateEmail(newEmail: $email) {
      _id
      username
      email
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation updateUsername($newUsername: String!) {
    updateUsername(newUsername: $username) {
      _id
      username
    }
  }
`;
