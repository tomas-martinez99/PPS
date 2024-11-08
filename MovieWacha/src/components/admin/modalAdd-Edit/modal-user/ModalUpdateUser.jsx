import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { updateUser } from '../../../../services/userServis'


const ModalUpdateUser = ({name,email,role, onClose}) => {
    console.log("name",name, "email",email,"role",role)
    const [newName, setNewName]= useState(name)
    const [newRole, setNewRole]= useState(role)
    const [newEmail, setNewEmail] = useState(email)
   

    const handleSave = async ()=>{
      const userData ={
        name:newName,
        email:newEmail,
        role:newRole

      }
      try{
        await updateUser(userData, name);
        console.log("usuario actualizado")
        onClose()
      }catch(error){
        console.log("error al actualizar", error)
      }
    }
  return (
    <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar usuario</h2>
            
                <label>
                    Nombre
                    <input
                        type="text"
                        placeholder="nombre"
                        value={newName}
                        onChange={ (e)=> setNewName(e.target.value )}
                        required
                    />
                </label>
                <label>
                    Role
                    <input
                        type="text"
                        placeholder="role"
                        value={newRole}
                        onChange={ (e)=> setNewRole(e.target.value )}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        type="text"
                        placeholder="email"
                        value={newEmail}
                        onChange={ (e)=> setNewEmail(e.target.value )}
                        required
                    />
                </label>
                <button onClick={handleSave} className="save-button">Guardar cambios</button>
                <button onClick={onClose} className="cancel-button">Cancelar</button>
            </div>
        </div>
  )
}

ModalUpdateUser.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    onClose: PropTypes.func,
    password: PropTypes.string,
}

export default ModalUpdateUser