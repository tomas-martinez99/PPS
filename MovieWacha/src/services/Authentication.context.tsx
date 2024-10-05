import { useState, createContext } from "react";
import React from "react";
import PropTypes from "prop-types";

export const AuthenticationContext = createContext({});

const userValueString = localStorage.getItem("user");
const userValue = userValueString ? JSON.parse(userValueString) : null;

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);

  const handleLogin = (username,rol,email,filmsFav,status,firstName,lastName) => {
    localStorage.setItem("user", JSON.stringify({ username,rol,email,status,filmsFav,firstName,lastName }));
    setUser({ username,rol,email,status,filmsFav,firstName,lastName});
    
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropTypes.object,
};