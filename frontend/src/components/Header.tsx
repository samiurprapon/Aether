import React, { useState } from "react";
import Hamburger from '../assets/images/Hamburger (1).svg';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white relative">
      {/* Hamburger Menu */}
      <button className="md:hidden" onClick={toggleMenu}>
        <img src={Hamburger} alt="Hamburger" className="w-8 h-8" />
      </button>

      {/* Logo */}
      <div className="logo-nav text-4xl md:text-[48px] font-bold">aether.</div>

      {/* Navigation links for desktop */}
      <div className="hidden md:flex gap-4">
        <button className="bg-red-400 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-500">
          Sign up
        </button>
        <button className="border-2 border-red-400 text-red-400 px-4 py-2 rounded transition duration-300 hover:bg-red-400 hover:text-white">
          Log in
        </button>
      </div>

      {/* Dropdown menu for mobile */}
      {isMenuOpen && (
        <div className="absolute left-0 top-14 w-full bg-white shadow-lg rounded-md p-4 md:hidden">
          <button className="bg-red-400 text-white px-4 py-2 rounded mb-2 transition duration-300 hover:bg-red-500 w-full">
            Sign up
          </button>
          <button className="border-2 border-red-400 text-red-400 px-4 py-2 rounded transition duration-300 hover:bg-red-400 hover:text-white w-full">
            Log in
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
