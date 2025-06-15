import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Camera from "../../components/camera";
import Countdown from "../../components/countdown";

function Shoot() {
    const webcamRef = useRef(null);
    const [countdown, setCountdown] = useState(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);
    const navigate = useNavigate();

    const handleStartCapture = () => {
        if (capturedImages.length >= 3 || isCapturing) return;

        setCountdown(5);
        setIsCapturing(true);
        let count = 2;

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

        // 좌우반전
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageSrc = canvas.toDataURL("image/png", 1.0);
        setCapturedImages((prev) => [...prev, imageSrc]);
    };

    const handleClick = () => {
        if (capturedImages.length < 3) return;
        navigate("/shootLoading", { state: { capturedImages } });
    };

    return (
        <div style={{ textAlign: "center", padding: "5vw" }}>
            <Camera ref={webcamRef} />

            <div style={{ fontSize: "4vw", marginTop: "6vw", color: "#555" }}>
                {capturedImages.length} / 3
            </div>

            {countdown !== null ? (
                <Countdown number={countdown} />
            ) : capturedImages.length < 3 ? (
                <button
                    onClick={handleStartCapture}
                    disabled={isCapturing}
                    style={{
                        fontSize: "5vw",
                        color: "#000",
                        borderRadius: "3vw",
                        border: "none",
                        padding: "1vw 2vw",
                        cursor: "pointer",
                        marginTop: "8vw",
                    }}
                >
                    사진 촬영
                </button>
            ) : (
                <button
                    onClick={handleClick}
                    style={{
                        fontSize: "5vw",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        borderRadius: "3vw",
                        border: "none",
                        padding: "1vw 2vw",
                        cursor: "pointer",
                        marginTop: "8vw",
                    }}
                >
                    촬영 완료
                </button>
            )}
        </div>
    );
}

export default Shoot;
