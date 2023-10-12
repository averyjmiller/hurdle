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

      if(!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if(!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },

    updateLanguage: async (parent, { profileId, newLanguage }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { language: newLanguage },
        { new: true }
      );
    },

    updatePassword: async (parent, { profileId, newPassword }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { password: newPassword },
        { 
          new: true,
          runValidators: true
        }
      );
    },

    updateEmail: async (parent, { profileId, newEmail }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { email: newEmail },
        { 
          new: true,
          runValidators: true
        }
      );
    },

    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    }
  }
};

module.exports = resolvers;