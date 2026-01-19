import React from "react";

const liveGames = [
  { name: "Sakura Roulette", provider: "Ezugi", image: "https://images.unsplash.com/photo-1592602944193-0848995f4b5a?w=300", live: true },
  { name: "Arabic Roulette", provider: "Evolution", image: "https://images.unsplash.com/photo-1625888791210-40ea41c1d0f3?w=300", live: true },
  { name: "Royal Roulette", provider: "Pragmatic", image: "https://images.unsplash.com/photo-1766711081731-3f1d0de7fd98?w=300", live: true },
  { name: "Techno Auto", provider: "Vivo", image: "https://images.unsplash.com/photo-1759701547315-cc8b7f2100f3?w=300", live: true },
  { name: "Replay Roulette", provider: "Evolution", image: "https://images.unsplash.com/photo-1592602944193-0848995f4b5a?w=300", live: true },
  { name: "Blackjack Pro", provider: "Ezugi", image: "https://images.unsplash.com/photo-1625888791210-40ea41c1d0f3?w=300", live: true },
  { name: "Monaco Roulette", provider: "Pragmatic", image: "https://images.unsplash.com/photo-1766711081731-3f1d0de7fd98?w=300", live: true },
  { name: "Live Casino", provider: "Evolution", image: "https://images.unsplash.com/photo-1759701547315-cc8b7f2100f3?w=300", live: true },
  { name: "Russian Baccarat", provider: "Ezugi", image: "https://images.unsplash.com/photo-1592602944193-0848995f4b5a?w=300", live: true },
  { name: "Cricket Live", provider: "Vivo", image: "https://images.unsplash.com/photo-1625888791210-40ea41c1d0f3?w=300", live: true },
  { name: "Sic Bo Live", provider: "Pragmatic", image: "https://images.unsplash.com/photo-1766711081731-3f1d0de7fd98?w=300", live: true },
  { name: "Gold Roulette", provider: "Evolution", image: "https://images.unsplash.com/photo-1759701547315-cc8b7f2100f3?w=300", live: true }
];

const TopLive = () => {
  return (
    <section 
      data-testid="top-live-section"
      className="px-12 py-8 border-t border-[#3a3a3d]"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Top Live
        </h2>
        <button 
          data-testid="top-live-show-all"
          className="text-sm text-gray-400 hover:text-[#7bff00] font-semibold px-4 py-2 border border-[#3a3a3d] rounded-lg hover:border-[#7bff00]"
          style={{ transition: 'all 0.3s' }}
        >
          SHOW ALL
        </button>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {liveGames.map((game, index) => (
          <div
            key={index}
            data-testid={`live-game-${index}`}
            className="group cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden bg-[#2a2a2d] border border-[#3a3a3d] hover:border-[#7bff00] aspect-square mb-2" style={{ transition: 'all 0.3s' }}>
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover group-hover:scale-110"
                style={{ transition: 'transform 0.3s' }}
              />
              {game.live && (
                <div className="absolute top-2 right-2 bg-red-600 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  LIVE
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center" style={{ transition: 'opacity 0.3s' }}>
                <button className="px-4 py-2 bg-[#7bff00] text-black font-bold rounded-lg hover:scale-110" style={{ transition: 'transform 0.3s' }}>
                  JOIN
                </button>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">{game.name}</h3>
            <p className="text-xs text-gray-400">{game.provider}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopLive;
