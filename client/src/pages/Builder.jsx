import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { TEMPLATES, getTemplateComponent } from '../templates/index';
import LoadingSpinner from '../components/LoadingSpinner';
import './Builder.css';

// CV Completion Score
const calcScore = (data) => {
  if (!data) return 0;
  let score = 0;
  const p = data.personal || {};
  if (p.fullName) score += 10;
  if (p.jobTitle) score += 10;
  if (p.email) score += 10;
  if (p.phone) score += 5;
  if (p.location) score += 5;
  if (p.linkedin) score += 5;
  if (p.summary && p.summary.length > 50) score += 15;
  if (data.experience && data.experience.length > 0) score += 20;
  if (data.education && data.education.length > 0) score += 10;
  if (data.skills && data.skills.length >= 3) score += 10;
  return Math.min(score, 100);
};

const scoreTip = (score) => {
  if (score < 30) return 'Add your job title and summary to get started.';
  if (score < 60) return 'Add work experience and at least 3 skills.';
  if (score < 80) return 'Add LinkedIn and education details.';
  return '🎉 Great! Your CV is looking complete.';
};

export default function Builder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cv, setCv] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'unsaved'
  const [newSkill, setNewSkill] = useState('');
  const previewRef = useRef(null);
  const saveTimer = useRef(null);

  // Fetch CV data
  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await api.get(`/cvs/${id}`);
        const raw = res.data.data || res.data || {};
        // Ensure all fields are initialised
        const cvData = {
          ...raw,
          personal: {
            fullName: '', jobTitle: '', email: '', phone: '',
            location: '', linkedin: '', github: '', summary: '',
            ...raw.personal
          },
          experience: raw.experience || [],
          education: raw.education || [],
          skills: raw.skills || [],
          certifications: raw.certifications || [],
          template: raw.template || 'classic',
          title: raw.title || 'Untitled Resume',
        };
        setCv(cvData);
      } catch (err) {
        console.error(err);
        navigate('/dashboard');
      }
    };
    fetchCV();
  }, [id, navigate]);

  // Debounced autosave
  const autosave = useCallback((data) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaveStatus('unsaved');
    saveTimer.current = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        await api.put(`/cvs/${id}`, {
          title: data.title,
          template: data.template,
          personal: data.personal,
          experience: data.experience,
          education: data.education,
          skills: data.skills,
          certifications: data.certifications,
        });
        setSaveStatus('saved');
      } catch (err) {
        console.error(err);
        setSaveStatus('unsaved');
      }
    }, 1500);
  }, [id]);

  const updateCv = (updater) => {
    setCv(prev => {
      const next = updater(prev);
      autosave(next);
      return next;
    });
  };

  const handlePersonalChange = (field, value) => {
    updateCv(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const handleArrayChange = (section, index, field, value) => {
    updateCv(prev => {
      const arr = [...prev[section]];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: arr };
    });
  };

  const addArrayItem = (section, template) => {
    updateCv(prev => ({ ...prev, [section]: [...prev[section], template] }));
  };

  const removeArrayItem = (section, index) => {
    updateCv(prev => {
      const arr = [...prev[section]];
      arr.splice(index, 1);
      return { ...prev, [section]: arr };
    });
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    updateCv(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill('');
  };

  const removeSkill = (index) => {
    updateCv(prev => {
      const s = [...prev.skills];
      s.splice(index, 1);
      return { ...prev, skills: s };
    });
  };

  const setTemplate = (templateId) => {
    updateCv(prev => ({ ...prev, template: templateId }));
  };

  const handleDownload = () => {
    import('html2pdf.js').then(({ default: html2pdf }) => {
      const element = previewRef.current;
      const opt = {
        margin: 0,
        filename: `${cv.personal?.fullName || 'Resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    });
  };

  if (!cv) return <LoadingSpinner fullScreen />;

  const score = calcScore(cv);
  const TemplateComponent = getTemplateComponent(cv.template);

  return (
    <div className="builder-container">
      {/* Header */}
      <div className="builder-header">
        <div className="builder-header-left">
          <Link to="/dashboard" className="back-link">← Dashboard</Link>
          <input
            type="text"
            className="cv-title-input"
            value={cv.title}
            onChange={(e) => updateCv(prev => ({ ...prev, title: e.target.value }))}
          />
          <span className={`save-status ${saveStatus}`}>
            {saveStatus === 'saving' && '💾 Saving…'}
            {saveStatus === 'saved' && '✓ Autosaved'}
            {saveStatus === 'unsaved' && '● Unsaved changes'}
          </span>
        </div>
        <button id="download-pdf-btn" onClick={handleDownload} className="btn btn-primary">
          ⬇ Download PDF
        </button>
      </div>

      <div className="builder-workspace">
        {/* Editor Pane */}
        <div className="editor-pane">
          {/* Template Switcher */}
          <div className="template-switcher">
            <div className="section-label">Template</div>
            <div className="template-options">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  className={`template-thumb ${cv.template === t.id ? 'active' : ''}`}
                  onClick={() => setTemplate(t.id)}
                  style={{ background: t.colors.bg, borderColor: cv.template === t.id ? t.colors.accent : 'transparent' }}
                >
                  <span style={{ color: t.colors.primary || '#fff', fontSize: '11px' }}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Completion Score */}
          <div className="score-bar-wrapper">
            <div className="score-label">CV Score: <strong>{score}%</strong></div>
            <div className="score-bar">
              <div className="score-fill" style={{ width: `${score}%`, background: score >= 80 ? '#38a169' : score >= 50 ? '#c5943a' : '#e53e3e' }} />
            </div>
            <div className="score-tip">{scoreTip(score)}</div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {['personal', 'experience', 'education', 'skills', 'certifications'].map(tab => (
              <button
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {/* Personal Tab */}
            {activeTab === 'personal' && (
              <div className="form-section">
                {[
                  { label: 'Full Name', field: 'fullName', type: 'text' },
                  { label: 'Job Title', field: 'jobTitle', type: 'text' },
                  { label: 'Email', field: 'email', type: 'email' },
                  { label: 'Phone', field: 'phone', type: 'text' },
                  { label: 'Location', field: 'location', type: 'text' },
                  { label: 'LinkedIn URL', field: 'linkedin', type: 'text' },
                  { label: 'GitHub URL', field: 'github', type: 'text' },
                ].map(({ label, field, type }) => (
                  <div className="form-group" key={field}>
                    <label>{label}</label>
                    <input
                      type={type}
                      value={cv.personal[field] || ''}
                      onChange={(e) => handlePersonalChange(field, e.target.value)}
                    />
                  </div>
                ))}
                <div className="form-group">
                  <label>Professional Summary</label>
                  <textarea
                    rows={4}
                    value={cv.personal.summary || ''}
                    onChange={(e) => handlePersonalChange('summary', e.target.value)}
                    placeholder="Write a compelling professional summary..."
                  />
                </div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="form-section">
                {cv.experience.map((exp, index) => (
                  <div key={index} className="repeatable-item">
                    <button className="btn-remove" onClick={() => removeArrayItem('experience', index)}>×</button>
                    <div className="form-group"><label>Job Title</label><input type="text" value={exp.jobTitle || ''} onChange={(e) => handleArrayChange('experience', index, 'jobTitle', e.target.value)} /></div>
                    <div className="form-group"><label>Company</label><input type="text" value={exp.company || ''} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} /></div>
                    <div className="form-group"><label>Location</label><input type="text" value={exp.location || ''} onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)} /></div>
                    <div className="form-row">
                      <div className="form-group"><label>Start Date</label><input type="text" placeholder="Jan 2022" value={exp.startDate || ''} onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)} /></div>
                      <div className="form-group"><label>End Date</label><input type="text" placeholder="Present" value={exp.endDate || ''} disabled={exp.current} onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)} /></div>
                    </div>
                    <div className="form-group checkbox-group">
                      <label>
                        <input type="checkbox" checked={exp.current || false} onChange={(e) => handleArrayChange('experience', index, 'current', e.target.checked)} />
                        Currently working here
                      </label>
                    </div>
                    <div className="form-group"><label>Description</label><textarea rows={3} value={exp.description || ''} onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} /></div>
                  </div>
                ))}
                <button className="btn btn-outline full-width" onClick={() => addArrayItem('experience', { jobTitle: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' })}>
                  + Add Experience
                </button>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="form-section">
                {cv.education.map((edu, index) => (
                  <div key={index} className="repeatable-item">
                    <button className="btn-remove" onClick={() => removeArrayItem('education', index)}>×</button>
                    <div className="form-group"><label>Degree</label><input type="text" value={edu.degree || ''} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} /></div>
                    <div className="form-group"><label>Institution</label><input type="text" value={edu.institution || ''} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} /></div>
                    <div className="form-group"><label>Location</label><input type="text" value={edu.location || ''} onChange={(e) => handleArrayChange('education', index, 'location', e.target.value)} /></div>
                    <div className="form-row">
                      <div className="form-group"><label>Start Date</label><input type="text" value={edu.startDate || ''} onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)} /></div>
                      <div className="form-group"><label>End Date</label><input type="text" value={edu.endDate || ''} onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)} /></div>
                    </div>
                    <div className="form-group"><label>Description / Achievements</label><textarea rows={2} value={edu.description || ''} onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)} /></div>
                  </div>
                ))}
                <button className="btn btn-outline full-width" onClick={() => addArrayItem('education', { degree: '', institution: '', location: '', startDate: '', endDate: '', description: '' })}>
                  + Add Education
                </button>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="form-section">
                <div className="skills-input-row">
                  <input
                    type="text"
                    placeholder="Add a skill (e.g. React)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <button className="btn btn-primary" onClick={addSkill}>Add</button>
                </div>
                <div className="skills-pills">
                  {cv.skills.map((skill, i) => (
                    <span key={i} className="skill-pill">
                      {skill}
                      <button onClick={() => removeSkill(i)}>×</button>
                    </span>
                  ))}
                </div>
                {cv.skills.length === 0 && <p style={{ color: '#94a3b8', fontSize: '14px' }}>No skills added yet. Type a skill above and press Enter or click Add.</p>}
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div className="form-section">
                {cv.certifications.map((cert, index) => (
                  <div key={index} className="repeatable-item">
                    <button className="btn-remove" onClick={() => removeArrayItem('certifications', index)}>×</button>
                    <div className="form-group"><label>Certification Name</label><input type="text" value={cert.name || ''} onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)} /></div>
                    <div className="form-group"><label>Issuing Organization</label><input type="text" value={cert.issuingOrg || ''} onChange={(e) => handleArrayChange('certifications', index, 'issuingOrg', e.target.value)} /></div>
                    <div className="form-group"><label>Date</label><input type="text" placeholder="Jun 2023" value={cert.date || ''} onChange={(e) => handleArrayChange('certifications', index, 'date', e.target.value)} /></div>
                    <div className="form-group"><label>Credential ID (optional)</label><input type="text" value={cert.credentialId || ''} onChange={(e) => handleArrayChange('certifications', index, 'credentialId', e.target.value)} /></div>
                  </div>
                ))}
                <button className="btn btn-outline full-width" onClick={() => addArrayItem('certifications', { name: '', issuingOrg: '', date: '', credentialId: '' })}>
                  + Add Certification
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Pane */}
        <div className="preview-pane">
          <div className="preview-document" ref={previewRef}>
            <TemplateComponent data={cv} />
          </div>
        </div>
      </div>
    </div>
  );
}
