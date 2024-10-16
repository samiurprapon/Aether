import React, { useState } from "react";
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // Ensure you have the correct icon imports
import Hamburger from '../assets/images/Hamburger (1).svg'; // Adjust the path to your image

interface HeaderProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`flex justify-between items-center p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} relative`}>
      {/* Hamburger Menu */}
      <button className="md:hidden z-10" onClick={toggleMenu}>
        <img src={Hamburger} alt="Hamburger" className="w-8 h-8" />
      </button>

      {/* Logo */}
      <div className="logo-nav text-4xl md:text-[48px] font-bold">aether.</div>

      {/* Right Section: Toggle Button */}
      <div className="flex items-center gap-4">
        {/* Dark/Light Mode Toggle Button */}
        <button 
          onClick={toggleDarkMode} 
          className="flex items-center z-10"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Dropdown menu for mobile */}
      {isMenuOpen && (
        <div className={`absolute left-0 top-14 w-full shadow-lg rounded-md p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} md:hidden z-20`}>
          <button className="bg-red-400 text-white px-4 py-2 rounded mb-2 transition duration-300 hover:bg-red-500 w-full">
            Sign up
          </button>
          <button className="border-2 border-red-400 text-red-400 px-4 py-2 rounded transition duration-300 hover:bg-red-400 hover:text-white w-full">
            Log in
          </button>
        </div>
      )}

      {/* Desktop Navigation links */}
      <div className="hidden md:flex gap-4">
        <button className="bg-red-400 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-500">
          Sign up
        </button>
        <button className="border-2 border-red-400 text-red-400 px-4 py-2 rounded transition duration-300 hover:bg-red-400 hover:text-white">
          Log in
        </button>
      </div>
    </header>
  );
};

export default Header;
