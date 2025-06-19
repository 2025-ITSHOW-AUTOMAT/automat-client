import { useEffect, useState } from "react";
import TypingDots from "../../components/typing";
import FooterButton from "../../components/footerButton";

function PromptLoading({ savedPaths, onAnalyzeComplete }) {
    const [status, setStatus] = useState("loading");
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [result, setResult] = useState(null); // 결과 저장

    useEffect(() => {
        const analyze = async () => {
            try {
                // const response = await fetch(`https://${process.env.REACT_APP_RUNPOD_URL}/prompt/generate/song_prompt`, {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify({ image_paths: savedPaths }),
                // });
                // const result = await response.json();

                const result = {
                    base_prompts: [
                        "A joyful scene: a cat playing with a toy.",
                        "A mysterious scene: a shadow in the fog.",
                        "A peaceful scene: a sunset over the ocean."
                    ],
                    song_prompts: [
                        "고양이가 장난감을 가지고 노는 즐거운 장면.",
                        "안개 속 그림자 같은 신비로운 장면.",
                        "바다 위로 지는 해처럼 평화로운 장면."
                    ],
                    translate_prompts: [
                        "고양이가 장난감을 가지고 노는 즐거운 장면.",
                        "안개 속 그림자 같은 신비로운 장면.",
                        "바다 위로 지는 해처럼 평화로운 장면."
                    ]
                };

                console.log("Generated prompts:", result.base_prompts);
                console.log("Song prompt:", result.translate_prompts.join(" "));
                console.log("Translate prompt:", result.translate_prompts);

                setResult(result);
                setStatus("done");
                setButtonEnabled(true);
            } catch (err) {
                console.error("분석 실패", err);
            }
        };

        analyze();
    }, [savedPaths]);

    const handleClick = () => {
        if (result) {
            onAnalyzeComplete(result.song_prompts, result.song_prompts.join(" "));
        }
    };

    return (
        <div style={{
            textAlign: "center",
            width: "26.5vw",
            margin: "auto",
        }}>
            {status === "loading" ? 
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
                : <div style={{
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
                }}>프롬프트 생성 완료!</div>
            }

            <button
                onClick={handleClick}
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
