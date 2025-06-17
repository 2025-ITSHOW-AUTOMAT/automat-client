import React from 'react';
import styles from '../../styles/dock.module.css';

const DockItem = ({ src, alt }) => {
  return (
    <div className={styles.dockItem}>
      <img src={src} alt={alt} className={styles.dockIcon} />
    </div>
  );
};

export default DockItem;
