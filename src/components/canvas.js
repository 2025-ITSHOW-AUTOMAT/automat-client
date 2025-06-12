import React, { useRef, useState, useEffect } from "react";
import Camera from "./camera";

function Canvas(){
  const cameraRef = useRef(null);
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const wsRef = useRef(null);
  const [getCtx, setGetCtx] = useState(null);
  const [painting, setPainting] = useState(false);
  const [femotion, setEmotion] = useState('분석중');
  const [fcolor, setColor] = useState('#000000');

  useEffect(()=>{

    const socket = new WebSocket('ws://localhost:8080/emotion/ws');
    wsRef.current = socket;
    
    socket.onerror = (e) => {
      console.error("WebSocket 연결 실패", e);
    };

    socket.onmessage = (event) => {
      const { emotion, color } = JSON.parse(event.data);
      setEmotion(emotion);
      if(color) setColor(color);
    };

    return()=>{
      socket.close();
    }
  }, [])

  useEffect(()=>{
    const sendVideo = () => {
      const video = cameraRef.current?.video;
      const frame = frameRef.current;

      const ctx = frame.getContext('2d');
      if(!ctx) return;

      ctx.drawImage(video, 0, 0, frame.width, frame.height);
      frame.toBlob((blob)=>{
        if(blob){
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = (reader.result).split(',')[1];
            wsRef.current?.send(base64);
          }
          reader.readAsDataURL(blob);
        }
      }, 'image/jpeg');
    };

    const interval = setInterval(sendVideo, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.5;
    setGetCtx(ctx);

  }, [])

  const drawFn = e => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
  
    if (!getCtx) return;
  
    if (!painting) {
      getCtx.beginPath();
      getCtx.moveTo(x, y);
    } else {
      getCtx.strokeStyle = fcolor;
      getCtx.lineTo(x, y);
      getCtx.stroke();
      getCtx.beginPath();
      getCtx.moveTo(x, y);
    }
  };

  return(
    <div>
      <canvas
        ref={canvasRef}
        style={{ width: "444px", aspectRatio: '1/1', border: 'solid 1px rgba(0, 164, 200, 0.05)', borderRadius: '5px'}}
        onMouseDown={() => setPainting(true)}
        onMouseUp={() => setPainting(false)}
        onMouseMove={e => drawFn(e)}
        onMouseLeave={() => setPainting(false)}
      />
      <Camera ref={cameraRef} />
      <canvas ref={frameRef} width="320" height="240" hidden />
    </div>
  )
}

export default Canvas;