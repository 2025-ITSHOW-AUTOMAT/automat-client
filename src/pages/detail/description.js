import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Frame from "../../components/frame";
import { FaPlay } from "react-icons/fa6";
import styles from '../../styles/description.module.css'
import AudioSlider from "../../components/audioSlider";
import FooterButton from "../../components/footerButton";
import Hearder from "../../components/home/header";
import axios from 'axios';


const Description = () =>{
  const location = useLocation();
  const coverImage = location.state?.coverImage;
  // const coverImagePath = `http://automat.mirim-it-show.site:8080/uploads/coverImage/${coverImage}`
  const coverImagePath = `http://127.0.0.1:8000/uploads/coverImage/${coverImage}`
  const songPath = location.state?.songPath;
  // const songUrl = `http://automat.mirim-it-show.site:8080/uploads/song/${songPath}`;
  const songUrl = `http://127.0.0.1:8000/uploads/song/${songPath}`;


  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [description, setDescription] = useState('');

  console.log(coverImagePath)

  const handleSubmit = async () => {
    const payload = {
      title: title,
      user_name: userName,
      description: description,
      image_path: coverImagePath,
      song_path: songUrl  // 실제 경로로 대체
    };
  
    try {
      // const response = await axios.post('http://automat.mirim-it-show.site:8080/save-info', payload);
      const response = await axios.post('http://127.0.0.1:8000/album/save/info', payload);
      alert(response.data.message);
      navigate('/finish')
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (

    <Frame children={
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <Hearder />
        <div className={styles.mainbox}>
          <div style={{
            position: 'relative',
            width: '304px',
            height: '304px',
            backgroundImage: `url(${coverImagePath})`,
            backgroundSize: 'cover',        
            backgroundPosition: 'center',   
            backgroundRepeat: 'no-repeat',
            border: 'solid 1px #B2D4DA',
            borderRadius: '5px'
          }}>
            <div className={styles.playbtn}>
              <FaPlay color='#00A4C8' size={30} style={{paddingLeft: '5px' }}/>
            </div>
          </div>

          <div className={styles.inputcontainer}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <input
                className={styles.titleinput}
                placeholder='제목을 정해주세요!'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                className={styles.nameinput}
                placeholder='이름을 입력해주세요'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <AudioSlider/>
            <textarea
              className={styles.descrioptioninput}
              placeholder='곡에 대해 설명해주세요!'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div style={{
          width: '100%'
        }}>
          <FooterButton msg='게시판 앨범에 노래 올리기' onClick={handleSubmit}/>
        </div>
      </div>

    }/>

  )
}

export default Description;