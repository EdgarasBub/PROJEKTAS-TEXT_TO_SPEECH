import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { PersonFill, BoxArrowRight, HouseDoorFill } from 'react-bootstrap-icons';
import '../styles/NavBar.css';

function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Tikriname prisijungimo būseną (pakeiskite su savo auth logika)
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    // Nukreipimas į pagrindinį puslapį po atsijungimo
    window.location.href = '/';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Speech4You</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-nav" />
        
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              <HouseDoorFill className="me-1" />
              Home
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            {isLoggedIn ? (
              <>
                <Button 
                  variant="outline-success" 
                  className="user-status me-2"
                >
                  <PersonFill className="me-1" />
                  Online
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={handleLogout}
                >
                  <BoxArrowRight className="me-1" />
                  Atsijungti
                </Button>
              </>
            ) : (
              <>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-light" 
                  className="me-2"
                >
                  Prisijungti
                </Button>
                <Button 
                  as={Link} 
                  to="/signup" 
                  variant="primary"
                >
                  Registruotis
                </Button>
              </>
            )}

            <NavDropdown 
              title="Papildomai" 
              id="additional-dropdown" 
              className="custom-dropdown ms-2"
            >
              <NavDropdown.Item as={Link} to="/features">Funkcijos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/pricing">Kainodara</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/contacts">Kontaktai</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;