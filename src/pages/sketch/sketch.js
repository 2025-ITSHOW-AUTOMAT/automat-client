import Canvas from "../../components/canvas";
import Songbox from "../../components/songbox";
import styles from "../../styles/sketch.module.css"

function Sketch(){
  return(
    <div style={{
      backgroundColor: '#D6EDF3', display:'flex', alignItems: 'center', flexDirection: 'column',
      padding: '20px 0'}}>
      <div style={{width:'fit-content',display:'flex', alignItems: 'center', flexDirection: 'column', gap: '10px'}}>
        <div className={styles.header}>
          표정을 통해 색상을 바꿔 앨범 표지를 디자인 해주세요 🙂
        </div>
        <div className={styles.maincontainer}>
          <div className={styles.sketchbox}>
            <Canvas/>
            <div className={styles.colorchip}>
              <div style={{display: 'flex', gap: '4px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ background: 'linear-gradient(#99EEFF, #00C8F0)'}}/>
                <p>sad</p>
              </div>
              
              <div style={{display: 'flex', gap: '4px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ background: 'linear-gradient(#FF9999, #F04800)'}}/>
                <p>angry</p>
              </div>
              
              <div style={{display: 'flex', gap: '4px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ background: 'linear-gradient(#FFDB99, #F0AC00)'}}/>
                <p>surprise</p>
              </div>
              
              <div style={{display: 'flex', gap: '4px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ background: 'linear-gradient(#99FFBD, #10F000)'}}/>
                <p>happy</p>
              </div>
              
              <div style={{display: 'flex', gap: '4px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ background: 'linear-gradient(#666666, #000000)'}}/>
                <p>neutral</p>
              </div>
            </div>
          </div>
          <Songbox />
        </div>
        <div className={styles.footer}>
          표지 완성! 노래 정보 수정하러 가기
        </div>

      </div>
    </div>
  )
}

export default Sketch;