import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SongLoading() {
    const location = useLocation();
    const navigate = useNavigate();
    const song_prompt = location.state?.song_prompt;

    useEffect(() => {
        if (!song_prompt) {
            navigate("/shoot");
            return;
        }

        const generateSong = async () => {
            try {
                const songRes = await fetch("http://automat.mirim-it-show.site:8080/song/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        song_prompt: song_prompt,
                        duration_sec: 45,

                        lora_path: null,
                        lora_weight: 1.0,
                        infer_steps: 100,
                    }),
                });

                const songResult = await songRes.json();
                const audioBase64 = songResult.audio_base64;

                navigate("/sketch", { state: { audioBase64 } });
            } catch (error) {
                console.error("노래 생성 중 오류 발생:", error);
                navigate("/shoot");
            }
        };

        generateSong();
    }, [song_prompt, navigate]);

    return (
        <div style={{ textAlign: "center", padding: "5vw" }}>
            <h2 style={{ fontSize: "5vw", marginTop: "20vh" }}>노래 생성 중...</h2>
        </div>
    );
}

export default SongLoading;
