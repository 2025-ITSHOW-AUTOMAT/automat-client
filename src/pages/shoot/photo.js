import { useLocation, useNavigate } from "react-router-dom";
import PhotoCard from "../../components/photoCard";

function Photo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, prompt, translatedPrompt } = location.state;

  const handleNext = () => {
    navigate("/songLoading", { state: { prompt, image } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <PhotoCard image={image} translatedPrompt={translatedPrompt} />
      <button
        onClick={handleNext}
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-full text-lg"
      >
        다음
      </button>
    </div>
  );
}

export default Photo;
