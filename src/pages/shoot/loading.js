import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Frame from "../../components/frame.js";
import TypingDots from "../../components/typing";

function ShootLoading() {
    const location = useLocation();
    const navigate = useNavigate();
    const capturedImages = location.state?.capturedImages;

    useEffect(() => {
        if (!capturedImages || capturedImages.length < 3) {
            navigate("/shoot");
            return;
        }

        const processImages = async () => {
            try {
                const response = await fetch(`http://${process.env.REACT_APP_SERVER_URL}/photo/save`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ images: capturedImages }),
                });

                const result = await response.json();
                console.log("Saved paths:", result.saved_paths);
                console.log("Generated prompts:", result.prompts);
                console.log("Song prompt:", result.song_prompt);
                console.log("Translate prompt:", result.translate_prompts);

                const serverBaseUrl = `http://${process.env.REACT_APP_SERVER_URL}`;

                const imageUrls = result.saved_paths.map((path) => {
                    const cleanPath = path.replace("./", "/");
                    return `${serverBaseUrl}${cleanPath}`;
                });

                navigate("/shoot/photo", {
                    state: {
                        saved_paths: imageUrls,
                        translate_prompts: result.translate_prompts,
                        song_prompt: result.song_prompt,
                    },
                });
                
            } catch (error) {
                console.error("오류 발생:", error);
                navigate("/shoot");
            }
        };

        processImages();
    }, [capturedImages, navigate]);

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
                        text="사진을 분석하는 중"
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

export default ShootLoading;
