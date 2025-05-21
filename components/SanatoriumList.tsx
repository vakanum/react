import React from 'react';
import SanatoriumCard from './SanatoriumCard';
import nadezhdaImage from '../images/sanatoriy1.jpg';
import napolbaskaImage from '../images/sanatoriy2.jpg';
import zhemchuzhinaImage from '../images/sanatoriy3.jpg';
import zubrenokImage from '../images/sanatoriy4.jpg';
import zhdanovichiImage from '../images/sanatoriy5.jpg';
import serebryanyeKlyuchiImage from '../images/sanatoriy6.jpg';

const sanatoriums = [
  {
    id: 'nadezhda',
    name: 'Санаторий "Надежда"',
    image: nadezhdaImage,
  },
  {
    id: 'napolbaska',
    name: 'Санаторий "Наполбаская Пуща"',
    image: napolbaskaImage,
  },
  {
    id: 'zhemchuzhina',
    name: 'Санаторий "Жемчужина"',
    image: zhemchuzhinaImage,
  },
  {
    id: 'zubrenok',
    name: 'Санаторий "Рубёнок"',
    image: zubrenokImage,
  },
  {
    id: 'zhdanovichi',
    name: 'Санаторий "Ждановичи"',
    image: zhdanovichiImage,
  },
  {
    id: 'serebryanye-klyuchi',
    name: 'Санаторий "Серебряные Ключи"',
    image: serebryanyeKlyuchiImage,
  },
];

const SanatoriumList: React.FC = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {sanatoriums.map((s) => (
      <SanatoriumCard key={s.id} id={s.id} name={s.name} image={s.image} />
    ))}
  </section>
);

export default SanatoriumList;