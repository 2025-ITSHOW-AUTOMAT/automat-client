import { useEffect, useState } from "react";
import TypingDots from "../../components/typing";
import FooterButton from "../../components/footerButton";

function SaveLoading({ capturedImages, onSaveComplete }) {
    const [status, setStatus] = useState("loading");
    const [savedPaths, setSavedPaths] = useState([]);
    const [buttonEnabled, setButtonEnabled] = useState(false);

    useEffect(() => {
        const saveImages = async () => {
            try {
                const response = await fetch(`https://${process.env.REACT_APP_SERVER_URL}/photo/save`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ images: capturedImages }),
                });
                if (!response.ok) {
                    const text = await response.text();
                    console.error("서버 응답 오류:", response.status, text);
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const result = await response.json();
                const serverBaseUrl = `https://${process.env.REACT_APP_SERVER_URL}`;
                const imageUrls = result.saved_paths.map(path => `${serverBaseUrl}${path.replace("./", "/")}`);

                console.log("Saved paths:", result.saved_paths);
                console.log("Image URLs:", imageUrls);
                
                setSavedPaths(result.saved_paths);
                setStatus("done");
                setButtonEnabled(true);
            } catch (err) {
                console.error("저장 실패", err);
            }
        };
        saveImages();
    }, [capturedImages]);


    return (
        <div style={{
            textAlign: "center",
            width: "26.5vw",
            margin: "auto",
        }}>
            {status === "loading" ? 
                <div>
                    <TypingDots
                        text="사진을 저장하는 중"
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
                }}>사진 저장 완료!</div>
            }
            <button
                onClick={() => onSaveComplete(savedPaths)}
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
                <FooterButton msg="사진 분석하러 가기" />
                
            </button>
        </div>
    );
}

export default SaveLoading;
