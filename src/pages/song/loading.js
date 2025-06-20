import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Frame from "../../components/frame.js";
import TypingDots from "../../components/typing";

function SongLoading() {
    const location = useLocation();
    const navigate = useNavigate();
    const song_prompt = location.state?.song_prompt;
    const rawPrompt = location.state?.song_prompt;

    useEffect(() => {
        if (!song_prompt) {
            navigate("/shoot");
            return;
        }

        const prompt = Array.isArray(rawPrompt) ? rawPrompt.join(" ") : rawPrompt;

        const generateSong = async () => {
            try {
                const songRes = await fetch(`https://${process.env.REACT_APP_RUNPOD_URL}/song/generate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        song_prompt: prompt,
                        duration_sec: 45,
                        lora_path: null,
                        lora_weight: 1.0,
                        infer_steps: 100
                    }),
                });

                const songResult = await songRes.json();

                if (!songRes.ok) {
                    throw new Error(songResult.detail || "곡 생성 실패");
                }

                const songUrl = songResult.song_url;
                const filename = songResult.filename;

                navigate("/sketch", { state: { songUrl, filename } });
            } catch (error) {
                console.error("노래 생성 중 오류 발생:", error);
                navigate("/sketch");
            }
        };

        generateSong();
    }, [song_prompt, navigate]);

    return (
        <Frame>
            <div style={{ textAlign: "center" }}>
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
                    <div style={{
                        fontSize: "1vw",
                        marginTop: "1vw",
                        color: "#666666",
                        fontWeight: "500",
                    }}>
                        조금 시간이 걸릴 수 있습니다. 잠시만 기다려주세요.
                    </div>
                </div>
            </div>
        </Frame>
    );
}

export default SongLoading;
