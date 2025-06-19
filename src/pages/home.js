import React from 'react';
import MainButton from "../components/MainButton";
import Frame from "../components/frame";
import Dock from "../components/home/dock";
import Header from "../components/home/header";
import Project from "../components/project";
import { Send, Users, Globe, Share2 } from "lucide-react";
import AboutDock from "../components/home/aboutDock";
import { MusicPlayerProvider } from "../components/musicPlayerContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/home.module.css";

import JihyunImg from "../assets/memoji/jihyun.png";
import HyojuImg from "../assets/memoji/hyoju.png";
import SubinImg from "../assets/memoji/subin.png";
import JiminImg from "../assets/memoji/jimin.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Frame children={
      <div className={styles.container}>
        <Header />
        <div className={styles.mainbox}>
          <MainButton
            msg='앨범 커스텀하러 가기'
            submsg='AI를 활용해 나만의 앨범 만들기'
            onClick={() => navigate('/shoot')}
          />
          <MainButton
            msg='다른 앨범 구경하기'
            submsg='다양한 앨범 구경하러 가기'
            onClick={() => navigate('/albums')}
          />
        </div>
        <div className={styles.musicbox}>
          <MusicPlayerProvider>
            <div className="project-section" style={{ marginTop: '30px' }}>
              <Project allowUpRight={true} limit={5} />
            </div>
          </MusicPlayerProvider>
        </div>
        <Dock />
        <div className={styles.aboutContainer} id='about'>
          <AboutDock
            aboutItems={[
              { image: JihyunImg, userName: '백지현', title: 'FullStack Developer', description: '안녕하세요~ 개발자 백지현입니다! Automat 재미있게 즐겨주세요!', icons: [Send] },
              { image: HyojuImg, userName: '안효주', title: 'FullStack Developer', description: '안녕하세요~ 개발자 안효주입니다! Automat 재미있게 즐겨주세요!', icons: [Users] },
              { image: SubinImg, userName: '조수빈', title: 'FullStack Developer', description: '안녕하세요~ 개발자 조수빈입니다! Automat 재미있게 즐겨주세요!', icons: [Globe] },
              { image: JiminImg, userName: '하지민', title: 'Designer', description: '안녕하세요~ 디자이너 하지민입니다! Automat 재미있게 즐겨주세요!', icons: [Share2] }
            ]}
          />
        </div>
      </div>
    }>
    </Frame>
  )
};

export default Home;
