import { useReducer, useState, } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Form, FloatingLabel, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./Register.css"

const initialRegisterUserForm = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  telephone: "",
  errors: {
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
    telephone: false,
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
        firstName: !state.firstName,
        lastName: !state.lastName,
        userName: !state.userName,
        email: !state.email,
        password: !state.password,
        confirmPassword: !state.confirmPassword,
        telephone: !state.telephone,
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
  const [newRegisterUserForm, dispatch] = useReducer(
    newRegisterUserFormReducer,
    initialRegisterUserForm
  )

  const navigate = useNavigate();

  const submitNewRegisterUserHandler = (e) => {
    e.preventDefault();

    dispatch({ type: "VALIDATE_FIELDS" });
    const newErrors = {
      firstName: !newRegisterUserForm.firstName,
      lastName: !newRegisterUserForm.lastName,
      userName: !newRegisterUserForm.userName,
      email: !newRegisterUserForm.email,
      password: !newRegisterUserForm.password,
      confirmPassword: !newRegisterUserForm.confirmPassword,
      telephone: !newRegisterUserForm.telephone,
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
        firstName: newRegisterUserForm.firstName,
        lastName: newRegisterUserForm.lastName,
        userName: newRegisterUserForm.userName,
        email: newRegisterUserForm.email,
        password: newRegisterUserForm.password,
        confirmPassword: newRegisterUserForm.confirmPassword,
        telephone: newRegisterUserForm.telephone,
        rol: 2,
        filmsFav: [],
      }
      console.log(newRegisterUserFormData)
      dispatch({
        type: "RESET_FORM"
      })
      navigate("/registersuccess")
      setShowPasswordMismatchAlert(false);
      setShowRegisterErrorAlert(false)
    }


  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Card className="p-4 px-5 shadow" style={{ width: "500px", height: "" }}>
        <Card.Body>
          <Form className="text-center" onSubmit={submitNewRegisterUserHandler}>
            <h1>Registrarse</h1>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <FloatingLabel controlId="floatingFirstName" label="Ingresar su Nombre" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=""
                  value={newRegisterUserForm.firstName}
                  onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "firstName", value: e.target.value })}
                  className={newRegisterUserForm.errors.firstName ? 'is-invalid' : ''}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <FloatingLabel controlId="floatingLastName" label="Ingresar su Apellido" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=""
                  value={newRegisterUserForm.lastName}
                  onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "lastName", value: e.target.value })}
                  className={newRegisterUserForm.errors.lastName ? 'is-invalid' : ''}
                />
              </FloatingLabel>
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="formBasicTelephone">
              <FloatingLabel controlId="floatingTelephone" label="Ingresar su Numeor de Telefono" className="mb-3">
                <Form.Control
                  type="tel"
                  placeholder=""
                  value={newRegisterUserForm.telephone}
                  onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "telephone", value: e.target.value })}
                  className={newRegisterUserForm.errors.telephone ? 'is-invalid' : ''}
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
                Porfavor complete todos los campos
              </Alert>
            )}
            <Button className='custom-button-register' type="submit" >
              Crear cuenta
            </Button>
          </Form>

        </Card.Body>
      </Card>
    </div>
  )
}

Register.propTypes = {}

export default Register