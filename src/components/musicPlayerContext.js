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
    const audio = audioRef.current;

    if (currentTrack?.id === track.id) {
      // 같은 트랙이면 재생/일시정지 토글
      if (isPlaying) {
        audio.pause();
        // await audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        // await audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // 다른 트랙이면 새로 재생
      setCurrentTrack(track);
      setIsPlaying(true);
      audio.src = track.song_path;
      audio.currentTime = 0;
      try {
        await audio.play();
      } catch (err) {
        console.error('Play error');
      }
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
    // if (!audio || !currentTrack) return;

    // audio.src = currentTrack.song_path;
    
    // const handleLoadedData = () => {
    //   setDuration(audio.duration);
    //   if (isPlaying) {
    //     audio.play();
    //   }
    // };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadeddata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedMetadata);
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
