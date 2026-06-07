import React from 'react';

export default function EmptyState({ icon = "📄", title, description, action }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center',
      background: '#f8f9fc',
      borderRadius: '12px',
      border: '2px dashed #cbd5e1'
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.25rem', color: 'var(--navy, #1e3a5f)', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: '#64748b', maxWidth: '400px', marginBottom: '1.5rem', lineHeight: 1.5 }}>{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
