import React, { useState } from "react";
import axios from "axios";
import SignupForm from "../components/signupForm";

function Signup() {
  const [message, setMessage] = useState("");

  const handleSubmit = async formData => {
    try {
      const response = await axios.post("/api/signup", formData);
      if (response.data.success) {
        setMessage("Signup successful!");
      } else {
        setMessage("Signup failed: " + response.data.error);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("An error occurred during signup.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {message && <p>{message}</p>}
      <SignupForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Signup;
