import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Container } from 'react-bootstrap'; // <-- PRIDĖTA
import NavigationBar from './components/NavBar';
import Footer from './components/Footer'; // <-- PRIDĖTA
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TextToSpeech from './pages/TextToSpeech';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/footer.css';
import './styles/auth/shared.css'; // <-- PRIDĖTA (jei dar neegzistuoja)
import backgroundImg from '@/assets/background.jpg';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="site-wrapper"
          style={{ backgroundImage: `url(${backgroundImg})` }}>
          <NavigationBar />
          
          <main className="main-content">
            <Container fluid="xxl" className="py-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/texttospeech" element={<TextToSpeech />} />
              </Routes>
            </Container>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;