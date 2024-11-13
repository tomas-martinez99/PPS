import { useState, createContext } from "react";
import React from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

export const AuthenticationContext = createContext({});

const tokenValue = localStorage.getItem("token");

export const AuthenticationContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);
  const [user, setUser] = useState(() => {
    return tokenValue ? jwtDecode(tokenValue) : null;
  });

  const handleLogin = (user) => {
    localStorage.setItem("token", user);
    setToken(user);

    const decodedUserData = jwtDecode(user);
    setUser(decodedUserData);
    console.log("user auth", decodedUserData);

    console.log(decodedUserData, "datos user");
    console.log(token, "token context");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token
    console.log("Cierre de sesión exitoso");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, token, handleLogin, handleLogout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropTypes.object,
};
