// SignupPage.jsx (Presentation Component)
import { useState } from 'react';
import SignupForm from '../components/signupForm';


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
      <SignupForm onSubmit={handleSubmit}/>
    </div>
  );
}

export default SignupPage;