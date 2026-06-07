import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="sidebar" style={{
      width: '250px',
      height: '100vh',
      backgroundColor: 'var(--navy, #1e3a5f)',
      color: 'white',
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1rem'
    }}>
      <div className="sidebar-brand" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px', color: '#fff' }}>CVCraft</h2>
      </div>

      <div className="sidebar-user" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', padding: '0 1rem' }}>
        <div className="avatar" style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'var(--gold, #c5943a)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}>
          {getInitials(user?.name)}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name || 'User'}</div>
        </div>
      </div>

      <nav className="sidebar-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <Link to="/dashboard" style={{
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          color: 'rgba(255,255,255,0.8)',
          textDecoration: 'none',
          backgroundColor: 'rgba(255,255,255,0.1)'
        }}>
          Dashboard
        </Link>
        {/* Add more links here if needed */}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} style={{
          width: '100%',
          padding: '0.75rem',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Log out
        </button>
      </div>
    </div>
  );
}
