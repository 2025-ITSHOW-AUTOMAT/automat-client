import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";

const Canvas = forwardRef((props, ref) => {
  const cameraRef = props.cameraRef;
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const wsRef = useRef(null);
  const [getCtx, setGetCtx] = useState(null);
  const [painting, setPainting] = useState(false);
  const [fcolor, setColor] = useState('#000000');

  useImperativeHandle(ref, () => ({
    getImageBase64: () => {
      const originalCanvas = canvasRef.current;
      const width = originalCanvas.width;
      const height = originalCanvas.height;
  
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width;
      tempCanvas.height = height;
  
      const tempCtx = tempCanvas.getContext("2d");
  
      // 배경을 흰색으로
      tempCtx.fillStyle = "#ffffff";
      tempCtx.fillRect(0, 0, width, height);
  
      tempCtx.drawImage(originalCanvas, 0, 0);
  
      return tempCanvas.toDataURL("image/png");
    }
  }));

  useEffect(()=>{

    const socket = new WebSocket(`ws://${process.env.SERVER_URL}/emotion/ws`);
    wsRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket 연결 성공");
    }
    
    socket.onerror = (e) => {
      console.error("WebSocket 연결 실패", e);
    };

    socket.onmessage = (event) => {
      const { emotion, color } = JSON.parse(event.data);
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
    ctx.lineWidth = 1.5;
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
        id='cover'
        ref={canvasRef}
        style={{ width: "340px", aspectRatio: '1/1', border: 'solid 1px #B2D4DA', borderRadius: '5px'}}
        onMouseDown={() => setPainting(true)}
        onMouseUp={() => setPainting(false)}
        onMouseMove={e => drawFn(e)}
        onMouseLeave={() => setPainting(false)}
      />
      <canvas ref={frameRef} width="320" height="240" hidden />
    </div>
  )
});

export default Canvas;