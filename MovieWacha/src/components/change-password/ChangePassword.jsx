import { useState } from "react";
import "./changePassword.css";
import { changePassword } from "../../services/userServis";

const ChangePassword = ({ setCloseModal }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica para cambiar la contraseña (puedes agregar la llamada a un servicio aquí)
    console.log("Contraseña actual:", currentPassword);
    console.log("Nueva contraseña:", newPassword);

    if (currentPassword === newPassword) {
      alert("La contraseña actual no puede ser igual a la nueva");
      return;
    }

    let request = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    try {
      // Llamada al servicio para cambiar la contraseña
      await changePassword(request);
      alert("Contraseña cambiada con éxito.");
      setCloseModal(false);
      // Aquí podrías redirigir al usuario a otra página, por ejemplo, el perfil
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      alert(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="heading-change-password">Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label-change-password">Contraseña actual</label>
            <input
              className="input-change-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label-change-password">Nueva contraseña</label>
            <input
              className="input-change-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label-change-password">
              Confirmar nueva contraseña
            </label>
            <input
              className="input-change-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="buttons-container-change-password">
              <button
                className="close-btn"
                onClick={() => setCloseModal(false)}
              >
                Cancelar
              </button>
              <button className="button-change-password" type="submit">
                Cambiar contraseña
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
