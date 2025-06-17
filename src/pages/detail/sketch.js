import Frame from "../../components/frame";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import Canvas from "../../components/canvas";
import Songbox from "../../components/songbox";
import styles from "../../styles/sketch.module.css"
import Camera from "../../components/camera";
import FooterButton from "../../components/footerButton";

function Sketch(){
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const canvasComponentRef = useRef();
  const location = useLocation();
  const filename = location.state?.filename;


  const handleUpload = async () => {
    const imageData = canvasComponentRef.current?.getImageBase64();
    if (!imageData) {
      alert("커버 이미지 저장 실패");
      return;
    }

    try {
      // const res = await fetch("http://automat.mirim-it-show.site:8080/emotion/upload", {
        const res = await fetch("http://127.0.0.1:8000/emotion/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: imageData })
      });

      const result = await res.json();
      console.log("업로드 성공:", result.filename);

      navigate("/description", { state: { coverImage: result.filename, songPath: filename } });
    } catch (err) {
      console.error("업로드 실패", err);
    }
  };


  return (
    <div>
      <Frame children={
        <div style={{
          backgroundColor: '#D6EDF3', display:'flex', alignItems: 'center', flexDirection: 'column',
          padding: '20px'}}>
          <div style={{width: '100%', display:'flex', alignItems: 'center', flexDirection: 'column', gap: '10px'}}>
            <div className={styles.header}>
              표정을 통해 색상을 바꿔 앨범 표지를 디자인 해주세요 🙂
            </div>
            <div className={styles.maincontainer}>
              <div className={styles.sketchbox}>
                <Canvas ref={canvasComponentRef} cameraRef={webcamRef} />
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
            <div onClick={handleUpload} style={{width: '100%'}}>
              <FooterButton msg='표지 완성! 노래 정보 수정하러 가기'/>
            </div>
    
          </div>
        </div>
      }></Frame>

      <div style={{
        position: 'fixed',
        bottom: '60px',
        right: '60px',
        width: '320px',
        height: '240px',
        borderRadius: '10px',
        overflow: 'hidden',
        zIndex: 9999,
      }}>
        <Camera webcamRef={webcamRef} />
      </div>
    </div>
  )
}
export default Sketch;