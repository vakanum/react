import React from 'react';
import { useNavigate } from 'react-router-dom';

// Импортируем локальные изображения
import nadezhdaImage from '../images/sanatoriy1.jpg';
import napolbaskaImage from '../images/sanatoriy2.jpg';
import zhemchuzhinaImage from '../images/sanatoriy3.jpg';

const popularSanatoriums = [
  {
    id: 'nadezhda',
    name: 'Санаторий "Надежда"',
    image: nadezhdaImage,
    region: 'Вилейский район, Минская область',
  },
  {
    id: 'napolbaska',
    name: 'Санаторий "Наполбаская Пуща"',
    image: napolbaskaImage,
    region: 'Воложинский сельсовет, Минская область',
  },
  {
    id: 'zhemchuzhina',
    name: 'Санаторий "Жемчужина"',
    image: zhemchuzhinaImage,
    region: 'Лепельский район, Витебская область',
  },
];

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-2 md:px-4 py-8 flex flex-col items-center min-h-[70vh]">
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8">
        {/* Левая часть: контакты */}
        <div className="flex-1 flex flex-col justify-center bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 md:mb-0 transition-colors duration-200">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Хотите Связаться?</h2>
          <div className="mb-2 text-gray-800 dark:text-gray-200">
            <span className="font-semibold">Email:</span> <a href="prusskijnikita6@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">prusskijnikita6@gmail.com</a>
          </div>
          <div className="mb-4 text-gray-800 dark:text-gray-200">
            <span className="font-semibold">Номер телефона:</span> <a href="tel:+375256246344" className="text-blue-600 dark:text-blue-400 hover:underline">+375 (25) 624-63-44</a>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Оставьте свои контактные данные, и наш менеджер свяжется с вами.</p>
        </div>
        {/* Правая часть: форма */}
        <form className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-4 max-w-md mx-auto transition-colors duration-200">
          <input type="text" placeholder="Ваше имя" className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors" required />
          <input type="email" placeholder="Ваш Email" className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors" required />
          <textarea placeholder="Сообщение" className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors" required />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-2 font-semibold transition w-full">Отправить</button>
        </form>
      </div>
      {/* Популярные санатории */}
      <div className="w-full max-w-5xl mt-12">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Популярные Санатории</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularSanatoriums.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center cursor-pointer hover:shadow-lg transition rounded-lg"
              onClick={() => navigate(`/sanatoriums/${s.id}`)}
              tabIndex={0}
              role="button"
              aria-label={`Подробнее о ${s.name}`}
              onKeyDown={e => { if (e.key === 'Enter') navigate(`/sanatoriums/${s.id}`); }}
            >
              <img src={s.image} alt={s.name} className="rounded-lg shadow w-full h-36 object-cover mb-2" />
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-gray-500">{s.region}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 