import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

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
                <Route path='/' element={<Home />} />
                <Route path='/TextToSpeech' element={<TextToSpeech />} />
              </Routes>
            </div>
      </BrowserRouter>
      <Home />
    </main>
  );
};

export default App;
