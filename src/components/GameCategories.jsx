import React from "react";

const categories = [
  {
    title: "Sport",
    subtitle: "Betting",
    icon: "⚽",
    gradient: "from-green-500 to-green-600"
  },
  {
    title: "Live",
    subtitle: "Casino",
    icon: "🎰",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Slot",
    subtitle: "Games",
    icon: "🎲",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Fast",
    subtitle: "Games",
    icon: "🚀",
    gradient: "from-cyan-500 to-blue-500"
  }
];

const GameCategories = () => {
  return (
    <section 
      data-testid="game-categories"
      className="px-12 py-8"
    >
      <div className="grid grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            data-testid={`category-${category.title.toLowerCase()}`}
            className="relative group cursor-pointer rounded-2xl overflow-hidden h-40 bg-gradient-to-br from-[#2a2a2d] to-[#1a1a1d] border border-[#3a3a3d] hover:border-[#7bff00] hover:scale-105"
            style={{ transition: 'all 0.3s' }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20`} style={{ transition: 'opacity 0.3s' }} />
            
            <div className="relative h-full flex flex-col items-center justify-center gap-2 p-6">
              <div className="text-6xl mb-2 group-hover:scale-110" style={{ transition: 'transform 0.3s' }}>
                {category.icon}
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {category.title}
                </h3>
                <p className="text-xl font-semibold text-[#7bff00]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {category.subtitle}
                </p>
              </div>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#7bff00]/5" style={{ transition: 'opacity 0.3s' }} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameCategories;
