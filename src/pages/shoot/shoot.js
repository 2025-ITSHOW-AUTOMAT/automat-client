import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Camera from "../../components/camera";
import Frame from "../../components/frame";

function Shoot() {
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const [message, setMessage] = useState('5초 후 사진 촬영이 시작됩니다! 📸');
    const [countdown, setCountdown] = useState(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [shotStep, setShotStep] = useState(0);
    const [previewImage, setPreviewImage] = useState(null);
    const [showPreview, setShowPreview] = useState(false);


    useEffect(()=>{
        const timer = setTimeout(()=>{
            setMessage('프롬프트로 사용될 이미지 촬영이 총 3번 진행됩니다! 💥');
            setShotStep(1);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(()=>{
        if(shotStep >= 1 && shotStep <= 3){
            setCountdown(10);
            let count = 10;

            const interval = setInterval(() => {
                count -= 1;
                setCountdown(count);
                if (count === 0) {
                    clearInterval(interval);
                    const image = capture();
                    console.log(image);

                    setPreviewImage(image);
                    setShowPreview(true);

                    setTimeout(() => {
                        setShowPreview(false);
                        setPreviewImage(null);
                        
                        if (shotStep === 3) {
                            navigate("/shoot/loading", { state: { capturedImages: [...capturedImages, image] } });
                        } else {
                            setShotStep(prev => prev + 1);
                        }
                    }, 1500);
                }
            }, 1000);
        }
    }, [shotStep]);

    const capture = () => {
        if (!webcamRef.current) return;

        const video = webcamRef.current.video;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageSrc = canvas.toDataURL("image/png", 1.0);
        setCapturedImages((prev) => [...prev, imageSrc]);
        
        return imageSrc;
    };

    return (
        <Frame
            children={
                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                {showPreview&&(
                    <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                )}
                <Camera webcamRef={webcamRef} />
                <div
                    style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        width: "532px",
                        textAlign: "center",
                        fontSize: "15px",
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        border: 'solid, 1px #B2D4DA',
                        borderRadius: '10px',
                        padding: '13px 0',
                        fontWeight: '600',
                        color: '#1C1C1C'
                    }}
                >
                    {message}
                </div>

                
                {countdown !== null && !showPreview && (
                    <div
                        style={{
                            width: '77px',
                            height: '77px',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            top: "50%",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            textAlign: "center",
                            fontSize: "44px",
                            fontWeight: "700",
                            color: "#00A4C8",
                            backgroundColor: 'rgba(240, 240, 240, 0.5)' 
                        }}
                    >
                        {countdown}
                    </div>
                )}
            </div>
            }>
        </Frame>
        
    );
}

export default Shoot;
