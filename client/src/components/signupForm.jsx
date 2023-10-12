import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
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
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="Chinese">Chinese</option>
          <option value="Hindi">Hindi</option>
          <option value="French">French</option>
          <option value="Arabic">Arabic</option>
          <option value="Bengali">Bengali</option>
          <option value="Russian">Russian</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Indonesian">Indonesian</option>
          <option value="Urdu">Urdu</option>
          <option value="German">German</option>
          <option value="Japanese">Japanese</option>
          <option value="Swahili">Swahili</option>
          {/* ...add more languages as needed... */}
        </select>
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
}

export default SignupForm;
