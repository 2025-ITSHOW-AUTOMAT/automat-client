import React from 'react';
import { ArrowDown } from 'lucide-react';

const DownButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '60px',
        height: '60px',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '24px',
        background: 'linear-gradient(to bottom, #4799A6 1%, #4AADBD 16%, #B8F9FF 61%, #8DCBD6 86%, #6DE0ED 100%)',
        transition: 'opacity 0.2s ease'
      }}
      onMouseOver={e => (e.currentTarget.style.opacity = '0.8')}
      onMouseOut={e => (e.currentTarget.style.opacity = '1')}
    >
      <span style={{
        display: 'inline-block',
        animation: 'bounce 2s infinite ease-in-out'
      }}>
        <ArrowDown color="#006680" size={24} />
      </span>
      <style>
        {`
          @keyframes bounce {
            0% { transform: translateY(0); }
            50% { transform: translateY(5px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </button>
  );
};

export default DownButton;
