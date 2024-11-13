import { useContext, useState } from "react";
import { AuthenticationContext } from "../../services/Authentication.context";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
import { deleteMyAccount, deleteUser } from "../../services/userServis";
import ChangePassword from "../change-password/ChangePassword";

const Profile = () => {
  const [changePassword, setChangePassword] = useState(false);
  const { user, handleLogout } = useContext(AuthenticationContext);
  if (!user) return <div>No hay ningún usuario logueado</div>;

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      await deleteMyAccount();
      handleLogout();
      navigate("/");
    } catch (err) {
      console.error("Error al eliminar la cuenta:", err);
    }
  };
  const handleDeletePlan = async (name) => {
    //await deleteUser(name).then(() => navigate("/")); FALTA QUE EL USER COMUN PUEDA BORRAR SU PLAN
  };

  return (
    <div className="container-profile">
      <h2 className="title-profile">Cuenta</h2>
      <div className="card-profile">
        {/* Campo de nombre */}
        <div className="field-profile">
          <span className="label-profile">Nombre:</span>
          <span className="value-profile">{user.name}</span>
        </div>

        <div className="field-profile">
          <span className="label-profile">Email:</span>
          <span className="value-profile">{user.email}</span>
        </div>

        {/* Campo de contraseña */}
        <div className="field-profile">
          <span className="label-profile">Contraseña:</span>
          <span className="value-profile">
            <p>**************</p>
            <button
              className="btn btn-dark"
              onClick={() => setChangePassword(true)}
            >
              Cambiar contraseña
            </button>

            {changePassword && (
              <ChangePassword
                setCloseModal={setChangePassword}
              ></ChangePassword>
            )}
          </span>
        </div>

        {/* Campo de plan seleccionado */}
        <div className="field-profile">
          <span className="label-profile">Plan Seleccionado:</span>
          <div className="value-profile">
            {user.subscriptionState === "Inactive" ||
            !user.subscriptionState ? (
              <>
                <p>Tu cuenta no tiene acceso a nuestro contenido</p>
                <Link to="/selectPlan" className="link-profile">
                  Accede por solo $2
                </Link>
              </>
            ) : (
              <p>Premium</p>
            )}
          </div>
        </div>

        {/* Botón de Borrar Cuenta */}
        <div className="field-profile">
          <div className="delete-button-container">
            {user.subscriptionState === "Active" && (
              <button
                className="btn btn-sm btn-danger mt-3"
                onClick={() => {
                  if (
                    window.confirm(
                      "¿Estás seguro de que deseas cancelar tu Plan Premium?, ya no tendras acceso a nuestro contenido."
                    )
                  ) {
                    handleDeletePlan(user.name);
                  }
                }}
              >
                Cancelar mi plan
              </button>
            )}

            <button
              className="btn btn-sm btn-outline-danger mt-3"
              onClick={() => {
                if (
                  window.confirm(
                    "¿Estás seguro de que deseas borrar tu cuenta? Esta acción es irreversible."
                  )
                ) {
                  handleDeleteUser();
                }
              }}
            >
              Borrar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
