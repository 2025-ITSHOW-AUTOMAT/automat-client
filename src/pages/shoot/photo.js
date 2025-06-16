import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import PhotoCard from "../../components/photoCard";

function Photo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { saved_paths, song_prompt, translate_prompt } = location.state || {};

  const handleNext = () => {
    navigate("/song/loading", { state: { song_prompt, saved_paths } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <PhotoCard image={saved_paths?.[0]} prompt={translate_prompt} />

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
