import {Link} from 'react-router-dom';
import '../styles/NavBar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  return (
    <Navbar expand="lg" className='FixNavBar' >
      <Container className=' d-flex justify-space-between align-items-center'>
        <Navbar.Brand href='/Home'>Speech4You</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">

            <Link className='navbar-brand' to='/Home'>Home</Link>
            <Link className='navbar-brand' to="/TextToSpeech">TextToSpeech</Link>
            <Link className="utils-button" to="/login" >LOG IN</Link>
            <Link className="utils-button" to="/Signup" >SIGN UP</Link>

                <NavDropdown title="Papildomai" id="basic-nav-dropdown" className="custom-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/Contacts">Contacts</NavDropdown.Item>
                </NavDropdown>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default BasicExample;

                        // <Link to='/Home'>
                        //     <h1>Mano Pratimai</h1>
                        // </Link>
                        // <Link to='/TextToSpeech'>
                        //     <h1>Sukurti nauja pratima</h1>
                        // </Link>
                     