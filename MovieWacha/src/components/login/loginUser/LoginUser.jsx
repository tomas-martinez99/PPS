import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../../../services/apiServices";
import { Alert, Button, Form, FloatingLabel, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../../services/Authentication.context";
import "./LoginUser.css";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    exist: false,
    notFunction: false,
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthenticationContext);

  const handlesumbit = (e) => {
    e.preventDefault();

    if (!emailRef.current.value) {
      emailRef.current.focus();
      setErrors({ ...errors, email: true });
      return;
    }

    if (!passwordRef.current.value) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: true });
      return;
    }
    loginHandler(emailRef.current.value, passwordRef.current.value);
  };

  const changeEmailHandler = () => {
    setErrors((prevErrors) => ({ ...prevErrors, email: false }));
    setEmail(emailRef.current.value);
  };

  const changePasswordHandler = (event) => {
    setErrors((prevErrors) => ({ ...prevErrors, password: false }));
    setPassword(event.target.value);
  };

  const loginHandler = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        const user = response.data;
        handleLogin(
          user.username,
          user.rol,
          user.email,
          user.filmsFav,
          user.status
        );
        navigate("/");
        console.log("user", user);
      } else {
        setErrors({ ...errors, exist: true });
      }
    } catch (error) {
      console.error("Error al iniciar sesion:", error);
      setErrors({ ...errors, notFunction: true });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 px-5 shadow"
        style={{ width: "500px", height: "400px", color: "white" }}
      >
        <Card.Body>
          <Form className="text-center">
            <Form.Text>Iniciar Sesion</Form.Text>
            <Form.Group className="mb-3" controlId="formBasicuser">
              <FloatingLabel label="Ingresar su Email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder=""
                  required
                  onChange={changeEmailHandler}
                  ref={emailRef}
                  value={email}
                  className={errors.email && "border border-danger"}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="floatingPassword"
                label="Ingresar su contraseña"
              >
                <Form.Control
                  placeholder="Password"
                  className={errors.password && "border border-danger"}
                  type="password"
                  required
                  onChange={changePasswordHandler}
                  value={password}
                  ref={passwordRef}
                />
              </FloatingLabel>
            </Form.Group>
            {errors.exist && (
              <div className="mt-3 mb-3">
                <Alert variant="danger">
                  El usuario y/o contraseña incorrectos.
                </Alert>
              </div>
            )}
            <Button
              className="custom-button-login"
              type="submit"
              onClick={handlesumbit}
            >
              Iniciar Sesión
            </Button>
            <h6>
              No tenes una cuenta creada?
              <Button
                variant="link"
                className="fw-bold pt-1"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Creá tu cuenta
              </Button>
            </h6>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

LoginUser.propTypes = {};

export default LoginUser;
