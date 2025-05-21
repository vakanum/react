import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      aria-label="Сменить тему"
      title="Сменить тему"
    >
      {theme === 'light' ? (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.343 6.343L4.929 4.929" stroke="#1F2937" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="5" stroke="#1F2937" strokeWidth="2"/></svg>
      ) : (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="#F9FAFB" strokeWidth="2"/></svg>
      )}
    </button>
  );
};

export default ThemeToggle; 