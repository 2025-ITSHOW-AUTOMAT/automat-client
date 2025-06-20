import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectButton = ({
  msg,
  submsg,
  img,
  onClick,
  children,
  allowUpRight,
  upRightIcon: UpRightIcon
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px',
        background:
          'linear-gradient(to right, rgba(208, 230, 236, 0.1), rgba(211, 233, 239, 0.2))',
        border: 'solid 1px rgba(42, 91, 99, 0.2)',
        borderRadius: '8px',
        transition: 'border-color 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 164, 200, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(42, 91, 99, 0.2)';
      }}
    >
      {/* 오른쪽 위 아이콘 표시 */}
      {allowUpRight && UpRightIcon && (
          <UpRightIcon
            size={20}
            style={{
              position: 'absolute',
              top: '20px',    // 상단 여백
              right: '10px',  // 오른쪽 여백
              color: '#00A4C8',

            }}/>
      )}

      <div style={{ display: 'flex', flexDirection: 'row', gap: '19px', alignItems: 'center' }}>
        <div>
          <div
            style={{
              width: '72px',
              height: '72px',
              backgroundImage:  `url(${img || '/img/AutomatMain.png'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '5px',
            }}
          ></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div
            style={{
              color: '#00A4C8',
              fontWeight: '600',
              fontSize: '17px',
            }}
          >
            {msg}
          </div>
          <div
            style={{
              color: '#545454',
              fontWeight: '500',
              fontSize: '13px',
            }}
          >
            {submsg}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default ProjectButton;
