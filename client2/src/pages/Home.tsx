import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import "../styles/Home.css";
// import '../styles/Utils.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container fluid="xxl" className="home-container py-5">
      <div className="home-card p-4 p-md-5">
        <h1 className="home-title mb-4">
          Speech4You
        </h1>

        <p className="home-description lead mb-5">
          Transformuokite tekstą į gyvą kalbą su pažangiausiais AI technologijų pasiekimais. 
          Mūsų sistema sukuria natūralų balsą, pritaikytą tiek asmeniniam, tiek profesionaliam naudojimui.
        </p>

        <div className="features-grid">
          <div className="feature-item">
            <h3>🗣️ Kalbų įvairovė</h3>
            <p>50+ kalbų su regioniniais akcentais</p>
            <Button 
              variant="dark" 
              className="mt-3"
              onClick={() => navigate('/TextToSpeech')}
            >
              Išbandyti
            </Button>
          </div>

          <div className="feature-item">
            <h3>♿ Prieinamumas</h3>
            <p>Specialūs nustatymai regos negalią turintiems</p>
            <Button 
              variant="dark" 
              className="mt-3"
              onClick={() => navigate('/TextToSpeech')}
            >
              Išbandyti
            </Button>
          </div>

          <div className="feature-item">
            <h3>📚 Edukacijai</h3>
            <p>Integruotos mokymosi priemonės</p>
            <Button 
              variant="dark" 
              className="mt-3"
              onClick={() => navigate('/TextToSpeech')}
            >
              Išbandyti
            </Button>
          </div>

          <div className="feature-item">
            <h3>⚙️ API integracija</h3>
            <p>Prisijunkite prie mūsų sistemos per REST API</p>
            <Button 
              variant="dark" 
              className="mt-3"
              onClick={() => navigate('/TextToSpeech')}
            >
              Dokumentacija
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;