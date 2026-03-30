import { useState } from 'react';
import { authService } from '../../services/AuthService';

interface Props {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login({ username, password });
      onLogin();
    } catch (err) {
      const msg = err instanceof Error && err.message === 'UNAUTHORIZED'
        ? 'Usuario o contraseña incorrectos'
        : 'No se pudo conectar con el servidor';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__brand">
          <span className="login-card__logo">Oriente</span>
          <span className="login-card__tag">Admin</span>
        </div>

        <h1 className="login-card__title">Iniciar sesión</h1>

        {error && (
          <div className="admin-alert admin-alert--error" role="alert">
            {error}
          </div>
        )}

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-field__label" htmlFor="username">
              Usuario
            </label>
            <input
              id="username"
              className="form-field__input"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              className="form-field__input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-admin btn-admin--primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}