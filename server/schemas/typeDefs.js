const typeDefs = `
  type Profile {
    _id: ID
    username: String
    email: String
    language: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!, language: String!): Auth
    login(email: String!, password: String!): Auth

    updateLanguage(newLanguage: String!): Profile
    updatePassword(newPassword: String!): Profile
    updateEmail(newEmail: String!): Profile
    updateUsername(newUsername: String!): Profile
    removeProfile: Profile
  }
`;

module.exports = typeDefs;
