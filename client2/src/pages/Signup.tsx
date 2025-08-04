import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth/shared.css';
import '../styles/auth/signup.css';

const Signup: React.FC = () => {
  // Formos būsena
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Įvesties valdymas
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Registracijos pateikimas
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validacija
    const { email, password, confirmPassword } = formData;
    if (!email || !password || !confirmPassword) {
      setError('Visi laukai yra privalomi');
      return;
    }

    if (password.length < 6) {
      setError('Slaptažodis turi būti bent 6 simbolių');
      return;
    }

    if (password !== confirmPassword) {
      setError('Slaptažodžiai nesutampa');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registracija nepavyko');

      navigate('/login', {
        state: {
          prefilledEmail: email,
          successMessage: 'Registracija sėkminga! Galite prisijungti.'
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Techninė klaida');
      console.error('Registracijos klaida:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page ">
      <div className="auth-container glass-card">
        <h2 className="signup-header glass-title">📝 Naujos paskyros kūrimas</h2>
        
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-input-group">
            <label htmlFor="email">El. pašto adresas</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
              required
              autoComplete="username"
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">Slaptažodis</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              required
              minLength={6}
              autoComplete="new-password"
            />
            <p className="password-hint">(min. 6 simboliai)</p>
          </div>

          <div className="auth-input-group">
            <label htmlFor="confirmPassword">Patvirtinkite slaptažodį</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="auth-input"
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <span className="auth-spinner" aria-hidden="true"></span>
                Registruojama...
              </>
            ) : 'Registruotis'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Jau turite paskyrą?</p>
          <Link to="/login" className="auth-link">
            Prisijungti
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;