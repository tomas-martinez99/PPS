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
    const newErrors = {
      userName: !newRegisterUserForm.userName,
      email: !newRegisterUserForm.email,
      password: !newRegisterUserForm.password,
      confirmPassword: !newRegisterUserForm.confirmPassword,
      passwordMatch: newRegisterUserForm.password !== newRegisterUserForm.confirmPassword
    };

    const hasErrors = Object.values(newErrors).some(error => error);
    if (hasErrors){
      if (newRegisterUserForm.password !== newRegisterUserForm.confirmPassword) {
        setShowPasswordMismatchAlert(true);
        return;
      }else{
      setShowRegisterErrorAlert(true)
      return
      }
    }

    if (!hasErrors) {
      const newRegisterUserFormData = {
        userName: newRegisterUserForm.userName,
        email: newRegisterUserForm.email,
        password: newRegisterUserForm.password,
        confirmPassword: newRegisterUserForm.confirmPassword,
        rol: 2,
        filmsFav: [],
      }

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
        setShowRegisterErrorAlert(true);
        // Mostrar mensaje específico para nombre de usuario
        setShowRegisterErrorAlertMessage('El nombre de usuario ya está en uso');
      } else if (error.message.includes('email ya está en uso')) {
        setShowRegisterErrorAlert(true);
        // Mostrar mensaje específico para email
        setShowRegisterErrorAlertMessage('El email ya está en uso');
      } else {
        setShowRegisterErrorAlert(true);
        setShowRegisterErrorAlertMessage('Error al registrar. Inténtelo de nuevo más tarde.');
      }
        setShowRegisterErrorAlert(true)
      } finally{
        setIsSubmitting(false)
      }
  }}
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Card className="p-4 px-5 shadow" style={{ width: "500px", height: "" }}>
        <Card.Body>
          <Form className="text-center" onSubmit={submitNewRegisterUserHandler}>
            <h1>Registrarse</h1>
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <FloatingLabel controlId="floatingUserName" label="Ingresar Nombre de Usuario" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=""
                  value={newRegisterUserForm.userName}
                  onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "userName", value: e.target.value })}
                  className={newRegisterUserForm.errors.userName ? 'is-invalid' : ''}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingEmail" label="Ingresar su Email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder=""
                  value={newRegisterUserForm.email}
                  onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "email", value: e.target.value })}
                  className={newRegisterUserForm.errors.email ? 'is-invalid' : ''}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Ingresar su Contraseña">
                <Form.Control
                  type='password'
                  placeholder=""
                  value={newRegisterUserForm.password}
                  onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "password", value: e.target.value })}
                  className={newRegisterUserForm.errors.password || newRegisterUserForm.errors.passwordMatch ? 'is-invalid' : ''}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicComfirmPassword">
              <FloatingLabel controlId="floatingComfirmPassword" label="Confirmar Contraseña" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder=""
                  value={newRegisterUserForm.confirmPassword}
                  onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "confirmPassword", value: e.target.value })}
                  className={newRegisterUserForm.errors.confirmPassword || newRegisterUserForm.errors.passwordMatch ? 'is-invalid' : ''}
                />
              </FloatingLabel>
            </Form.Group>
            {showPasswordMismatchAlert && (
              <Alert variant="danger" onClose={() => setShowPasswordMismatchAlert(false)} dismissible>
                Las contraseñas no coinciden. Por favor, verifica.
              </Alert>
            )}
            {showRegisterErrorAlert && (
              <Alert variant="danger" onClose={() => setShowRegisterErrorAlert(false)} dismissible>
                {setShowRegisterErrorAlertMessage}
              </Alert>
            )}
            <Button className='custom-button-register' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : 'Crear cuenta'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

Register.propTypes = {}

export default Register