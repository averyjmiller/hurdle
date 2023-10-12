import { Link } from 'react-router-dom';
import "./login.css";
import React, { useState } from 'react';
import axios from 'axios';  
import customButton from 'hurdle/app.css';  

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('preferredLanguage', response.data.preferredLanguage);
      } else {
        console.error('Login failed:', response.data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1>Signin Page</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
}

export default LoginPage;