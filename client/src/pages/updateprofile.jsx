import React from "react";
import "./updateprofile.css";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_EMAIL } from "../utils/mutations";
import { UPDATE_PASSWORD } from "../utils/mutations";
import { UPDATE_LANGUAGE } from "../utils/mutations";
import { UPDATE_USERNAME } from "../utils/mutations";

const UpdateProfile = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    language: "",
  });
  const [updateEmail, { error: emailError, data: emailData }] =
    useMutation(UPDATE_EMAIL);
  const [updatePassword, { error: passwordError, data: passwordData }] =
    useMutation(UPDATE_PASSWORD);
  const [updateLanguage, { error: languageError, data: languageData }] =
    useMutation(UPDATE_LANGUAGE);
  const [updateUsername, { error: usernameError, data: usernameData }] =
    useMutation(UPDATE_USERNAME);

  // update state based on form input changes
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data: addUsernameData } = await updateUsername({
        variables: { ...formState },
      });
      const { data: addEmailData } = await updateEmail({
        variables: { ...formState },
      });
      const { data: addPasswordData } = await updatePassword({
        variables: { ...formState },
      });
      const { data: addLanguageData } = await updateLanguage({
        variables: { ...formState },
      });

      // Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-primary">Edit Profile</h1>

        <h3>Personal info</h3>

        <form
          onSubmit={handleFormSubmit}
          className="form-horizontal"
          role="form"
        >
          <div className="form-group">
            <label className="col-lg-3 control-label">Username:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                value={formState.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Email:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Password:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-lg-3 control-label">Language:</label>
            <div className="col-lg-8">
              <div className="ui-select">
                <select
                  id="user_time_zone"
                  className="form-control"
                  value={formState.language}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateProfile;
