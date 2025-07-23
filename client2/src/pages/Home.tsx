import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../styles/Home.css"; // Importuojame CSS failą

const Home: React.FC = () => {
  // const navigate = useNavigate();

  return (
    <main className="home-container">
      <div className="home-card">
        <h1 className="home-title">
          Teksto į kalbą (Text-to-Speech) sprendimas
        </h1>

        <p className="home-description">
          Mūsų Text-to-Speech įrankis leidžia lengvai konvertuoti tekstą į natūraliai skambančią kalbą. Greitas, paprastas ir pritaikytas visiems.
        </p>

        <ul className="home-list">
          <li>🗣️ Natūralūs balsai įvairiomis kalbomis</li>
          <li>♿ Prieinamumas regos negalią turintiems</li>
          <li>📚 Tinka edukacijai ir audio turiniui</li>
          <li>⚙️ Lengva integracija į bet kokią aplikaciją</li>
        </ul>

        <div style={{ textAlign: 'center' }}>
          {/* <button
            className="home-button"
            onClick={() => navigate('/demo')}
          >
            🚀 Išbandyti dabar
          </button> */}
        </div>
      </div>
    </main>
  );
};

export default Home;
