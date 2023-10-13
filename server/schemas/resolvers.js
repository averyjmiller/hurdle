const { Profile } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
  },

  Mutation: {
    addProfile: async (parent, { name, username, email, password, language }) => {
      const profile = await Profile.create({ name, username, email, password, language });
      const token = signToken(profile);

      return { token, profile };
    },

    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    updateLanguage: async (parent, { profileId, newLanguage }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          { language: newLanguage },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updatePassword: async (parent, { profileId, newPassword }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          { password: newPassword },
          { 
            new: true,
            runValidators: true 
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateEmail: async (parent, { profileId, newEmail }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          { email: newEmail },
          { 
            new: true,
            runValidators: true
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeProfile: async (parent, { profileId }, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: profileId });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
