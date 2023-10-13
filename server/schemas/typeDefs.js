const typeDefs = `
  type Profile {
    _id: ID
    name: String
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
  }

  type Mutation {
    addProfile(name: String!, username: String!, email: String!, password: String!, language: String!): Auth
    login(email: String!, password: String!): Auth

    updateLanguage(profileId: ID!, newLanguage: String!): Profile
    updatePassword(profileId: ID!, newPassword: String!): Profile
    updateEmail(profileId: ID!, newEmail: String!): Profile
    removeProfile(profileId: ID!): Profile
  }
`;

module.exports = typeDefs;
