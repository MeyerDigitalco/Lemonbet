import React from "react";

const providers = [
  { name: "Mancala Gaming", logo: "🎮" },
  { name: "Vimplay", logo: "🎯" },
  { name: "Pragmatic Play", logo: "🎪" },
  { name: "Galaxsys", logo: "🌌" },
  { name: "Infinibet", logo: "♾️" },
  { name: "TeDa Gaming", logo: "🎲" },
  { name: "Upgaming", logo: "⬆️" },
  { name: "Zugi", logo: "🎨" },
  { name: "Hacksaw Gaming", logo: "🪚" },
  { name: "Holi Gaming", logo: "🎭" }
];

const ProvidersSection = () => {
  return (
    <section 
      data-testid="providers-section"
      className="px-12 py-6 border-t border-[#3a3a3d]"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Providers
        </h2>
        <button 
          data-testid="providers-show-all"
          className="text-sm text-gray-400 hover:text-[#7bff00] font-semibold"
          style={{ transition: 'color 0.3s' }}
        >
          SHOW ALL
        </button>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {providers.map((provider, index) => (
          <div
            key={index}
            data-testid={`provider-${index}`}
            className="flex-shrink-0 px-6 py-3 bg-[#2a2a2d] border border-[#3a3a3d] rounded-lg hover:border-[#7bff00] cursor-pointer flex items-center gap-3"
            style={{ transition: 'border-color 0.3s' }}
          >
            <span className="text-2xl">{provider.logo}</span>
            <span className="text-sm font-medium text-white whitespace-nowrap">
              {provider.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProvidersSection;
