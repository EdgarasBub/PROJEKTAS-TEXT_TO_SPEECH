import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TextToSpeech from './pages/TextToSpeech';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '200vh'}}>
      <BrowserRouter>
        <Navbar />

        <main style={{ flex: 1 }} className="bg-gray-100 pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Navigate to="/" replace />} />
            <Route path="/TextToSpeech" element={<TextToSpeech />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
