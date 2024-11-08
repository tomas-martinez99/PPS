import { useContext } from "react";
import { AuthenticationContext } from "../../services/Authentication.context";
import "./profile.css";

const Profile = () => {
  const { user } = useContext(AuthenticationContext);
  if (!user) return <div>No hay ningún usuario logueado</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cuenta</h2>
      <div style={styles.card}>
        {/* Campo de correo electrónico */}
        {/* <div style={styles.field}>
          <span style={styles.label}>Correo electrónico:</span>
          <span style={styles.value}>{user}</span>
          <span style={styles.icon}></span>
        </div> */}

        {/* Campo de nombre */}
        <div style={styles.field}>
          <span style={styles.label}>Nombre:</span>
          <span style={styles.value}>{user.name}</span>
          <span style={styles.icon}></span>
        </div>

        {/* Campo de contraseña */}
        <div style={styles.field}>
          <span style={styles.label}>Contraseña:</span>
          <span style={styles.value}></span>
          <span style={styles.icon}></span>
        </div>

        {/* Campo de plan seleccionado */}
        <div style={styles.field}>
          <span style={styles.label}>Plan Seleccionado:</span>
          <span style={styles.value}>Premium</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1e1e1e", // Fondo oscuro
    color: "#fff",
    minHeight: "100vh",
    paddingTop: "40px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#2c2c2c",
    borderRadius: "8px",
    width: "80%",
    maxWidth: "400px",
    padding: "10px",
  },
  field: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #3e3e3e",
    padding: "15px",
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    flex: 1,
    textAlign: "right",
    marginRight: "10px",
  },
  icon: {
    cursor: "pointer",
    color: "#aaa",
    fontSize: "16px",
  },
};

export default Profile;
