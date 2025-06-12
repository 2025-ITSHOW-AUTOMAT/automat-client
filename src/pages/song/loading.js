import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Loading() {
    const location = useLocation();
    const navigate = useNavigate();

    const capturedImages = location.state?.capturedImages;

    useEffect(() => {
        if (!capturedImages || capturedImages.length < 3) {
            navigate("/shoot");
            return;
        }

        const sendImages = async () => {
            try {
                const response = await fetch("http://localhost:8000/photo/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ images: capturedImages }),
                });
                const result = await response.json();

                console.log("Saved paths:", result.saved_paths);
                console.log("Generated prompts:", result.prompts);
                console.log("Song prompt:", result.song_prompt);

                const { song_prompt } = result;
        
                const songRes = await fetch("http://localhost:8000/song/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        prompts: song_prompt,
                        duration_sec: 45
                    }),
                });
        
                const songResult = await songRes.json();
                const audioBase64 = songResult.audio_base64;
        
                navigate("/song", { state: { audioBase64 } });
            } catch (error) {
                console.error("오류 발생:", error);
                navigate("/shoot");
            }
        };
        
        sendImages();
    }, [capturedImages, navigate]);

    return (
        <div style={{ textAlign: "center", padding: "5vw" }}>
            <h2 style={{ fontSize: "5vw", marginTop: "20vh" }}>노래 생성 중....</h2>
        </div>
    );
}

export default Loading;
