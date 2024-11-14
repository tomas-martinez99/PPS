import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { updateUser } from "../../../../services/userServis";

const ModalUpdateUser = ({ name, email, role, onClose }) => {
  
  const [newName, setNewName] = useState(null);
  const [newRole, setNewRole] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  useEffect (()=>{
    setNewEmail(email)
    setNewName(name)
    setNewRole(role)
    console.log(newEmail,newName,newRole,"Estado inicial")
  },[])

  const handleSave = async () => {
    const userData = {
      name: newName,
      email: newEmail,
      role: newRole,
    };

    console.log("userData", userData);
    try {
      await updateUser(userData, userData.name);

      console.log("userData", userData);
      console.log("usuario actualizado");
      onClose();
    } catch (error) {
      console.log("error al actualizar", error);
    }
  };
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
            onChange={(e) => setNewName(e.target.value)}
            required
            disabled
          />
        </label>
        <label>
          Role
          <input
            type="text"
            placeholder="role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            placeholder="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </label>
        <button onClick={handleSave} className="save-button">
          Guardar cambios
        </button>
        <button onClick={onClose} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
};

ModalUpdateUser.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  onClose: PropTypes.func,
  password: PropTypes.string,
};

export default ModalUpdateUser;
