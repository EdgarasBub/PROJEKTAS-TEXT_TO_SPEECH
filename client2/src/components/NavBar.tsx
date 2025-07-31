import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { PersonFill, BoxArrowRight } from 'react-bootstrap-icons';
import '../styles/NavBar.css';

const NavigationBar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Speech4You</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Button variant="outline-success" className="me-2">
                  <PersonFill className="me-1" />
                  Online
                </Button>
                <Button variant="outline-danger" onClick={logout}>
                  <BoxArrowRight className="me-1" />
                  Atsijungti
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-light" className="me-2">
                  Prisijungti
                </Button>
                <Button as={Link} to="/signup" variant="primary">
                  Registruotis
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;