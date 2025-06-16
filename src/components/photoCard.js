import React from 'react';

const PhotoCard = ({ photo = [], translate_prompt = [] }) => {
  const cards = photo.map((img, idx) => ({
    id: idx + 1,
    content: translate_prompt[idx] || "프롬프트 없음",
    image: img,
    color: ["bg-blue-500", "bg-green-500", "bg-purple-500"][idx % 3]
  }));

  return (
    <div className="relative">
      <div className="h-[300vh]">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="sticky top-0 h-screen flex items-center justify-center"
            style={{ zIndex: index + 1 }}
          >
            <div
              className={`w-80 h-[500px] ${card.color} rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white transform transition-all duration-300 overflow-hidden`}
              style={{ marginTop: `${index * 20}px` }}
            >
              <img src={card.image} alt={`img-${card.id}`} className="w-full h-48 object-cover rounded-t-2xl" />
              <div className="p-4">
                <p className="text-sm text-center">{card.content}</p>
              </div>
              <div className="mt-4 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">{card.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg z-50">
        <p className="text-sm">아래로 스크롤</p>
      </div>
    </div>
  );
};

export default PhotoCard;
