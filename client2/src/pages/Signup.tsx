import React, { useState } from 'react';
import '../styles/login.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Slaptažodžiai nesutampa!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registracija nepavyko');
      }

      // Sėkminga registracija
      console.log('Vartotojas užregistruotas:', data);
      alert('Registracija sėkminga! Galite prisijungti.');
      // Nukreipimas į login puslapį (jei naudojate react-router)
      // navigate('/login');

    } catch (err) {
      setError(err.message);
      console.error('Registracijos klaida:', err);
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <h2>📝 Registracija</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSignup}>
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
            minLength={6}
          />

          <label htmlFor="confirm-password">Patvirtinkite slaptažodį</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="utils-button">
            Registruotis
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signup;