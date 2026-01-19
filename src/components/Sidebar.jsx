import React from "react";
import { Home, Trophy, Gamepad2, Box, Gift, Zap } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Trophy, label: "Sport" },
    { icon: Gamepad2, label: "Casino" },
    { icon: Box, label: "Slots" },
    { icon: Gift, label: "Promotions" },
    { icon: Zap, label: "Fast Games" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-[#2a2a2d] border-r border-[#3a3a3d] flex flex-col items-center py-6 z-50">
      <div className="flex flex-col gap-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            data-testid={`sidebar-${item.label.toLowerCase()}`}
            className={`p-3 rounded-lg ${
              item.active
                ? "bg-[#7bff00] text-black"
                : "text-gray-400 hover:bg-[#3a3a3d] hover:text-white"
            }`}
            style={{ transition: 'background-color 0.3s, color 0.3s' }}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </div>

      <div className="mt-auto">
        <button 
          data-testid="language-selector"
          className="p-2 hover:bg-[#3a3a3d] rounded-lg"
          style={{ transition: 'background-color 0.3s' }}
        >
          <span className="text-xl">🇬🇧</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
