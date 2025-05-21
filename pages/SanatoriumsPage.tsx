import React from 'react';
import { useNavigate } from 'react-router-dom';

const sanatoriums = [
  { id: 'nadezhda', name: 'Надежда', number: '1-й санаторий', region: 'Вилейский район' },
  { id: 'napolbaska', name: 'Наполбаская Пуща', number: '2-й санаторий', region: 'Воложинский сельсовет' },
  { id: 'zhemchuzhina', name: 'Жемчужина', number: '3-й санаторий', region: 'Лепельский район' },
  { id: 'zubrenok', name: 'Зубрёнок', number: '4-й санаторий', region: 'Смолевичский район' },
  { id: 'zhdanovichi', name: 'Ждановичи', number: '5-й санаторий', region: 'Минский район' },
  { id: 'serebryanye-klyuchi', name: 'Серебряные Ключи', number: '6-й санаторий', region: 'Борисовский район' },
];

const SanatoriumsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-1 sm:px-2 md:px-4 py-4 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full">
        {sanatoriums.map((s) => (
          <div
            key={s.id}
            className="bg-gray-600 dark:bg-gray-700 text-white rounded-xl shadow p-4 md:p-8 flex flex-col items-center text-center hover:bg-gray-700 dark:hover:bg-gray-600 transition min-h-[160px] md:min-h-[220px] justify-center cursor-pointer"
            onClick={() => navigate(`/sanatoriums/${s.id}`)}
            tabIndex={0}
            role="button"
            aria-label={`Подробнее о ${s.name}`}
            onKeyDown={e => { if (e.key === 'Enter') navigate(`/sanatoriums/${s.id}`); }}
          >
            <div className="font-bold text-lg md:text-2xl mb-1 md:mb-2">{s.name}</div>
            <div className="text-base md:text-lg font-medium mb-1 md:mb-2">{s.number}</div>
            <div className="text-xs md:text-base text-gray-200">{s.region}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SanatoriumsPage; 