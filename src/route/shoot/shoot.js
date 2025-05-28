import React, { useRef, useState } from "react";
import Camera from "../../components/camera";

function Shoot() {
    const webcamRef = useRef(null);
    const [countdown, setCountdown] = useState(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);

    const handleStartCapture = () => {
        if (capturedImages.length >= 3 || isCapturing) return;

        setCountdown(5);
        setIsCapturing(true);
        let count = 5;

        const interval = setInterval(() => {
            count -= 1;
            if (count === 0) {
                clearInterval(interval);
                capture();
                setCountdown(null);
                setIsCapturing(false);
            } else {
                setCountdown(count);
            }
        }, 1000);
    };

    const capture = () => {
        if (!webcamRef.current) return;
    
        const video = webcamRef.current.video;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
    
        //좌우반전
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
        const imageSrc = canvas.toDataURL("image/jpeg", 1.0);
        setCapturedImages([...capturedImages, imageSrc]);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <Camera ref={webcamRef} />

            {countdown !== null ? (
                <h2 style={{ fontSize: "24px", margin: "20px 0" }}>
                    촬영까지: {countdown}초
                </h2>
            ) : (
                <button
                    onClick={handleStartCapture}
                    disabled={capturedImages.length >= 3}
                    style={{
                        fontSize: "16px",
                        color: "#000",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        marginTop: "20px",
                    }}
                >
                    {capturedImages.length < 3 ? "사진 촬영" : "촬영 완료"}
                </button>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "center" }}>
                {capturedImages.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`캡처 ${index + 1}`}
                        style={{
                            width: "10em",
                            height: "10em", 
                            bjectFit: "cover",
                            borderRadius: "6px"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Shoot;
