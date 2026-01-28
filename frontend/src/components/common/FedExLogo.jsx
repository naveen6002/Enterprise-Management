import React from 'react';
import fedexLogo from '../../fedexlogo.png'; // ✅ correct path

export default function FedExLogo({ label }) {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
      }}
    >
      <img
        src={fedexLogo}
        alt="FedEx"
        style={{
          width: 160,
          height: 'auto'
        }}
      />

      {label && (
        <div style={{ fontSize: 14, color: '#555' }}>
          {label}
        </div>
      )}
    </div>
  );
}
