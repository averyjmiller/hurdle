import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';  // Adjust the path
import SignupForm from '../components/signupForm';

function Signup() {
  const [message, setMessage] = useState("");
  const [addProfile] = useMutation(ADD_PROFILE);

  const handleSubmit = async formData => {
    try {
      const { data } = await addProfile({
        variables: {
          name: formData.username, 
          username: formData.username,
          email: formData.email,  
          password: formData.password,
          language: formData.preferredLanguage
        }
      });

      if (data.addProfile) {
        setMessage("Signup successful!");
      } else {
        setMessage("Signup failed.");
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

