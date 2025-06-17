import React from 'react';
import DockItem from './dockItem';
import framerIcon from '../../assets/framer.png';
import fastapiIcon from '../../assets/fastapi.png';
import reactIcon from '../../assets/react.png';
import postgreIcon from '../../assets/postgresql.png';

import styles from '../../styles/dock.module.css';

const Dock = () => {
  const items = [
    { src: framerIcon, alt: 'Framer' },
    { src: fastapiIcon, alt: 'Fastapi' },
    { src: reactIcon, alt: 'React' },
    { src: postgreIcon, alt: 'Postgre' },
  ];

  const allItems = [...items, ...items, ...items];

  return (
    <div className={styles.dockWrapper}>
      <div className={styles.dockScroll}>
        {allItems.map((item, index) => (
          <DockItem key={index} src={item.src} alt={item.alt} />
        ))}
      </div>
    </div>
  );
};

export default Dock;
