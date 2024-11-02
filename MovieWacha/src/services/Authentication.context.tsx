import { useState, createContext } from "react";
import React from "react";
import PropTypes from "prop-types";

export const AuthenticationContext = createContext({});

const userValueString = localStorage.getItem("user");
const tokenValue = localStorage.getItem("token");

const userValue = userValueString ? JSON.parse(userValueString) : null;

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);
  const [token, setToken] = useState(tokenValue);

  const handleLogin = (
    username,
    rol,
    email,
    filmsFav,
    status,
    firstName,
    lastName,
    authToken
  ) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username,
        rol,
        email,
        status,
        filmsFav,
        firstName,
        lastName,
      }));
      localStorage.setItem("token", authToken);
    setUser({ username, rol, email, status, filmsFav, firstName, lastName });
    setToken(authToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Elimina el token
    console.log("Cierre de sesión exitoso");
    setUser(null);
    setToken(null)
  };

  return (
    <AuthenticationContext.Provider value={{ user,token, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropTypes.object,
};
