import React, { useEffect, useState } from 'react'
import styles from '../styles/songbox.module.css'
import AudioSlider from './audioSlider';

function Songbox(songId){
  const [title, setTitle] = useState('제목을 지어주세요!');

  useEffect(() => {
    if(!songId){
      return ;
    }
  }, [])
  

  return(
    <div className={styles.container}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'start'}}>
        <div style={{fontSize: '16px', fongWeight: '700', color: '#00A4C8', width: 'fit-content', paddingTop: '2px'}}>
          {title}
        </div>
        <div className={styles.editbtn}>
          <div>노래 정보 수정하기</div>
          <div style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00A4C8'}}></div>
        </div>
      </div>
      <div style={{height: '1px', backgroundColor: '#d0e6ec', marginBottom: '9px'}}></div>
      <AudioSlider />
    </div>
  )

}

export default Songbox;