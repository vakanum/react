import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SanatoriumCardProps {
  id: string;
  name: string;
  image: string;
}

const SanatoriumCard: React.FC<SanatoriumCardProps> = ({ id, name, image }) => {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-lg overflow-hidden shadow hover:shadow-lg transition group bg-white dark:bg-gray-800 cursor-pointer"
      onClick={() => navigate(`/sanatoriums/${id}`)}
      tabIndex={0}
      role="button"
      aria-label={`Подробнее о ${name}`}
      onKeyDown={e => { if (e.key === 'Enter') navigate(`/sanatoriums/${id}`); }}
    >
      <div className="h-32 md:h-36 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 text-center text-gray-800 dark:text-gray-100 font-medium text-sm md:text-base">
        {name}
      </div>
    </div>
  );
};

export default SanatoriumCard; 