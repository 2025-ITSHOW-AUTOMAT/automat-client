import React, { useEffect, useState } from 'react';
import ProjectButton from './projectButton';
import AudioSlider from './audioSlider';
import { useMusicPlayer } from './musicPlayerContext';
import { ArrowUpRight } from "lucide-react"; // 🔑 추가
import axios from 'axios';

const Project = ({ allowUpRight, onAlbumSelect, limit }) => {  // 🔑 prop 받기
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState(0);
  const { playTrack, currentTrack, isPlaying } = useMusicPlayer();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_SERVER_URL}/album`);
        
        const processedAlbums = response.data.map(album => {
          let url = album.song_path;
        
          // 만약 song_path가 절대 URL (http/https) 이면 그대로 씀
          if (/^https?:\/\//.test(url)) {
            // 절대 URL이면 그대로 사용
          } else {
            // 상대 경로면 REACT_APP_SERVER_URL을 붙여줌
            url = `http://${process.env.REACT_APP_SERVER_URL}${url.startsWith('/') ? '' : '/'}${url}`;
          }
        
          return {
            ...album,
            music_url: url,
          };
        });
                
        // const processedAlbums = response.data.map(album => ({
        //   ...album,
        //   music_url: `http://${process.env.REACT_APP_SERVER_URL}/${album.song_path}`
        // }));
        setAlbums(processedAlbums);
      } catch (err) {
        console.error('데이터 가져오기 실패:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAlbums();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (albums.length === 0) return <div>앨범 데이터가 없습니다.</div>;

  const displayAlbums = limit ? albums.slice(0, limit) : albums;

  return (
    <div>
      {displayAlbums.map((album) => (
        <div key={album.id} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            
            <div style={{ flex: 1, position: 'relative' }}>
              <ProjectButton
                msg={album.user_name}
                submsg={album.description}
                onClick={() => playTrack(album)}
                allowUpRight={allowUpRight}  // prop 넘김
                upRightIcon={ArrowUpRight}  // 아이콘도 넘김
              />
                {currentTrack?.id === album.id && currentTrack.music_url && (
                <AudioSlider 
                  songUrl={currentTrack.music_url} 
                  onDurationLoad={(value) => setDuration(value)}  
                />
              )}

              <div style={{
                position: 'absolute',
                top: '30%',
                left: '30px',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {currentTrack?.id === album.id ? (isPlaying ? '⏸' : '▶') : '▶'}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;