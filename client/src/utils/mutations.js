import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $language: String!
  ) {
    addProfile(
      name: $name
      username: $username
      email: $email
      password: $password
      language: $language
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
  mutation updateLanguage($profileId: ID!, $newLanguage: String!) {
    updateLanguage(profileID: $profileId, newLanguage: $newLanguage) {
      profile {
        _id
        name
        language
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($profileId: ID!, $newPassword: String!) {
    updatePassword(profileID: $profileId, newPassword: $newPassword) {
      profile {
        _id
        name
        password
      }
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation updateEmail($profileId: ID!, $newEmail: String!) {
    updateEmail(profileID: $profileId, newEmail: $newEmail) {
      profile {
        _id
        name
        email
      }
    }
  }
`;

export const REMOVE_PROFILE = gql`
  mutation removeProfile($profileId: ID!) {
    removeProfile(profileID: $profileId) {
      profile {
        _id
        name
        username
        email
        password
        language
      }
    }
  }
`;
