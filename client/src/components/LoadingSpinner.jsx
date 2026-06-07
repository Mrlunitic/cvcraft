import React from 'react';

export default function LoadingSpinner({ fullScreen = false }) {
  const spinnerStyle = {
    display: 'inline-block',
    width: '40px',
    height: '40px',
    border: '4px solid rgba(197, 148, 58, 0.2)', // Light gold
    borderRadius: '50%',
    borderTopColor: 'var(--gold, #c5943a)',
    animation: 'spin 1s ease-in-out infinite'
  };

  const containerStyle = fullScreen ? {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  } : {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle} />
    </div>
  );
}
