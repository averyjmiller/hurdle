import { useState } from 'react';
import PropTypes from 'prop-types';
import './signupForm.css';

function SignupForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('English');  // Default language

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      username,
      password,
      preferredLanguage  // Include preferredLanguage in the form data
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="title">Sign Up</div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="preferredLanguage">Preferred Language:</label>
        <select
          id="preferredLanguage"
          name="preferredLanguage"
          value={preferredLanguage}
          onChange={(e) => setPreferredLanguage(e.target.value)}
          required
        >
          {/* ... your language options ... */}
        </select>
      </div>
      <div>
        <button type="submit" className="submit">Sign Up</button>
      </div>
    </form>
  );
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignupForm;
