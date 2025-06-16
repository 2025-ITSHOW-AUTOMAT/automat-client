import React from 'react';
import { Home, Folder, Fingerprint, AtSign } from 'lucide-react';
import '../styles/button.module.css';

const Button = ({ type, onButtonPress }) => {
  const iconMap = {
    home: Home,
    card: Folder,
    touch: Fingerprint,
    email: AtSign  
  };

  const IconComponent = iconMap[type];

  return (
    <div className="button-container" onClick={onButtonPress}>
      <div className='button-wrapper'>
          <div className='button-top'>
            {IconComponent && <IconComponent size={24} color="#2F4D4A" />}
          </div>
      </div>
    </div>
  );
};

export default Button;
