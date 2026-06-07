import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import './Dashboard.css';

export default function Dashboard() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' });
  const { user } = useAuth();
  const navigate = useNavigate();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const res = await api.get('/cvs');
        setCvs(res.data.data || res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCVs();
  }, []);

  const handleCreateNew = async () => {
    try {
      const res = await api.post('/cvs', { title: 'Untitled Resume', template: 'classic' });
      const newId = res.data.data?._id || res.data._id;
      navigate(`/builder/${newId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/cvs/${deleteModal.id}`);
      setCvs(prev => prev.filter(cv => cv._id !== deleteModal.id));
      setDeleteModal({ open: false, id: null, title: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const res = await api.post(`/cvs/${id}/duplicate`);
      const newCv = res.data.data || res.data;
      setCvs(prev => [newCv, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const templateColors = {
    classic: { bg: '#1e3a5f', accent: '#c5943a' },
    modern: { bg: '#0f172a', accent: '#38bdf8' },
    creative: { bg: '#c5943a', accent: '#fff' },
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        {/* Top greeting bar */}
        <div className="dashboard-greeting">
          <div>
            <h2>{greeting()}, {user?.name?.split(' ')[0] || 'there'} 👋</h2>
            <p>Manage and download your resumes below.</p>
          </div>
          <button id="create-resume-btn" onClick={handleCreateNew} className="btn btn-primary">
            + New Resume
          </button>
        </div>

        {/* Quick Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value">{cvs.length}</div>
            <div className="stat-label">Total Resumes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {cvs.length > 0
                ? new Date(Math.max(...cvs.map(c => new Date(c.updatedAt)))).toLocaleDateString()
                : '—'}
            </div>
            <div className="stat-label">Last Edited</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {cvs.length > 0 ? (cvs[0].template?.charAt(0).toUpperCase() + cvs[0].template?.slice(1)) : '—'}
            </div>
            <div className="stat-label">Last Template</div>
          </div>
        </div>

        {/* CV Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : cvs.length === 0 ? (
          <EmptyState
            icon="📄"
            title="No resumes yet"
            description="Create your first resume and start building your professional career story."
            action={
              <button onClick={handleCreateNew} className="btn btn-primary">
                + Create My First Resume
              </button>
            }
          />
        ) : (
          <div className="cv-grid">
            {cvs.map(cv => {
              const colors = templateColors[cv.template] || templateColors.classic;
              return (
                <div key={cv._id} className="cv-card">
                  {/* Template Color Preview */}
                  <div className="cv-card-preview" style={{ background: colors.bg }}>
                    <div style={{ color: colors.accent, fontSize: '13px', fontWeight: 600, opacity: 0.9 }}>
                      {cv.template?.charAt(0).toUpperCase() + cv.template?.slice(1)} Template
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginTop: '4px' }}>
                      {cv.personal?.fullName || 'No name yet'}
                    </div>
                  </div>

                  <div className="cv-card-body">
                    <h3 className="cv-card-title">{cv.title}</h3>
                    <p className="cv-card-date">
                      Updated {new Date(cv.updatedAt).toLocaleDateString()}
                    </p>
                    <div className="card-actions">
                      <Link to={`/builder/${cv._id}`} className="btn btn-primary btn-sm">
                        Edit
                      </Link>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleDuplicate(cv._id)}
                      >
                        Duplicate
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setDeleteModal({ open: true, id: cv._id, title: cv.title })}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null, title: '' })}
        title="Delete Resume"
        footer={
          <>
            <button
              className="btn btn-outline"
              onClick={() => setDeleteModal({ open: false, id: null, title: '' })}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>"{deleteModal.title}"</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
