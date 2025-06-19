import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  }
  return context;
};

export const MusicPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  // 또는 useEffect에서 초기 설정
  useEffect(() => {
    const audio = audioRef.current;
    audio.preload = 'auto'; // 여기에서 preload 설정
  }, []);

  const playTrack = async (track) => {
    try {
      const audio = audioRef.current;
  
      if (!audio) return;
  
      // 이미 같은 트랙을 재생 중이면 토글처럼 동작
      if (currentTrack?.id === track.id) {
        if (isPlaying) {
          pauseTrack();
        } else {
          await audio.play();
          setIsPlaying(true);
        }
        return;
      }
  
      // 다른 트랙일 경우: 기존 오디오 멈춤
      audio.pause();
      audio.currentTime = 0;
      audio.src = track.music_url;
  
      await new Promise((resolve) => setTimeout(resolve, 50));
  
      await audio.play();
      setCurrentTrack(track);
      setIsPlaying(true);
  
    } catch (error) {
      console.warn('Play interrupted or blocked:', error);
    }
  };
    
  const pauseTrack = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
  };

  const seekTo = (time) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  useEffect(() => {
    const audio = audioRef.current;
  
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setCurrentTrack(null);
    };
  
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
  
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        playTrack,
        pauseTrack,
        seekTo,
        audioRef
      }}
    >
      {children}
      {/* <audio ref={audioRef} /> */}
    </MusicPlayerContext.Provider>
  );
};
