import Canvas from "../../components/canvas";
import Songbox from "../../components/songbox";
import styles from "../../styles/sketch.module.css"

function Sketch(){
  return(
    <div style={{backgroundColor: '#D6EDF3'}}>
      <div className={styles.maincontainer}>
        <div className={styles.sketchbox}>
          <Canvas/>
          <div className={styles.colorchip}>
            <div style={{ background: 'linear-gradient(#99EEFF, #00C8F0)'}}/>
            <div style={{ background: 'linear-gradient(#FF9999, #F04800)'}}/>
            <div style={{ background: 'linear-gradient(#FFDB99, #F0AC00)'}}/>
            <div style={{ background: 'linear-gradient(#99FFBD, #10F000)'}}/>
            <div style={{ background: 'linear-gradient(#666666, #000000)'}}/>
          </div>
        </div>
        <Songbox />

      </div>

    </div>
  )
}

export default Sketch;