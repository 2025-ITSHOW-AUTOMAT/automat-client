import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
                const response = await fetch("http://automat.mirim-it-show.site:8080/photo/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ images: capturedImages }),
                });

                const result = await response.json();
                console.log("Saved paths:", result.saved_paths);
                console.log("Generated prompts:", result.prompts);
                console.log("Song prompt:", result.song_prompt);
                console.log("Translate prompt:", result.translate_prompt);

                navigate("/shoot/photo", {
                    state: {
                        saved_paths: result.saved_paths,
                        translate_prompt: result.translate_prompt,
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
        <div style={{ textAlign: "center", padding: "5vw" }}>
            <h2 style={{ fontSize: "5vw", marginTop: "20vh" }}>프롬프트 생성 중...</h2>
        </div>
    );
}

export default ShootLoading;
