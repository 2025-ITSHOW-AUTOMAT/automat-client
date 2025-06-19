import React, { useEffect, useState } from 'react';
import AudioSlider from './audioSlider';

function Player({ albumId }) {
  const [songUrl, setSongUrl] = useState('');

  useEffect(() => {
    if (albumId) {
      fetch(`https://${process.env.REACT_APP_SERVER_URL}/album/${albumId}`)
        .then(res => res.json())
        .then(data => {
          setSongUrl(data.song_path); // FastAPI에서 반환하는 song_path
        })
        .catch(err => {
          console.error("Failed to load album", err);
        });
    }
  }, [albumId]);

  return (
    <div>
      {songUrl ? <AudioSlider songUrl={songUrl} /> : <p>Loading...</p>}
    </div>
  );
}

export default Player;
