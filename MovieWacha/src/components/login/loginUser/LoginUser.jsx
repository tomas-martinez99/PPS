import React, { useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { loginUser } from "../../../services/apiServices"
import { Alert, Button, Form, FloatingLabel, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../services/Authentication.context';
import "./LoginUser.css"

const LoginUser = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ user: false, password: false, exist: false, notFunction: false });
  const userRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthenticationContext)

  const handlesumbit = (e) => {
    e.preventDefault();

    if (!userRef.current.value) {
      userRef.current.focus();
      setErrors({ ...errors, user: true });
      return;
    }

    if (!passwordRef.current.value) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: true });
      return
    }
    loginHandler(userRef.current.value, passwordRef.current.value)

  }

  const changeUserHandler = () => {
    setErrors((prevErrors) => ({ ...prevErrors, user: false }));
    setUser(userRef.current.value);
  };

  const changePasswordHandler = (event) => {
    setErrors((prevErrors) => ({ ...prevErrors, password: false }));
    setPassword(event.target.value);
  };

  const loginHandler = async (user, password) => {

    try {
      const response = await loginUser(user, password);
      if (response.success) {
        const user = response.data
        handleLogin(user.username,user.rol,user.email,user.filmsFav,user.status,user.firstName,user.lastName)
        navigate("/")
        console.log("user", user)


      } else {
        setErrors({ ...errors, exist: true })

      }
    } catch (error) {
      console.error("Error al iniciar sesion:", error);
      setErrors({ ...errors, notFunction: true }


      )
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 px-5 shadow" style={{ width: "500px", height: "400px", color: "white" }}>
        <Card.Body>
          <Form className="text-center">
            <Form.Text>Iniciar Secion</Form.Text>
            <Form.Group className="mb-3" controlId="formBasicuser">
              <FloatingLabel label="Ingresar su Usuario" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=""
                  required
                  onChange={changeUserHandler}
                  ref={userRef}
                  value={user}
                  className={errors.user && "border border-danger"}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Ingresar su contraseña">
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
            <Button className='custom-button-login' type="submit" onClick={handlesumbit} >
              Iniciar Sesión
            </Button>
            <h6>No tenes una cuenta creada?<Button variant="link" className="fw-bold pt-1" onClick={() => { navigate("/register") }}>Creá tu cuenta</Button></h6>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

LoginUser.propTypes = {}

export default LoginUser