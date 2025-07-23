import React from 'react';
import {Navigate,BrowserRouter, Route, Routes} from 'react-router-dom'

import TextToSpeech from './pages/TextToSpeech';
import Navbar from './components/NavBar'
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <main className="bg-gray-100 min-h-screen p-4">
      <BrowserRouter>
            <Navbar />
            <div className='pages'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Navigate to="/" replace />} />
                <Route path='/TextToSpeech' element={<TextToSpeech />} />
              </Routes>
            </div>
      </BrowserRouter>
    </main>
  );
};

export default App;
