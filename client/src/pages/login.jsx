import { Link } from "react-router-dom";
import "./login.css";
import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; // Import your LOGIN_USER mutation

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [login] = useMutation(LOGIN_USER);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      if (data.login.token) {
        localStorage.setItem('token', data.login.token);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div>
      <h1>Signin Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Sign In</button>
      {isLoggedIn && <Link to="/messaging">Go to Messaging</Link>}
    </div>
  );
}

export default LoginPage;
