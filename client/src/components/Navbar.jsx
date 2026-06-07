import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar" style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1.5rem 4rem',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="logo" style={{
        fontSize: '1.8rem',
        fontWeight: 800,
        fontFamily: 'Playfair Display, serif',
        color: 'var(--navy, #1e3a5f)'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>CVCraft</Link>
      </div>
      <div className="nav-links" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: 'var(--navy, #1e3a5f)', color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
            <button onClick={logout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--navy, #1e3a5f)', background: 'transparent', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--navy, #1e3a5f)', background: 'transparent', color: 'var(--navy, #1e3a5f)', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: 'var(--navy, #1e3a5f)', color: '#fff', textDecoration: 'none' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
