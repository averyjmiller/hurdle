// SignupPage.jsx (Presentation Component)
import React, { useState } from 'react';
import SignupForm from './SignupForm'; // Import the form component

function SignupPage() {
  // State for form-related messages or errors
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (formData) => {
    // Perform form submission logic, e.g., send data to the server
    // Update message state based on the result of the submission
  };

  return (
    <div>
      <h2>Signup</h2>
      {/* Display form-related message or error */}
      {message && <p>{message}</p>}
      {/* Render the SignupForm component and pass the handleSubmit function */}
      <SignupForm onSubmit={handleSubmit} />
    </div>
  );
}

export default SignupPage;