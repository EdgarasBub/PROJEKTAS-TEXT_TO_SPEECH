import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Envelope, Lock, ArrowRightCircle } from 'react-bootstrap-icons';
import '../styles/auth/shared.css';
import '../styles/auth/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Prisijungti nepavyko');

      login(data.token);
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Prisijungimo klaida');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container glass-card">
        <h2 className="login-header">
          <span className="text-gradient-login">🔐 Prisijungimas</span>
        </h2>
        
        {error && <div className="auth-error glass-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="email">
              <Envelope className="input-icon" /> El. paštas
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
              placeholder="įveskite@el.paštas.lt"
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">
              <Lock className="input-icon" /> Slaptažodis
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
              placeholder="••••••••"
            />
          </div>

          <div className="auth-options">
            <label className="auth-checkbox glass-checkbox">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Prisiminti mane</span>
            </label>

            <Link to="/forgot-password" className="auth-link-button glass-link">
              Pamiršote slaptažodį?
            </Link>
          </div>

          <button 
            type="submit" 
            className="auth-button glass-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="auth-spinner"></span>
                Prisijungiama...
              </>
            ) : (
              <>
                Prisijungti <ArrowRightCircle className="ms-2" />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Neturite paskyros?</p>
          <Link to="/signup" className="auth-link glass-link">
            Registruokitės
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;