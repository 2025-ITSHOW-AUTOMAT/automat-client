import React from 'react';
import DockItem from './dockItem';
import framerIcon from '../../assets/framer.png';
import fastapiIcon from '../../assets/fastapi.png';
import reactIcon from '../../assets/react.png';
import postgreIcon from '../../assets/postgresql.png';
import pythonIcon from '../../assets/python.png';
import huggingFaceIcon from '../../assets/huggingFace.png';
import runpodIcon from '../../assets/runpod.png';
import awsIcon from '../../assets/aws.png';

import styles from '../../styles/dock.module.css';

const Dock = () => {
  const items = [
    { src: framerIcon, alt: 'Framer' },
    { src: fastapiIcon, alt: 'Fastapi' },
    { src: reactIcon, alt: 'React' },
    { src: postgreIcon, alt: 'Postgre' },
    { src: pythonIcon, alt: 'Python' },
    { src: huggingFaceIcon, alt: 'HuggingFace' },
    // { src: runpodIcon, alt: 'Runpod' },
    { src: awsIcon, alt: 'Aws' },
  ];

  const allItems = [...items, ...items];

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
