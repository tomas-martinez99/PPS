import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useResetPassword from "../../hooks/users/UseResetPassword";
import { Alert, Button, Card, Form } from "react-bootstrap";

const ResetPassword = () => {
  const location = useLocation();
  const [jwtReset, setJwtReset] = useState();
  const passwordInputRef = useRef();
  const [
    resetPasswordResult,
    resetPasswordIsLoading,
    resetPasswordError,
    resetPassword,
  ] = useResetPassword();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const jwtReset = searchParams.get("token");

    const decodedToken = jwtDecode(jwtReset);
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime > decodedToken.exp) {
      console.log("El token ya expiró");
    } else {
      console.log("El token aún es válido");
      setJwtReset(jwtReset);
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPassword = passwordInputRef.current.value;

    const data = {
      resetJwt: jwtReset,
      newPassword: newPassword,
    };

    await resetPassword(data);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 px-5 shadow card-general"
        style={{ width: "500px", height: "400px", color: "white" }}
      >
        <Card.Body>
          <h2 className="text-black">Cambiar contraseña</h2>

          {jwtReset ? (
            <>
              <Form className="text-center">
                <Form.Group className="mb-3" controlId="formBasicUserName">
                  <Form.Label className="Input-Label d-flex align-items-center">
                    Nueva contraseña
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    min={4}
                    required
                    ref={passwordInputRef}
                    className={
                      'dark-border ${errors.email ? "border-danger" : ""}'
                    }
                  />
                </Form.Group>
                <Button
                  className="custom-button-login"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Enviar
                </Button>
              </Form>
              {resetPasswordError && (
                <Alert variant="danger">{resetPasswordError}</Alert>
              )}

              {resetPasswordIsLoading && (
                <Alert variant="info">Cargando....</Alert>
              )}

              {resetPasswordResult && (
                <Alert variant="success">
                  Contraseña cambiada exitosamente!
                </Alert>
              )}
            </>
          ) : (
            <Alert variant="danger">
              El token para cambiar la contraseña ya expiro
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResetPassword;
