import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../utils/blogStore';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(password);
    if (success) {
      onLogin();
    } else {
      setError('Invalid password');
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <span className="admin-brand-logo">YR</span>
          <h2>Admin Panel</h2>
          <p>Enter your password to manage writings</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              required
            />
          </div>
          {error && <div className="admin-error">{error}</div>}
          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <Link to="/" className="admin-back-link">
          <i className="fa-solid fa-arrow-left"></i> Back to site
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
