import React from 'react';
import '../styles/footer.css'; // Nuoroda į CSS failą

const Footer: React.FC = () => {
  return (
    <footer className="FixFooter">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Kontaktai</h3>
          <p>✉️ edgaras.bub@gmail.com</p>
          <p>📞 +37068703040</p>
        </div>

        <div className="footer-section">
          <h3>Nuorodos</h3>
          <a href="/">Pagrindinis</a>
          <a href="/TextToSpeech">Išbandyti</a>
        </div>

        <div className="footer-section">
          <h3>Sekite mus</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/"><span>🌐</span> Facebook</a>
            <a href="https://www.twitter.com/"><span>🐦</span> Twitter</a>
            <a href="https://www.instagram.com/"><span>📸</span> Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Speech4You | Visos teisės saugomos</p>
      </div>
    </footer>
  );
};

export default Footer;
