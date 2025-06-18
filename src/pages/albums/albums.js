import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MainButton from "../../components/MainButton";
import Frame from "../../components/frame";
import Header from "../../components/home/header"
import Project from "../../components/project";
import { MusicPlayerProvider } from "../../components/musicPlayerContext";
import Player from "../../components/player";

import styles from "../../styles/home.module.css";

const Albums = () => {
    const navigate = useNavigate();
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);

    return (
        <Frame children={
            <div className={styles.container}>
                <Header />
                <div className={styles.musicbox}>
                    <MusicPlayerProvider>
                        <div className="project-section" style={{ marginTop: '30px' }}>
                            <Project onAlbumSelect={(id) => setSelectedAlbumId(id)} />
                        </div>
                        {selectedAlbumId && <Player albumId={selectedAlbumId} />}
                    </MusicPlayerProvider>
                </div>
                
                <div style={{ marginTop: '20px' }}>
                    <MainButton
                        msg='앨범 커스텀하러 가기'
                        submsg='AI를 활용해 나만의 앨범 만들기'
                        onClick={() => navigate('/shoot')}
                    />
                </div>
            </div>
        }>
        </Frame>
    )    
}

export default Albums;
