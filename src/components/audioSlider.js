import React, { useEffect, useState, useRef } from 'react';
import { useMusicPlayer } from './musicPlayerContext';

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

const AudioSlider = () => {
  const { currentTime, duration, seekTo } = useMusicPlayer();

  const handleChange = (e) => {
    const value = Number(e.target.value);
    seekTo(value);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

// function AudioSlider({ songUrl, onDurationLoad }) {
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef(null);
// x
//   useEffect(() => {
//     console.log("✅ AudioSlider에 전달된 songUrl:", songUrl); 

//     if (!songUrl) return;

//     const audio = new Audio(songUrl);
//     audioRef.current = audio;

//     const handleLoadedMetadata = () => {
//       setDuration(audio.duration);
//       if (onDurationLoad) {
//         onDurationLoad(audio.duration);
//       }
//     };

//     const handleTimeUpdate = () => {
//       setCurrentTime(audio.currentTime);
//     };

//     audio.addEventListener('loadedmetadata', handleLoadedMetadata);
//     audio.addEventListener('timeupdate', handleTimeUpdate);

//     audio.play();

//     return () => {
//       audio.pause();
//       audio.src = '';
//       audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
//       audio.removeEventListener('timeupdate', handleTimeUpdate);
//     };
//   }, [songUrl]);

//   const handleChange = (e) => {
//     const value = Number(e.target.value);
//     if (audioRef.current) {
//       audioRef.current.currentTime = value;
//     }
//     setCurrentTime(value);
//   };

  // const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div style={{ width: '97%', margin: '0 auto' }}>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleChange}
        className="audio-slider"
        style={{
          background: `linear-gradient(to right, #06A6C9 ${progressPercent}%, #aaaaaa ${progressPercent}%)`
        }}
      />
      <style>
        {`
        .audio-slider {
          width: 100%;
          -webkit-appearance: none;
          outline: none;
        }

        .audio-slider::-webkit-slider-runnable-track {
          height: 2px;
          background: #aaaaaa;
        }

        .audio-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: #06A6C9;
          border-radius: 50%;
          cursor: pointer;
          margin-top: -5px;
          border: none;
        }
        `}
      </style>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
        fontSize: '12px',
        color: '#aaaaaa',
        fontWeight: 600
      }}>
        <span style={{ marginLeft: '4px' }}>{formatTime(currentTime)}</span>
        <span style={{ marginRight: '4px' }}>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default AudioSlider;
