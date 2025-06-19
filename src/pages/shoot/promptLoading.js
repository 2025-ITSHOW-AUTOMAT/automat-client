// promptLoading.js
import { useEffect, useState } from "react";
import TypingDots from "../../components/typing";
import FooterButton from "../../components/footerButton";

function PromptLoading({ savedPaths, onAnalyzeComplete }) {
    const [status, setStatus] = useState("loading");
    const [buttonEnabled, setButtonEnabled] = useState(false);

    useEffect(() => {
        const analyze = async () => {
            try {
                const response = await fetch(`https://${process.env.REACT_APP_RUNPOD_URL}/prompt/generate/song_prompt`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(savedPaths),
                });
                const result = await response.json();

                console.log("Generated prompts:", result.prompts);
                console.log("Song prompt:", result.song_prompt);
                console.log("Translate prompt:", result.song_prompts);

                setStatus("done");
                setButtonEnabled(true);
            } catch (err) {
                console.error("분석 실패", err);
            }
        };

        analyze();
    }, [savedPaths]);

    return (
        <div style={{
            textAlign: "center",
            width: "26.5vw",
            margin: "auto",
        }}>
            {status === "loading" ? 
                <div>
                    <TypingDots
                        text="사진을 분석하는 중"
                        interval={400}
                        maxDots={3}
                        style={{
                            fontSize: "1.5vw",
                            paddingTop: "6.5vw",
                            color: "#00A4C8",
                            textAlign: "center",
                            paddingBottom: "1vw",
                            fontWeight: "600",
                            width: "26.5vw",
                            height: "7vw",
                            margin: "auto",
                            marginTop: "1.5vh",
                            marginBottom: "1.5vh",
                            backgroundColor: "white",
                            borderRadius: "1vw",
                            border: "solid #B2D4DA",
                        }}
                    />
                </div> : 
                <div style={{
                    fontSize: "1.5vw",
                    paddingTop: "6.5vw",
                    color: "#00A4C8",
                    textAlign: "center",
                    fontWeight: "600",
                }}>프롬프트 생성 완료!</div>
            }
            <button
                onClick={() => onAnalyzeComplete(savedPaths)}
                disabled={!buttonEnabled}
                style={{
                    width: "100%",
                    opacity: buttonEnabled ? 1 : 0.5,
                    cursor: buttonEnabled ? "pointer" : "not-allowed",
                    border: "none",
                    background: "none",
                    padding: 0
                }}
            >
                <FooterButton msg="결과 확인하러 가기" />
                
            </button>
        </div>
);
}

export default PromptLoading;
