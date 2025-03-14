import React from 'react';
import './AlertaFlutuante.css';

const AlertaFlutuante = ({ messages, onClose, type = 'error' }) => {
  return (
    <div className="floating-alert">
      <div className={`floating-alert-content ${type}`}>
        <div className="floating-alert-icon">
          {type === 'error' && '⚠️'}
          {type === 'success' && '✅'}
          {type === 'info' && 'ℹ️'}
        </div>
        <div className="floating-alert-messages">
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <button className="floating-alert-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default AlertaFlutuante; 