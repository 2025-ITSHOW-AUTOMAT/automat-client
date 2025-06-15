import React, { useEffect, useState } from 'react'


function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}


// 음악 play 위한 api 연결 필요
function AudioSlider({songId}){
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!songId) {
      setDuration(0);
      return;
    }
  }, [songId]);

  const handleChange = (e) => {
    setCurrentTime(Number(e.target.value));
  };

  return (
    <div style={{ width: '97%', margin: '0 auto' }}>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleChange}
        className="audio-slider"
      />
      <style>
      {`
      .audio-slider {
        width: 100%;
        -webkit-appearance: none;
        outline: none;
      }

      /* 트랙 */
      .audio-slider::-webkit-slider-runnable-track {
        height: 2px;
        background: #aaaaaa;
      }

      /* 손잡이 */
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
        fontSize:'12px',
        color: '#aaaaaa',
        fontWeight: 600
      }}>
        <span style={{marginLeft: '4px'}}>
          {formatTime(currentTime)}
        </span>
        <span style={{marginRight: '4px'}}>
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default AudioSlider;