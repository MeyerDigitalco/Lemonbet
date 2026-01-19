import React from "react";

const slotGames = [
  { name: "Pool Star", provider: "Pragmatic", image: "https://images.unsplash.com/photo-1566563255308-753861417000?w=300", rtp: "96.5%" },
  { name: "Gems Bonanza", provider: "Pragmatic", image: "https://images.unsplash.com/photo-1757581560364-fa82a3bd094e?w=300", rtp: "96.8%" },
  { name: "Bang Bang", provider: "TeDa", image: "https://images.unsplash.com/photo-1643297854500-9ab373b39422?w=300", rtp: "95.2%" },
  { name: "Hot Coin", provider: "Mancala", image: "https://images.unsplash.com/photo-1768201493980-95066d0949a1?w=300", rtp: "96.1%" },
  { name: "Cash Me", provider: "Hacksaw", image: "https://images.unsplash.com/photo-1566563255308-753861417000?w=300", rtp: "96.3%" },
  { name: "Western Gold", provider: "Pragmatic", image: "https://images.unsplash.com/photo-1757581560364-fa82a3bd094e?w=300", rtp: "96.7%" },
  { name: "Cocorico", provider: "Vimplay", image: "https://images.unsplash.com/photo-1643297854500-9ab373b39422?w=300", rtp: "95.9%" },
  { name: "Book of Zombies", provider: "Galaxsys", image: "https://images.unsplash.com/photo-1768201493980-95066d0949a1?w=300", rtp: "96.4%" },
  { name: "Coin Odyssey", provider: "Zugi", image: "https://images.unsplash.com/photo-1566563255308-753861417000?w=300", rtp: "96.0%" },
  { name: "Lucky Cash", provider: "Holi", image: "https://images.unsplash.com/photo-1757581560364-fa82a3bd094e?w=300", rtp: "95.8%" },
  { name: "Joker Madness", provider: "Pragmatic", image: "https://images.unsplash.com/photo-1643297854500-9ab373b39422?w=300", rtp: "96.5%" },
  { name: "Maya Treasures", provider: "TeDa", image: "https://images.unsplash.com/photo-1768201493980-95066d0949a1?w=300", rtp: "96.2%" }
];

const TopSlots = () => {
  return (
    <section 
      data-testid="top-slots-section"
      className="px-12 py-8 border-t border-[#3a3a3d]"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Top Slots
        </h2>
        <button 
          data-testid="top-slots-show-all"
          className="text-sm text-gray-400 hover:text-[#7bff00] font-semibold px-4 py-2 border border-[#3a3a3d] rounded-lg hover:border-[#7bff00]"
          style={{ transition: 'all 0.3s' }}
        >
          SHOW ALL
        </button>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {slotGames.map((game, index) => (
          <div
            key={index}
            data-testid={`slot-game-${index}`}
            className="group cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden bg-[#2a2a2d] border border-[#3a3a3d] hover:border-[#7bff00] aspect-square mb-2" style={{ transition: 'all 0.3s' }}>
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover group-hover:scale-110"
                style={{ transition: 'transform 0.3s' }}
              />
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-[#7bff00]">
                {game.rtp}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center" style={{ transition: 'opacity 0.3s' }}>
                <button className="px-4 py-2 bg-[#7bff00] text-black font-bold rounded-lg hover:scale-110" style={{ transition: 'transform 0.3s' }}>
                  PLAY
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

export default TopSlots;
