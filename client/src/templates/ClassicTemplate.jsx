import React from 'react';

export default function ClassicTemplate({ data }) {
  if (!data) return null;

  return (
    <div className="template-classic" style={{
      width: '100%',
      minHeight: '1123px', // A4 height at 96dpi
      backgroundColor: '#ffffff',
      color: '#333',
      fontFamily: '"DM Sans", sans-serif',
      padding: '40px',
      boxSizing: 'border-box'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', color: '#1e3a5f', margin: '0 0 10px 0' }}>
          {data.personal?.fullName || 'YOUR NAME'}
        </h1>
        <div style={{ color: '#666', fontSize: '18px', marginBottom: '15px' }}>
          {data.personal?.jobTitle || 'Job Title'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '14px', color: '#555', flexWrap: 'wrap' }}>
          {data.personal?.email && <span>📧 {data.personal.email}</span>}
          {data.personal?.phone && <span>📱 {data.personal.phone}</span>}
          {data.personal?.location && <span>📍 {data.personal.location}</span>}
          {data.personal?.linkedin && <span>🔗 {data.personal.linkedin}</span>}
        </div>
      </header>

      {data.personal?.summary && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '5px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{data.personal.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '5px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Experience
          </h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '15px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>{exp.jobTitle}</h3>
                <span style={{ fontSize: '13px', color: '#666' }}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ fontSize: '14px', fontStyle: 'italic', color: '#555', marginBottom: '5px' }}>
                {exp.company} {exp.location && `| ${exp.location}`}
              </div>
              <p style={{ fontSize: '14px', margin: 0, lineHeight: '1.5' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '5px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Education
          </h2>
          {data.education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '10px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>{edu.degree}</h3>
                <span style={{ fontSize: '13px', color: '#666' }}>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#555' }}>
                {edu.institution} {edu.location && `| ${edu.location}`}
              </div>
              {edu.description && <p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '5px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
            {data.skills.map((skill, idx) => (
              <span key={idx} style={{
                background: 'rgba(30, 58, 95, 0.1)',
                color: '#1e3a5f',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
