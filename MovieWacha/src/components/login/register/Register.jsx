import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Form, FloatingLabel, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./Register.css"
// Series
// -Id
// -Name
// -Descripción
// -Lista de temporadas
// -genero
// -puntuacion

// 	Admin
// -id
// -type: 0(Admin)-1(empleado)-2(usuario)
// -usuario
// -contraseña

// 	Usuario : Admin
// -Gmail
// -numero de teléfono
// -numero de tarjeta 
// -ESATDO DE SUSCRIPCION
// -Lista de favoritos
// 	Empleado:Admin
// -legajo

const initialRegisterUserForm = {
  id: 0,
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  rol: 2,
  telephone: "",
  filmsFav: [],
};
const newRegisterUserFormReducer = (state, action) => {
  switch (action.type) {
    case "FIRSTNAME_FIELD":
      return {
        ...state,
        firstName: action.value
      };
      case "LASTNAME_FIELD":
      return {
        ...state,
        lastName: action.value
      };
      case "USERNAME_FIELD":
      return {
        ...state,
        userName: action.value
      };
      case "TELEPHONE_FIELD":
      return {
        ...state,
        telephone: action.value
      };
      case "EMAIL_FIELD":
      return {
        ...state,
        email: action.value
      };
      case "PASSWORD_FIELD":
      return {
        ...state,
        password: action.value
      };
      case "CONFIRMPASSWORD_FIELD":
      return {
        ...state,
        confirmPassword: action.value
      };
    case "RESET_FORM":
      return initialRegisterUserForm;
    default:
      return state;
  }
};
const Register = () => {
  const [newRegisterUserForm, dispatch] = useReducer(
    newRegisterUserFormReducer,
    initialRegisterUserForm
  )
  // const [errors, setErrors] = useState({
  //   firstName: false,
  //   lastName: false,
  //   userName: false,
  //   email: false,
  //   password: false,
  //   confirmPassword: false,
  //   telephone: false
  // });

  //const navigate = useNavigate();

  const sumbitNewRegisterUserHandler = (e) =>{
    e.preventDefault();
    const newRegisterUserFormData ={
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

    // setErrors({
    //   firstName: !firstName,
    //   lastName: !lastName,
    //   userName: !username,
    //   email: !email,
    //   password: !password,
    //   confirmPassword: !confirmPassword,
    //   telephone: !telephone,
    // });

    console.log(newRegisterUserFormData)
    dispatch({
      type:"RESET_FORM"
    })

  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Card className="p-4 px-5 shadow" style={{ width: "500px", height: "" }}>
        <Card.Body>
          <Form className="text-center" onSubmit={sumbitNewRegisterUserHandler}>
            <h1>Registrarse</h1>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <FloatingLabel controlId="floatingFirstName" label="Ingresar su Nombre" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=""
                  value={newRegisterUserForm.firstName}
                  onChange={(e) => 
                    dispatch({
                      type: "FIRSTNAME_FIELD",
                      field: "firstName",
                      value: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <FloatingLabel controlId="floatingLastName" label="Ingresar su Apellido" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=""
                  value={newRegisterUserForm.lastName}
                  onChange={(e) => 
                    dispatch({
                      type: "LASTNAME_FIELD",
                      field: "lastName",
                      value: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <FloatingLabel controlId="floatingUserName" label="Ingresar Nombre de Usuario" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=""
                  value={newRegisterUserForm.userName}
                  onChange={(e) => 
                    dispatch({
                      type: "USERNAME_FIELD",
                      field: "userName",
                      value: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTelephone">
              <FloatingLabel controlId="floatingTelophone" label="Ingresar su Numeor de Telefono" className="mb-3">
                <Form.Control
                  type="string"
                  placeholder=""
                  value={newRegisterUserForm.telephone}
                  onChange={(e) => 
                    dispatch({
                      type: "TELEPHONE_FIELD",
                      field: "telephone",
                      value: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingEmail" label="Ingresar su Email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder=""
                  value={newRegisterUserForm.email}
                  onChange={(e) => 
                    dispatch({
                      type: "EMAIL_FIELD",
                      field: "email",
                      value: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Ingresar su Contraseña">
                <Form.Control
                  type='password'
                  placeholder=""
                  value={newRegisterUserForm.password}
                  onChange={(e) => 
                    dispatch({
                      type: "PASSWORD_FIELD",
                      field: "password",
                      value: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicComfirmPassword">
              <FloatingLabel controlId="floatingComfirmPassword" label="Confirmar Contraseña" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder=""
                  value={newRegisterUserForm.confirmPassword}
                  onChange={(e) => 
                    dispatch({
                      type: "CONFIRMPASSWORD_FIELD",
                      field: "confirmPassword",
                      value: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
            </Form.Group>
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