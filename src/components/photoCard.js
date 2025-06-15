import React from 'react';

const StickyCardScroll = () => {
  const cards = [
    { id: 1, title: "첫 번째 카드", color: "bg-blue-500", content: "이것은 첫 번째 카드입니다." },
    { id: 2, title: "두 번째 카드", color: "bg-green-500", content: "이것은 두 번째 카드입니다." },
    { id: 3, title: "세 번째 카드", color: "bg-purple-500", content: "이것은 세 번째 카드입니다." }
  ];

  return (
    <div className="relative">
      <div className="h-[300vh]">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="sticky top-0 h-screen flex items-center justify-center"
            style={{
              zIndex: index + 1
            }}
          >
            <div 
              className={`w-80 h-96 ${card.color} rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white transform transition-all duration-300`}
              style={{
                marginTop: `${index * 20}px`
              }}
            >
              <h2 className="text-3xl font-bold mb-4">{card.title}</h2>
              <p className="text-lg text-center px-6">{card.content}</p>
              <div className="mt-8 w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">{card.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg z-50">
        <p className="text-sm">아래로 스크롤해보세요! 👇</p>
      </div>
    </div>
  );
};

export default StickyCardScroll;