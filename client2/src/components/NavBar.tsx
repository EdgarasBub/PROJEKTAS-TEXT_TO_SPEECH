import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { PersonFill, BoxArrowRight } from 'react-bootstrap-icons';
import '../styles/NavBar.css';

const NavigationBar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Navbar expand="lg" className="fixed-navbar" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="text-gradient">Speech4You</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-nav" className="border-0">
          <div className="animated-hamburger">
            <span className="glass-bar"></span>
            <span className="glass-bar"></span>
            <span className="glass-bar"></span>
          </div>
        </Navbar.Toggle>

        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" className="nav-glass-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/texttospeech" className="nav-glass-link">TTS</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            {isLoggedIn ? (
              <>
                <Button variant="glass" className="me-3 auth-button">
                  <PersonFill className="me-2" />
                  <span className="status-indicator"></span> Online
                </Button>
                <Button 
                  variant="glass-danger" 
                  onClick={logout}
                  className="auth-button"
                >
                  <BoxArrowRight className="me-2" />
                  Atsijungti
                </Button>
              </>
            ) : (
              <>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="glass" 
                  className="me-3 auth-button"
                >
                  Prisijungti
                </Button>
                <Button 
                  as={Link} 
                  to="/signup" 
                  variant="glass-primary"
                  className="auth-button"
                >
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