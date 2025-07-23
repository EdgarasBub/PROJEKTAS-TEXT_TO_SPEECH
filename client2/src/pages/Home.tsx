import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css"; // Importuojame CSS failą
import '../styles/Utils.css'; // Importuojame bendrą stilių failą

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="home-container">
      <div className="home-card">
        <h1 className="home-title">
          Speech4You
        </h1>

        <p className="home-description">
          Mūsų Speech4You įrankiai leidžia lengvai konvertuoti tekstą į natūraliai skambančią kalbą. Greitas, paprastas ir pritaikytas visiems.
        </p>

        <ul className="home-list">
          <li>🗣️ Natūralūs balsai įvairiomis kalbomis</li>
            <div style={{ textAlign: 'center' }}>
              <button
                className="utils-button"
                onClick={() => navigate('/TextToSpeech')}
              >
                🚀 Išbandyti dabar
              </button>
            </div>
          <li>♿ Prieinamumas regos negalią turintiems</li>
              <div style={{ textAlign: 'center' }}>
                <button
                  className="utils-button"
                  onClick={() => navigate('/TextToSpeech')}
                >
                  🚀 Išbandyti dabar
                </button>
              </div>
          <li>📚 Tinka edukacijai ir audio turiniui</li>
              <div style={{ textAlign: 'center' }}>
                <button
                  className="utils-button"
                  onClick={() => navigate('/TextToSpeech')}
                >
                  🚀 Išbandyti dabar
                </button>
              </div>
          <li>⚙️ Lengva integracija į bet kokią aplikaciją</li>
        </ul>
      </div>
    </main>
  );
};

export default Home;
