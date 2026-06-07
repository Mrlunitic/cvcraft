import React from 'react';

export default function CreativeTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{
      width: '100%',
      minHeight: '1123px',
      backgroundColor: '#ffffff',
      color: '#333',
      fontFamily: '"DM Sans", sans-serif',
      boxSizing: 'border-box'
    }}>
      {/* Gold Header */}
      <header style={{
        background: 'linear-gradient(135deg, #c5943a 0%, #d4af37 100%)',
        padding: '40px',
        color: '#fff',
        textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '2px' }}>
          {data.personal?.fullName || 'YOUR NAME'}
        </h1>
        <div style={{ fontSize: '18px', fontWeight: '500', letterSpacing: '1px' }}>
          {data.personal?.jobTitle || 'Job Title'}
        </div>
      </header>

      {/* Two Column Body */}
      <div style={{ display: 'flex', minHeight: 'calc(1123px - 140px)' }}>
        {/* Left Column 60% */}
        <div style={{ width: '60%', padding: '40px', borderRight: '1px solid #f0f0f0' }}>
          {data.personal?.summary && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '18px', color: '#1e3a5f', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '30px', height: '2px', background: '#c5943a' }}></span>
                PROFILE
              </h2>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{data.personal.summary}</p>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '18px', color: '#1e3a5f', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '30px', height: '2px', background: '#c5943a' }}></span>
                EXPERIENCE
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {data.experience.map((exp, idx) => (
                  <div key={idx} style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #f0f0f0' }}>
                    <div style={{ position: 'absolute', left: '-6px', top: '5px', width: '10px', height: '10px', borderRadius: '50%', background: '#c5943a' }}></div>
                    <div style={{ fontSize: '13px', color: '#c5943a', fontWeight: 'bold', marginBottom: '5px' }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#1e3a5f' }}>{exp.jobTitle}</h3>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                    <p style={{ fontSize: '14px', margin: 0, lineHeight: '1.5' }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column 40% */}
        <div style={{ width: '40%', padding: '40px', backgroundColor: '#fafafa' }}>
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '16px', color: '#1e3a5f', marginBottom: '15px' }}>CONTACT</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              {data.personal?.email && <div>📧 {data.personal.email}</div>}
              {data.personal?.phone && <div>📱 {data.personal.phone}</div>}
              {data.personal?.location && <div>📍 {data.personal.location}</div>}
              {data.personal?.linkedin && <div>🔗 {data.personal.linkedin}</div>}
            </div>
          </section>

          {data.skills && data.skills.length > 0 && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '16px', color: '#1e3a5f', marginBottom: '15px' }}>SKILLS</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.skills.map((skill, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c5943a' }}></div>
                    <span style={{ fontSize: '14px' }}>{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section>
              <h2 style={{ fontSize: '16px', color: '#1e3a5f', marginBottom: '15px' }}>EDUCATION</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '13px', color: '#c5943a', fontWeight: 'bold', marginBottom: '4px' }}>{edu.startDate} - {edu.endDate}</div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e3a5f' }}>{edu.degree}</h3>
                    <div style={{ fontSize: '13px', color: '#666' }}>{edu.institution}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
