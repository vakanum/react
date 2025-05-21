import React from 'react';
import SanatoriumCard from '../components/SanatoriumCard';
import { NavLink } from 'react-router-dom';

// Импортируем локальные изображения
import nadezhdaImage from '../images/sanatoriy1.jpg';
import napolbaskaImage from '../images/sanatoriy2.jpg';
import zhemchuzhinaImage from '../images/sanatoriy3.jpg';
import aboutUsImage from '../images/about.jpg';

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

const AboutPage: React.FC = () => (
  <div className="container mx-auto px-1 sm:px-2 md:px-4 py-4 sm:py-8">
    <div className="flex flex-col md:flex-row gap-4 sm:gap-8 items-center mb-6 sm:mb-10">
      <div className="flex-1 w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Идеальный выбор для здоровья: ваш гид по санаториям для идеального отдыха</h2>
        <p className="mb-4 text-gray-900 dark:text-gray-500 text-sm sm:text-base">
          Сайт представляет всю необходимую информацию о различных санаториях: от расположения и услуг до отзывов посетителей и цен. Пользователи могут легко сравнивать различные варианты, чтобы выбрать наиболее подходящий для своих потребностей.<br /><br />
          Благодаря этому люди экономят время и находят комфортное место для оздоровления и отдыха.
        </p>
        <NavLink to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 rounded transition mb-4 text-sm sm:text-base inline-block">Задать вопрос</NavLink>
      </div>
      <div className="flex-1 flex justify-center w-full">
        <img src={aboutUsImage} alt="About us" className="max-w-[180px] sm:max-w-xs md:max-w-sm rounded-lg shadow" />
      </div>
    </div>
    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Популярные санатории</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
      {popularSanatoriums.map((s) => (
        <div key={s.id}>
          <SanatoriumCard id={s.id} name={s.name} image={s.image} />
          <div className="text-center text-gray-500 dark:text-gray-400 text-xs mt-1">{s.region}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AboutPage;