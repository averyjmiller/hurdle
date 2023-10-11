import { useState } from 'react';
import PropTypes from 'prop-types';
import './signupForm.css';

function SignupForm({ onSubmit }) {
  // State variables for form input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the callback function (onSubmit) and pass the form data
    onSubmit({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Register</p>
      <p className="message">Signup now and get full access to our app.</p>
      <div className="flex">
        <label>
          <input 
            required 
            placeholder="" 
            type="text" 
            className="input" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span>Firstname</span>
        </label>
        <label>
          <input 
            required 
            placeholder="" 
            type="text" 
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <span>Lastname</span>
        </label>
      </div>
      <label>
        <input 
          required 
          placeholder="" 
          type="email" 
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>Email</span>
      </label>
      <label>
        <input 
          required 
          placeholder="" 
          type="password" 
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>Password</span>
      </label>
      <label>
        <input 
          required 
          placeholder="" 
          type="password" 
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span>Confirm password</span>
      </label>
      <button className="submit">Submit</button>
      <p className="signin">Already have an account? <a href="#">Signin</a></p>
    </form>
  );
}
SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default SignupForm;

