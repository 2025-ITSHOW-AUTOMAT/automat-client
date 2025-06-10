import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Song() {
    const location = useLocation();
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioBase64 = location.state?.audioBase64;

    useEffect(() => {
        if (!audioBase64) {
            navigate("/shoot");
        }
    }, [audioBase64, navigate]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    if (!audioBase64) return null;

    return (
        <div style={{ textAlign: "center", padding: "5vw" }}>
            <h1>생성된 노래 재생</h1>
            <audio
                ref={audioRef}
                src={`data:audio/mp3;base64,${audioBase64}`}
                controls={false}
                onEnded={() => setIsPlaying(false)}
            />
            <button
                onClick={togglePlay}
                style={{
                    fontSize: "4vw",
                    padding: "1vw 3vw",
                    borderRadius: "1vw",
                    cursor: "pointer",
                    marginTop: "3vw",
                }}
            >
                {isPlaying ? "일시정지" : "재생"}
            </button>
        </div>
    );
}

export default Song;
