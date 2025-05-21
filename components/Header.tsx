import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm py-3 px-2 sm:px-4 flex items-center justify-between relative z-20">
      <div className="flex items-center gap-4 sm:gap-10">
        {/* Логотип */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
          {/* SVG-заглушка */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="15" stroke="#3B82F6" strokeWidth="2"/><path d="M10 20C14 10 22 10 22 20" stroke="#3B82F6" strokeWidth="2"/></svg>
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 sm:gap-8 text-gray-700 dark:text-gray-200 text-base">
          <NavLink to="/" className={({isActive}) => isActive ? 'font-semibold text-blue-600' : 'hover:text-blue-600 transition'}>Главная</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'font-semibold text-blue-600' : 'hover:text-blue-600 transition'}>О нас</NavLink>
          <NavLink to="/sanatoriums" className={({isActive}) => isActive ? 'font-semibold text-blue-600' : 'hover:text-blue-600 transition'}>Список санаториев</NavLink>
        </nav>
      </div>
      {/* Desktop buttons */}
      <div className="hidden md:flex items-center gap-4">
        <NavLink to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded transition text-sm sm:text-base font-medium whitespace-nowrap">Задать вопрос</NavLink>
        <NavLink to="/profile" className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 text-blue-600 dark:text-white px-3 sm:px-4 py-2 rounded transition font-medium whitespace-nowrap text-sm sm:text-base">Личный кабинет</NavLink>
        <ThemeToggle />
      </div>
      {/* Burger for mobile */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Открыть меню"
      >
        <span className="sr-only">Открыть меню</span>
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center py-4 gap-2 md:hidden animate-fade-in z-30">
          <NavLink to="/" className={({isActive}) => (isActive ? 'font-semibold text-blue-400' : 'text-gray-900 dark:text-white hover:text-blue-400 transition')} onClick={() => setMenuOpen(false)}>Главная</NavLink>
          <NavLink to="/about" className={({isActive}) => (isActive ? 'font-semibold text-blue-400' : 'text-gray-900 dark:text-white hover:text-blue-400 transition')} onClick={() => setMenuOpen(false)}>О нас</NavLink>
          <NavLink to="/sanatoriums" className={({isActive}) => (isActive ? 'font-semibold text-blue-400' : 'text-gray-900 dark:text-white hover:text-blue-400 transition')} onClick={() => setMenuOpen(false)}>Список санаториев</NavLink>
          <NavLink to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition w-11/12 max-w-xs text-center font-medium" onClick={() => setMenuOpen(false)}>Задать вопрос</NavLink>
          <NavLink to="/profile" className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 text-blue-600 dark:text-white px-4 py-2 rounded transition font-medium w-11/12 max-w-xs text-center" onClick={() => setMenuOpen(false)}>Личный кабинет</NavLink>
          <div className="mt-2"><ThemeToggle /></div>
        </div>
      )}
    </header>
  );
};

export default Header; 