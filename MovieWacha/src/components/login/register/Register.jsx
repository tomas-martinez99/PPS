import { useReducer, useState, } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Form, FloatingLabel, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./Register.css"
import { registerUser } from '../../../services/apiServices';

const initialRegisterUserForm = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: {
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
    passwordMatch: false,
  },
};
const newRegisterUserFormReducer = (state, action) => {
  switch (action.type) {
    case "FIELD_CHANGE":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: false }
      };
    case "VALIDATE_FIELDS": {
      const newErrors = {
        userName: !state.userName,
        email: !state.email,
        password: !state.password,
        confirmPassword: !state.confirmPassword,
        passwordMatch: state.password !== state.confirmPassword
      };
      return {
        ...state,
        errors: newErrors,
      };
    }

    case "RESET_FORM":
      return initialRegisterUserForm;

    default:
      return state;
  }
};
const Register = () => {
  const [showPasswordMismatchAlert, setShowPasswordMismatchAlert] = useState(false)
  const [showRegisterErrorAlert,setShowRegisterErrorAlert]= useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showRegisterErrorAlertMessage, setShowRegisterErrorAlertMessage] = useState()
  const [newRegisterUserForm, dispatch] = useReducer( newRegisterUserFormReducer,initialRegisterUserForm)
  const navigate = useNavigate();

  const submitNewRegisterUserHandler = async (e) => {
    e.preventDefault();

    dispatch({ type: "VALIDATE_FIELDS" });
    const { errors } = newRegisterUserForm;
    const hasErrors = Object.values(errors).some(error => error);

    if (errors.passwordMatch) {
      setShowPasswordMismatchAlert(true);
      return;
    }

    if (hasErrors) {
      setShowRegisterErrorAlert(true);
      return;
    }

    const newRegisterUserFormData = {
      userName: newRegisterUserForm.userName,
      password: newRegisterUserForm.password, 
      email: newRegisterUserForm.email,
    };

      try{
        setIsSubmitting(true)
        const responseData = await registerUser(newRegisterUserFormData)
        console.log("Usuario Registrado con exito", responseData)

        dispatch({type: "RESET_FORM"})
        navigate("/registersuccess")
        setShowPasswordMismatchAlert(false)
        setShowRegisterErrorAlert(false)
      }catch (error){
        console.error("Error al registrar", error);
      // Verifica si es un error relacionado con el nombre de usuario o el email
      if (error.message.includes('usuario ya está en uso')) {
        // Mostrar mensaje específico para nombre de usuario
        setShowRegisterErrorAlertMessage('El nombre de usuario ya está en uso');
      } else if (error.message.includes('email ya está en uso')) {
        // Mostrar mensaje específico para email
        setShowRegisterErrorAlertMessage('El email ya está en uso');
      } else {
        setShowRegisterErrorAlertMessage('Error al registrar. Inténtelo de nuevo más tarde.');
      }
        setShowRegisterErrorAlert(true)
      } finally{
        setIsSubmitting(false)
      }
  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Card className="p-4 px-5 shadow" style={{ width: "500px", height: "" }}>
        <Card.Body>
          <Form className="text-center" onSubmit={submitNewRegisterUserHandler}>
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label className='input-label d-flex align-items-center'>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={newRegisterUserForm.userName}
                  onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "userName", value: e.target.value })}
                  className={newRegisterUserForm.errors.userName ? 'is-invalid' : ''}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='input-label d-flex align-items-center'>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder=""
                  value={newRegisterUserForm.email}
                  onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "email", value: e.target.value })}
                  className={newRegisterUserForm.errors.password || newRegisterUserForm.errors.passwordMatch ? 'is-invalid' : ''}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className='input-label d-flex align-items-center'>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=""
                  value={newRegisterUserForm.password}
                  onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "password", value: e.target.value })}
                  className={newRegisterUserForm.errors.confirmPassword || newRegisterUserForm.errors.passwordMatch ? 'is-invalid' : ''}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicComfirmPassword">
              <Form.Label className='input-label d-flex align-items-center'>Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=""
                  value={newRegisterUserForm.confirmPassword}
                  onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "confirmPassword", value: e.target.value })}
                  className={newRegisterUserForm.errors.confirmPassword || newRegisterUserForm.errors.passwordMatch ? 'is-invalid' : ''}
                />
            </Form.Group>
            {showPasswordMismatchAlert && (
              <Alert variant="danger" onClose={() => setShowPasswordMismatchAlert(false)} dismissible>
                Las contraseñas no coinciden. Por favor, verifica.
              </Alert>
            )}
            {showRegisterErrorAlert && (
              <Alert variant="danger" onClose={() => setShowRegisterErrorAlert(false)} dismissible>
                {showRegisterErrorAlertMessage}
              </Alert>
            )}
            <Button className='custom-button-register' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : 'Registrarme'}
            </Button>
            <h6 className="h6">¿Ya tenés una cuenta?<Button variant="link" className="fw-bold pt-1" onClick={() => { navigate("/login");}}>Logueate</Button>
            </h6>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

Register.propTypes = {}

export default Register