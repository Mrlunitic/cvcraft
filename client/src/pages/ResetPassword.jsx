import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import './Auth.css';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

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

    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. The link might be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-logo">CVCraft</div>
          <h2>Password Updated</h2>
          <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '15px', borderRadius: '6px', fontSize: '14px', margin: '20px 0', textAlign: 'center' }}>
            Your password has been successfully reset. Redirecting to login...
          </div>
          <Link to="/login" className="btn btn-primary full-width" style={{ display: 'block', textAlign: 'center' }}>Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-logo">CVCraft</div>
        <h2>Create New Password</h2>
        <p className="auth-subtitle">Please enter your new password below</p>
        
        {error && <div className="error-msg">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '13px' }}>(min. 8 chars, 1 num, 1 special)</span></label>
            <div className="password-wrapper">
              <input
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
          
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary full-width"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
