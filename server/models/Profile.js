const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: [3, "Username must have more than 3 characters!"],
    maxLength: [15, "Usermane cannot be more than 15 characters!"],
    match: [/\S/, "Username cannot have spaces!"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
    ],
  },
  language: {
    type: String,
    required: true,
  },
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
