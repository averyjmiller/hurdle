import React, { createContext, useContext, useState, useEffect } from 'react';
import decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('id_token');
    if (token) {
      const profile = decode(token);
      setCurrentUser(profile);
    }
  }, []);

  const login = (idToken) => {
    localStorage.setItem('id_token', idToken);
    const profile = decode(idToken);
    setCurrentUser(profile);
    history.push('/messaging');
  };

  const logout = () => {
    localStorage.removeItem('id_token');
    setCurrentUser(null);
    history.push('/login');
  };

  const loggedIn = () => {
    const token = localStorage.getItem('id_token');
    if (!token) {
      return false;
    }
    try {
      const { exp } = decode(token);
      if (exp < new Date().getTime() / 1000) {
        logout();
        return false;
      }
    } catch (e) {
      logout();
      return false;
    }
    return true;
  };

  const value = {
    currentUser,
    login,
    logout,
    loggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
