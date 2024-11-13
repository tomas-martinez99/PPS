import React, { useRef } from "react";
import useRequestResetPassword from "../../hooks/users/UseRequestResetPassword";
import { Alert, Button, Card, Form } from "react-bootstrap";

const ForgotPassword = () => {
    const emailInputRef = useRef();
  const [
    forgotPasswordResult,
    forgotPasswordIsLoading,
    forgotPasswordError,
    requestResetPassword,
  ] = useRequestResetPassword();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailInput = emailInputRef.current.value;

    await requestResetPassword(emailInput);
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 px-5 shadow card-general"
        style={{ width: "500px", height: "400px", color: "white" }}
      >
        <Card.Body>
        <h2 className="text-black">Olvidaste tu contraseña?</h2>
          <Form className="text-center">
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label className="Input-Label d-flex align-items-center">
                Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="abc123@gmail.com"
                required
                ref={emailInputRef}
                className={'dark-border ${errors.email ? "border-danger" : ""}'}
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
            {forgotPasswordError && (
              <Alert variant="danger">{forgotPasswordError}</Alert>
            )}

            {forgotPasswordIsLoading && (
              <Alert variant="info">Cargando....</Alert>
            )}

            {forgotPasswordResult && (
              <Alert variant="success">
                Se ha enviado un código a tu email para restablecer la
                contraseña!
              </Alert>
            )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPassword;
