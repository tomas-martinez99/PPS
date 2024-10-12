import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const RegisterSuccess = () => {
  const navigate = useNavigate()

  const NavigateLoginClick = () =>{
    navigate("/login")
  }
  return (
    <div>
      <h3>Disfruta de tu primer mes gratis</h3>
        <Button onClick={NavigateLoginClick}>Iniciar Secion</Button>
    </div>
  )
}

RegisterSuccess.propTypes = {}

export default RegisterSuccess