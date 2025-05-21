import React from 'react';
import mainImage from '../images/main.jpg'; 

const Hero: React.FC = () => (
  <section className="w-full rounded-lg overflow-hidden mb-8 relative h-56 md:h-72 lg:h-80 flex items-center justify-center">
    <img
      src={mainImage} 
      alt="Санаторий"
      className="absolute inset-0 w-full h-full object-cover object-center brightness-75"
    />
    <div className="relative z-10 text-white text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">Санатории</h1>
      <p className="text-lg md:text-2xl font-medium drop-shadow">Быстро, Удобно, Недорого</p>
    </div>
  </section>
);

export default Hero;