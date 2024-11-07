import React from 'react'
import PropTypes from 'prop-types'

const ModalUpdateUser = ({name,email,role, onClose, onUpdate}) => {
    console.log("name",name, "email",email,"role",role)
    const handleSave = async ()=>{
      const userData ={
        name:name,
        email:email,
        role:role,
      }try{
        await 
      }
    }
  return (
    <></>
  )
}

ModalUpdateUser.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
}

export default ModalUpdateUser