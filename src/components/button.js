import React from 'react';
import { Home, Folder, Fingerprint, AtSign } from 'lucide-react';
import styles from '../styles/button.module.css';

const Button = ({ type, onButtonPress }) => {
  const iconMap = {
    home: Home,
    card: Folder,
    touch: Fingerprint,
    email: AtSign  
  };

  const IconComponent = iconMap[type];

  return (
    <div className={styles.buttonContainer} onClick={onButtonPress}>
      <div className={styles.buttonWrapper}>
          <div className={styles.buttonTop}>
            {IconComponent && <IconComponent size={24} color="#2F4D4A" />}
          </div>
      </div>
    </div>
  );
};

export default Button;
