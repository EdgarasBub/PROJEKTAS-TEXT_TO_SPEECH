import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Envelope, Telephone, Facebook, Twitter, Instagram } from 'react-bootstrap-icons';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="footer-content">
          <Col md={4} className="footer-section">
            <h3 className="footer-heading">Kontaktai</h3>
            <ul className="footer-list">
              <li>
                <Envelope className="footer-icon" />
                <span className="footer-link">info@info.com</span>
              </li>
              <li>
                <Telephone className="footer-icon" />
                <span className="footer-link">+370 *** ****</span>
              </li>
            </ul>
          </Col>

          <Col md={4} className="footer-section">
            <h3 className="footer-heading">Nuorodos</h3>
            <ul className="footer-list">
              <li><span className="footer-link">Pagrindinis</span></li>
              <li><span className="footer-link">Išbandyti</span></li>
              <li><span className="footer-link">Privatumo politika</span></li>
            </ul>
          </Col>

          <Col md={4} className="footer-section">
            <h3 className="footer-heading">Sekite mus</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/" className="social-link">
                <Facebook className="social-icon" /> Facebook
              </a>
              <br />
              <a href="https://x.com/" className="social-link">
                <Twitter className="social-icon" /> Twitter
              </a>
              <br />
              <a href="https://www.instagram.com/" className="social-link">
                <Instagram className="social-icon" /> Instagram
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="footer-bottom text-center">
            <p className="copyright">
              © {new Date().getFullYear()} Speech4You | Visos teisės saugomos
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;