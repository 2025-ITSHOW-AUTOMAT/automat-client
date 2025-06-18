import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/frame.module.css";
import Button from "./button";
import DownButton from "./home/downButton";
import { useLocation, useNavigate } from "react-router-dom";

const Frame = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showDownButton, setShowDownButton] = useState(true);
  const frameScreenRef = useRef();

  const handleScroll = () => {
    if (frameScreenRef.current) {
      const scrollTop = frameScreenRef.current.scrollTop;
      setShowDownButton(scrollTop <= 100);
    }
  };

  useEffect(() => {
    const frameEl = frameScreenRef.current;
    if (frameEl) {
      frameEl.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (frameEl) {
        frameEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && !location.hash) {
      // 홈으로 왔을 때 frameScreen 내부 최상단으로 스크롤
      frameScreenRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (location.hash === '#about') {
      // frameScreen 내부에서 target 찾기
      const target = frameScreenRef.current?.querySelector(location.hash);
      if (target && frameScreenRef.current) {
        const targetTop = target.offsetTop;
        frameScreenRef.current.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleScrollDown = () => {
    if (frameScreenRef.current) {
      const scrollHeight = frameScreenRef.current.scrollHeight;
      const clientHeight = frameScreenRef.current.clientHeight;
  
      frameScreenRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };
  

  return (
    <div className={styles.frameContainer}>
      <div className={styles.frameBackground}>
        <div className={styles.frameScreen} ref={frameScreenRef}>
          {children}
        </div>
        {location.pathname !== '/shoot' && showDownButton && (
          <div style={{ 
            position: 'absolute', 
            right: '10px', 
            bottom: '10px', 
            opacity: showDownButton ? 1 : 0,
            transition: 'opacity 0.3s ease' 
          }}>
            <DownButton onClick={handleScrollDown} />
          </div>
        )}
      </div>
      <div className={`${styles.buttonGrid} ${styles.homeButton}`}>
        <Button type="home" onButtonPress={() => navigate('/')} />
      </div>
      <div className={`${styles.buttonGrid} ${styles.cardButton}`}>
        <Button type="card" onButtonPress={() => navigate('/albums')} />
      </div>
      <div className={`${styles.buttonGrid} ${styles.touchButton}`}>
        <Button type="touch" onButtonPress={() => navigate('/shoot')} />
      </div>
      <div className={`${styles.buttonGrid} ${styles.emailButton}`}>
        <Button
          type="email"
          onButtonPress={() => navigate('/#about')}
        />
      </div>
    </div>
  );
};

export default Frame;
