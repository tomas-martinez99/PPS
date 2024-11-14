import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { Dropdown } from "react-bootstrap";
import { AuthenticationContext } from "../../services/Authentication.context";

const Header = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthenticationContext);
  const { user } = useContext(AuthenticationContext);

  const [showSearch, setShowSearch] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [enteredSearch, setEnteredSearch] = useState("");

  const [navLinkSelected, setNavLinkSelected] = useState("");

  const isLogged = user;

  console.log("user", user);
  const userRole = user?.role; // FALTA CONTEXT DE ROLES DE USUARIO

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath == "/") {
      setNavLinkSelected("");
    } else if (currentPath.includes("movies")) {
      setNavLinkSelected("movies");
    } else if (currentPath.includes("series")) {
      setNavLinkSelected("series");
    } else if (currentPath.includes("login")) {
      setNavLinkSelected("login");
    }
  }, [window.location.pathname]);

  const getNavLinkClass = (link) => {
    return navLinkSelected === link ? "active" : "";
  };

  const handleClickLogout = () => {
    handleLogout();
    navigate("/");
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = async (e) => {
    if (e.keyCode === 13 && enteredSearch.length > 0) {
      navigate(`/search-results/${enteredSearch}`);
    }
  };

  return (
    <Navbar
      expand="lg"
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      data-bs-theme="dark"
      style={{ position: "sticky", zIndex: 100, width: "100%", top: 0.1 }}
    >
      <Container fluid>
        <Navbar.Brand>
          <img
            className="logo"
            src="/logo.png"
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          <Nav className="mx-auto">
            {userRole === "Admin" ? (
              <>
                <Nav.Link onClick={() => navigate("/abmSeries")}>
                  Series
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/abmMovies")}>
                  Peliculas
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/abmUser")}>
                  Usuarios
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/statistics")}>
                  Estadisticas
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/abmGenres")}>
                  Generos
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  onClick={() => navigate("/")}
                  className={getNavLinkClass("")}
                >
                  Inicio
                </Nav.Link>
                <Nav.Link
                  onClick={() => navigate("/movies")}
                  className={getNavLinkClass("movies")}
                >
                  Peliculas
                </Nav.Link>
                <Nav.Link
                  onClick={() => navigate("/series")}
                  className={getNavLinkClass("series")}
                >
                  Series
                </Nav.Link>
              </>
            )}
          </Nav>

          <div className="d-flex align-items-center position-relative">
            {showSearch && (
              <Form.Control
                type="search"
                placeholder="Encontra pelis y series"
                className="me-2"
                aria-label="Search"
                style={{
                  position: "absolute",
                  right: "100%",
                  minWidth: "250px",
                  maxWidth: "100%",
                }}
                onChange={(e) => setEnteredSearch(e.target.value)}
                onKeyDown={(e) => handleSearch(e)}
              />
            )}
            <Button
              variant="dark"
              onClick={() => setShowSearch(!showSearch)}
              // onClick={(e) => handleSearch(e, "click")}
              className="me-2"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
            <Button
              variant="dark"
              onClick={() => {
                !isLogged ? navigate("/login") : navigate("/my-list");
              }}
              className="me-2"
            >
              <i className="fa-regular fa-bookmark"></i>
            </Button>
            {!isLogged ? (
              <Button
                variant="transparent"
                className="btn-sm login"
                style={{
                  maxWidth: "140px",
                  borderColor: "#7470FF",
                  height: "37px",
                }}
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </Button>
            ) : (
              <Dropdown
                as="div"
                className="ml-3"
                style={{ backgroundColor: "transparent !important" }}
              >
                <Dropdown.Toggle
                  id="user-menu"
                  className="d-flex align-items-center text-white rounded-circle border-0"
                  style={{
                    width: "60px",
                    height: "45px",
                    backgroundColor: "transparent",
                  }}
                >
                  <img
                    alt="User"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="rounded-circle"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={() => navigate("/profile")}>
                    Perfil
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleClickLogout}>
                    Cerrar Sesion
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
