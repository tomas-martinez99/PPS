import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./registerSuccess.css";

const RegisterSuccess = () => {
  const navigate = useNavigate();

  const NavigateLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h3>Bienvenido a Movie Wacha!</h3>
      <img src="/logo.png" alt="Logo de Movie Wacha" className="logo-image" />
      <Button onClick={NavigateLoginClick}>Iniciar Sesión</Button>
    </div>
  );
};

RegisterSuccess.propTypes = {};

export default RegisterSuccess;
