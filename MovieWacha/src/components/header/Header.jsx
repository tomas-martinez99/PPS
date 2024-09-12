import {Button,Navbar, Container, Nav,Form,NavDropdown} from "react-bootstrap"
import "../../LayoutColors.css";
import "./Header.css"
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  const handleHomeNavigation = () =>{
    navigate("/")
  }
  const handleLoginNavigation = () =>{
    navigate("/login")
  }
  const handleRegisterNavigation = () =>{
    navigate("/register")
  }
  return (
    <Navbar
      expand="lg"
      style={{ position: "sticky", zIndex: 100, width: "100%", top: 0.1, backgroundColor:"#D5DBDB" }}
    >
      <Container fluid>
        <Navbar.Brand onClick={handleHomeNavigation} >
          PC Building
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Peliculas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Series
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Mis Favoritos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-flex flex-grow-1 justify-content-end">
            <Form
             className="d-flex w-100 w-lg-auto"
              style={{ maxWidth: "600px" }}>
              <Form.Control
                type="search"
                placeholder="Busca componentes..."
                className="me-2"
                aria-label="Search"
                style={{ minWidth: "150px", maxWidth: "100%" }}/>
              <Button className="custom-button">
                <i className="fa-brands fa-searchengin"></i>
              </Button>
            </Form>
          </div>
          <div className="d-flex flex-column flex-lg-row ms-auto">
                <Button className="custom-button"  onClick={handleLoginNavigation}  >
                  Iniciar sesión
                </Button>
                <Button className="custom-button" onClick={handleRegisterNavigation} >
                  Registrarse
                </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
  );
}

Header.propTypes = {}

export default Header