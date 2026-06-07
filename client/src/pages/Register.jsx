import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const hasNumber = /\d/;
    const hasSpecialChar = /[@#!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!hasNumber.test(password)) {
      setError('Password must contain at least one number.');
      return;
    }
    if (!hasSpecialChar.test(password)) {
      setError('Password must contain at least one special character (@, #, !, etc).');
      return;
    }
    setLoading(true);
    setError('');
    const result = await register({ name, email, password });
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-logo">CVCraft</div>
        <h2>Create Your Account</h2>
        <p className="auth-subtitle">Start building your professional resume today</p>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '13px' }}>(min. 8 characters)</span></label>
            <div className="password-wrapper">
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <button
            id="register-submit"
            type="submit"
            className="btn btn-primary full-width"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="auth-link">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}
