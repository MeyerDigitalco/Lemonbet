import React from "react";

const Footer = () => {
  const navLinks = ["Home", "Sport", "Casino", "Live Casino", "Crash Games", "Simple Page"];

  return (
    <footer 
      data-testid="footer"
      className="mt-12 px-12 py-8 border-t border-[#3a3a3d] bg-[#1a1a1d]"
    >
      {/* Navigation Links */}
      <div className="flex items-center justify-center gap-8 mb-6">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href="#"
            data-testid={`footer-link-${link.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm text-gray-400 hover:text-[#7bff00] font-medium"
            style={{ transition: 'color 0.3s' }}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Legal Text */}
      <div className="text-center text-xs text-gray-500 space-y-2 max-w-4xl mx-auto">
        <p>
          Representation of this site is provided for persons 18+ only. Gambling may be harmful if not controlled. Please gamble responsibly and only bet what you can afford.
        </p>
        <p>
          This site is an opportunity to make a bet on the outcome of a sporting event.
        </p>
        <p className="mt-4">
          All rights reserved and protected by law © 2025
        </p>
      </div>

      {/* Responsibility Badge */}
      <div className="flex items-center justify-center mt-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2d] rounded-lg border border-[#3a3a3d]">
          <span className="text-sm text-gray-400">Responsibility</span>
          <span className="text-lg">18+</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
