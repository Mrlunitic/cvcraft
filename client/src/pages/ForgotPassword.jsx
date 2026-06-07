import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import './Auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setMessage(data.data || 'Password reset email sent. Please check your inbox.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-logo">CVCraft</div>
        <h2>Reset Password</h2>
        <p className="auth-subtitle">Enter your email and we'll send you a reset link</p>
        
        {error && <div className="error-msg">{error}</div>}
        {message && <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '10px 15px', borderRadius: '6px', fontSize: '14px', marginBottom: '1.5rem' }}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary full-width"
            disabled={loading}
          >
            {loading ? 'Sending link...' : 'Send Reset Link'}
          </button>
        </form>
        <p className="auth-link">Remember your password? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}
