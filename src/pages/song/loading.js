import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Frame from "../../components/frame.js";
import TypingDots from "../../components/typing";

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
                // const songRes = await fetch("http://localhost:8000/song/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        song_prompt: song_prompt,
                        duration_sec: 45,
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
        <Frame>
            <div style={{
                textAlign: "center",
            }}>
                <div style={{
                    width: "26.5vw",
                    height: "16.5vw",
                    margin: "auto",
                    marginTop: "2.5vh",
                    backgroundColor: "white",
                    borderRadius: "1vw",
                    border: "solid #B2D4DA",
                }}>
                    <TypingDots
                        text="음악 생성 중"
                        interval={400}
                        maxDots={3}
                        style={{
                            fontSize: "1.5vw",
                            paddingTop: "6.5vw",
                            color: "#00A4C8",
                            textAlign: "center",
                            fontWeight: "600",
                        }}
                    />
                </div>
            </div>
        </Frame>
    );
}

export default SongLoading;
