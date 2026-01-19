import React from "react";
import { Bell, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-16 right-0 z-40 bg-[#2a2a2d] h-16 flex items-center justify-between px-6 border-b border-[#3a3a3d]">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-lg">🍋</span>
          </div>
          <span className="text-2xl font-bold text-[#7bff00]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            Lemonbet
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          data-testid="promotions-button"
          className="px-6 py-2 rounded-full border border-[#7bff00] text-white hover:bg-[#7bff00] hover:text-black font-semibold"
          style={{ transition: 'background-color 0.3s, color 0.3s' }}
        >
          PROMOTIONS
        </button>
        <div 
          data-testid="account-balance"
          className="px-4 py-2 rounded-full border border-[#3a3a3d] bg-[#1a1a1d] text-white flex items-center gap-2"
        >
          <span className="font-semibold">5000.00 ARS</span>
        </div>
        <button 
          data-testid="notifications-button"
          className="relative p-2 hover:bg-[#3a3a3d] rounded-full"
          style={{ transition: 'background-color 0.3s' }}
        >
          <Mail className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
