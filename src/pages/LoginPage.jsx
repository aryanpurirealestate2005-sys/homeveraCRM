import { useState } from 'react';

function LoginPage({ onLogin, loading, error }) {
  const [email, setEmail] = useState('agent@homevera.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="page-shell login-shell">
      <div className="auth-card glass-card">
        <div className="brand-header">
          <div className="brand-mark">H</div>
          <div>
            <h1>Homevera CRM</h1>
            <p>Modern real estate lead management.</p>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="agent@homevera.com" required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
