import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LoadingShoot() {
  const location = useLocation();
  const navigate = useNavigate();
  const { capturedImages } = location.state;

  useEffect(() => {
    const getPrompt = async () => {
      try {
        const res = await fetch("http://localhost:8000/generate_prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images: capturedImages }),
        });
        const data = await res.json();
        const { prompt, translated_prompt } = data;

        navigate("/shoot/photo", {
          state: {
            image: capturedImages[1],
            prompt,
            translatedPrompt: translated_prompt,
          },
        });
      } catch (err) {
        console.error("프롬프트 생성 실패:", err);
      }
    };

    getPrompt();
  }, [capturedImages, navigate]);

  return (
    <div className="text-center mt-[30vh] text-2xl">로딩중..</div>
  );
}

export default LoadingShoot;
