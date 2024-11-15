import { Link } from "react-router-dom";

const UserNotPermis = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>
        Lo sentimos, no tienes permiso para acceder a esta página o la página no
        existe.
      </p>
      <Link to="/" style={styles.link}>
        Volver a la página principal
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 77px)",
    textAlign: "center",
  },
  heading: {
    fontSize: "6rem",
    marginBottom: "1rem",
    color: "#fff",
  },
  message: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    color: "#fff",
  },
  link: {
    fontSize: "1rem",
    textDecoration: "none",
    color: "#000",
    border: "1px solid #007bff",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    backgroundColor: "#fff",
    transition: "all 0.3s ease",
  },
};

export default UserNotPermis;
