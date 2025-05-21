import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-6 mt-8 border-t border-gray-200 dark:border-gray-700">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <div>©  Санатории.</div>
      <div className="flex gap-4">
        <a href="https://vk.com/feed" className="hover:text-blue-600 transition" target="_blank" rel="noopener noreferrer">ВКонтакте</a>
        <a href="https://web.telegram.org/a/" className="hover:text-blue-600 transition" target="_blank" rel="noopener noreferrer">Telegram</a>
        <a href="https://www.instagram.com/" className="hover:text-blue-600 transition" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </div>
  </footer>
);

export default Footer; 