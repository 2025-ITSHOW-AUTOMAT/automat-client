import Frame from "../components/frame";
import { FaPlay } from "react-icons/fa6";
import styles from '../styles/description.module.css'
import AudioSlider from "../components/audioSlider";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const SongDetail = () =>{  // api 연결 및 데이터 가져오기 필요
  const navigate = useNavigate();

  const goToPreviousPage = () => {
    navigate(-1);
  };

  return (

    <Frame children={
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div 
        onClick={goToPreviousPage}
        style={{
          width: '100%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          padding: '14px 30px',
          border: 'solid 1px #B2D4DA',
          borderRadius: '10px',
          gap: '13px',
          boxSizing: 'border-box'
        }}>
          <GoArrowLeft size={20} color='#00A4C8'/>
          <div style={{
            fontSize:'13px',
            color: '#1c1c1c',
            fontWeight: 600
          }}>
            돌아가기
          </div>
        </div>
        <div className={styles.mainbox}>
          <div style={{
            position: 'relative',
            width: '304px',
            height: '304px',
            //backgroundImage: `url(${img})`,
            backgroundColor: 'white',
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
              <div className={styles.titleinput}>
                {'곡 제목'}
              </div>
              <div className={styles.nameinput}>
                {'유저 네임'}
              </div>
            </div>
            <AudioSlider/>
            <div className={styles.descrioptioninput}
              style={{
                background: 'transparent',
              }}>
              {'곡 설명'}
            </div>

          </div>
        </div>
      </div>

    }/>

  )
}

export default SongDetail;