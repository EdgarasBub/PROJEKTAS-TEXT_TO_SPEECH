import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Envelope, Telephone, Facebook, Twitter, Instagram } from 'react-bootstrap-icons';
import '../styles/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="footer-content">
          {/* Kontaktai */}
          <Col md={4} className="footer-section">
            <h3 className="footer-heading">Kontaktai</h3>
            <ul className="footer-list">
              <li>
                <Envelope className="footer-icon" />
                edgaras.bub@gmail.com
              </li>
              <li>
                <Telephone className="footer-icon" />
                +370 687 03040
              </li>
            </ul>
          </Col>

          {/* Nuorodos */}
          <Col md={4} className="footer-section">
            <h3 className="footer-heading">Nuorodos</h3>
            <ul className="footer-list">
              <li><a href="/" className="footer-link">Pagrindinis</a></li>
              <li><a href="/TextToSpeech" className="footer-link">Išbandyti</a></li>
              <li><a href="/privacy" className="footer-link">Privatumo politika</a></li>
            </ul>
          </Col>

          {/* Social media */}
          <Col md={4} className="footer-section">
            <h3 className="footer-heading">Sekite mus</h3>
            <div className="social-icons">
              <a href="https://facebook.com" className="social-link">
                <Facebook className="social-icon" />
                Facebook
              </a>
              <a href="https://twitter.com" className="social-link">
                <Twitter className="social-icon" />
                Twitter
              </a>
              <a href="https://instagram.com" className="social-link">
                <Instagram className="social-icon" />
                Instagram
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