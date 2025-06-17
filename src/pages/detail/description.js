import { useLocation } from "react-router-dom";
import Frame from "../../components/frame";
import { FaPlay } from "react-icons/fa6";
import styles from '../../styles/description.module.css'
import AudioSlider from "../../components/audioSlider";
import FooterButton from "../../components/footerButton";
import Hearder from "../../components/home/header";

const Description = () =>{
  const location = useLocation();
  const coverImage = location.state?.coverImage;
  const coverImagePath = `http://localhost:8089/uploads/coverImage/${coverImage}`

  console.log(coverImagePath)

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
                placeholder='제목을 정해주세요!'>
              </input>
              <input
                className={styles.nameinput}
                placeholder='이름을 입력해주세요'>
              </input>
            </div>
            <AudioSlider/>
            <textarea
              className={styles.descrioptioninput}
              placeholder='곡에 대해 설명해주세요!'>
            </textarea>

          </div>
        </div>
        <div style={{
          width: '100%'
        }}>
          <FooterButton msg='게시판 앨범에 노래 올리기'/>
        </div>
      </div>

    }/>

  )
}

export default Description;