import React, { useState } from 'react';
import '../styles/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // * Pridėta

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Prisijungimas su:', email, password, 'Keep logged in:', keepLoggedIn);

    // Čia vėliau bus API login logika
    // Galima išsaugoti tokeną localStorage ar sessionStorage pagal keepLoggedIn
  };

  const handleForgotPassword = () => {
    alert('Slaptažodžio atstatymo funkcija dar neįgyvendinta.');
    // Galima redirectinti į /reset-password puslapį, kai jį sukursi
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <h2>🔐 Prisijungimas</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">El. paštas</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Slaptažodis</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-options">
            <label className="keep-logged-in">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              Prisiminti mane
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Pamiršai slaptažodį?
            </button>
          </div>

          <button type="submit" className="utils-button">
            Prisijungti
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
