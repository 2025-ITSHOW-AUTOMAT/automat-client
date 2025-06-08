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

    const sendImages = async (images) => {
        const payload = {
            images: images,
        };
        
        try {
            const response = await fetch("http://localhost:8000/photo/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            const result = await response.json();
            console.log("Saved paths:", result.saved_paths);
            console.log("Generated prompt:", result.prompts);
        } catch (error) {
            console.error("이미지 업로드 오류:", error);
        }
    };

    const handleClick = () => {
        if (capturedImages.length < 3) return;
        sendImages(capturedImages);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <Camera ref={webcamRef} />

            {countdown !== null ? (
                <h2 style={{ fontSize: "24px", margin: "20px 0" }}>
                    촬영까지: {countdown}초
                </h2>
            ) : capturedImages.length < 3 ? (
                <button
                    onClick={handleStartCapture}
                    disabled={isCapturing}
                    style={{
                        fontSize: "16px",
                        color: "#000",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        marginTop: "20px",
                    }}
                >
                    사진 촬영
                </button>
            ) : (
                <button
                    onClick={handleClick}
                    style={{
                        fontSize: "16px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        marginTop: "20px",
                    }}
                >
                    촬영 완료
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
