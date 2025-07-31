import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth/shared.css';
import '../styles/auth/login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepLoggedIn: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Prisijungimo klaida');

      // Token saugojimas
      const storage = formData.keepLoggedIn ? localStorage : sessionStorage;
      storage.setItem('token', data.token);

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Techninė klaida');
      console.error('Prisijungimo klaida:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <h2 className="login-header">🔐 Prisijungimas</h2>
        
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
              autoComplete="current-password"
            />
          </div>

          <div className="auth-options">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                id="keepLoggedIn"
                checked={formData.keepLoggedIn}
                onChange={handleChange}
              />
              <span>Prisiminti mane</span>
            </label>

            <button
              type="button"
              className="auth-link-button"
              onClick={() => navigate('/reset-password')}
            >
              Pamiršote slaptažodį?
            </button>
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
                Prisijungiama...
              </>
            ) : 'Prisijungti'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Neturite paskyros?</p>
          <Link to="/signup" className="auth-link">
            Registruokitės
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;