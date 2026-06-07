import React from 'react';

export default function ModernTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{
      width: '100%',
      minHeight: '1123px',
      display: 'flex',
      backgroundColor: '#ffffff',
      color: '#333',
      fontFamily: '"DM Sans", sans-serif',
      boxSizing: 'border-box'
    }}>
      {/* Sidebar 32% */}
      <div style={{ width: '32%', backgroundColor: '#1e3a5f', color: '#ffffff', padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', margin: '0 0 10px 0', lineHeight: '1.2' }}>
            {data.personal?.fullName || 'YOUR NAME'}
          </h1>
          <div style={{ color: '#a5b4fc', fontSize: '16px' }}>
            {data.personal?.jobTitle || 'Job Title'}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px', marginBottom: '15px' }}>Contact</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            {data.personal?.email && <div>📧 {data.personal.email}</div>}
            {data.personal?.phone && <div>📱 {data.personal.phone}</div>}
            {data.personal?.location && <div>📍 {data.personal.location}</div>}
            {data.personal?.linkedin && <div>🔗 {data.personal.linkedin}</div>}
          </div>
        </div>

        {data.skills && data.skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px', marginBottom: '15px' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {data.skills.map((skill, idx) => (
                <span key={idx} style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content 68% */}
      <div style={{ width: '68%', padding: '40px 30px' }}>
        {data.personal?.summary && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '18px', color: '#1e3a5f', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '15px' }}>Summary</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{data.personal.summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '18px', color: '#1e3a5f', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '15px' }}>Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {data.experience.map((exp, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1e3a5f' }}>{exp.jobTitle}</h3>
                      <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>{exp.company} {exp.location && `• ${exp.location}`}</div>
                    </div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.description && <p style={{ fontSize: '14px', margin: '8px 0 0 0', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section>
            <h2 style={{ fontSize: '18px', color: '#1e3a5f', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '15px' }}>Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e3a5f' }}>{edu.degree}</h3>
                      <div style={{ fontSize: '14px', color: '#64748b' }}>{edu.institution} {edu.location && `• ${edu.location}`}</div>
                    </div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.description && <p style={{ fontSize: '13px', margin: '6px 0 0 0' }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
