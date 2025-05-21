import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import nadezhdaImage from '../images/sanatoriy1.jpg';
import napolbaskaImage from '../images/sanatoriy2.jpg';
import zhemchuzhinaImage from '../images/sanatoriy3.jpg';
import zubrenokImage from '../images/sanatoriy4.jpg';
import zhdanovichiImage from '../images/sanatoriy5.jpg';
import serebryanyeKlyuchiImage from '../images/sanatoriy6.jpg';
interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
}

const sanatoriums = [
  {
    id: 'nadezhda',
    name: 'Санаторий "Надежда"',
    image: nadezhdaImage,
    description: 'ДРОЦ Надежда — современный центр для детского и семейного отдыха, расположен в живописном сосновом бору у Вилейского водохранилища. Здесь созданы все условия для восстановления и оздоровления.',
    info: 'ДРОЦ Надежда — Общая Информация:',
    details: 'Год основания — 1984 (реконструкция — 2016). Категория: высшая. Количество мест: 232. Площадь: 12 га. В наличии бассейн, спортзал, игровые площадки, библиотека, кинозал, Wi-Fi.',
    stats: [
      { icon: '👨‍👩‍👧‍👦', label: 'Кол-во мест', value: '232' },
      { icon: '📅', label: 'Кол-во дней', value: '12-24' },
      { icon: '💸', label: 'Цена (сутки, 1 чел.)', value: 'от 50 BYN' },
    ],
  },
  {
    id: 'napolbaska',
    name: 'Санаторий "Наполбаская Пуща"',
    image: napolbaskaImage,
    description: 'Наполбаская Пуща — уютный санаторий в окружении вековых сосен. Идеален для семейного отдыха и реабилитации детей. На территории — озеро, спортивные площадки, мини-зоопарк.',
    info: 'Наполбаская Пуща — Общая Информация:',
    details: 'Год основания — 1992. Категория: первая. Количество мест: 180. Площадь: 10 га. В наличии бассейн, спортзал, мини-зоопарк, Wi-Fi.',
    stats: [
      { icon: '👨‍👩‍👧‍👦', label: 'Кол-во мест', value: '180' },
      { icon: '📅', label: 'Кол-во дней', value: '10-21' },
      { icon: '💸', label: 'Цена (сутки, 1 чел.)', value: 'от 45 BYN' },
    ],
  },
  {
    id: 'zhemchuzhina',
    name: 'Санаторий "Жемчужина"',
    image: zhemchuzhinaImage,
    description: 'Жемчужина — современный санаторий на берегу озера. Здесь можно пройти курс оздоровления, насладиться природой и активным отдыхом.',
    info: 'Жемчужина — Общая Информация:',
    details: 'Год основания — 2001. Категория: высшая. Количество мест: 210. Площадь: 15 га. В наличии бассейн, тренажерный зал, теннисные корты, Wi-Fi.',
    stats: [
      { icon: '👨‍👩‍👧‍👦', label: 'Кол-во мест', value: '210' },
      { icon: '📅', label: 'Кол-во дней', value: '14-28' },
      { icon: '💸', label: 'Цена (сутки, 1 чел.)', value: 'от 60 BYN' },
    ],
  },
  {
    id: 'zubrenok',
    name: 'Санаторий "Зубрёнок"',
    image: zubrenokImage,
    description: 'Зубрёнок — детский санаторий с уникальной программой оздоровления и творческого развития. Расположен в экологически чистом районе.',
    info: 'Зубрёнок — Общая Информация:',
    details: 'Год основания — 1988. Категория: высшая. Количество мест: 250. Площадь: 13 га. В наличии бассейн, спортзал, кружки, Wi-Fi.',
    stats: [
      { icon: '👨‍👩‍👧‍👦', label: 'Кол-во мест', value: '250' },
      { icon: '📅', label: 'Кол-во дней', value: '14-21' },
      { icon: '💸', label: 'Цена (сутки, 1 чел.)', value: 'от 55 BYN' },
    ],
  },
  {
    id: 'zhdanovichi',
    name: 'Санаторий "Ждановичи"',
    image: zhdanovichiImage,
    description: 'Ждановичи — санаторий для всей семьи с развитой инфраструктурой и современными медицинскими услугами. Находится вблизи Минска.',
    info: 'Ждановичи — Общая Информация:',
    details: 'Год основания — 1995. Категория: первая. Количество мест: 170. Площадь: 9 га. В наличии бассейн, спортзал, детские площадки, Wi-Fi.',
    stats: [
      { icon: '👨‍👩‍👧‍👦', label: 'Кол-во мест', value: '170' },
      { icon: '📅', label: 'Кол-во дней', value: '10-20' },
      { icon: '💸', label: 'Цена (сутки, 1 чел.)', value: 'от 48 BYN' },
    ],
  },
  {
    id: 'serebryanye-klyuchi',
    name: 'Санаторий "Серебряные Ключи"',
    image: serebryanyeKlyuchiImage,
    description: 'Серебряные Ключи — санаторий в лесном массиве с минеральными источниками. Отличный выбор для профилактики и лечения.',
    info: 'Серебряные Ключи — Общая Информация:',
    details: 'Год основания — 2005. Категория: высшая. Количество мест: 140. Площадь: 8 га. В наличии бассейн, лечебные процедуры, Wi-Fi.',
    stats: [
      { icon: '👨‍👩‍👧‍👦', label: 'Кол-во мест', value: '140' },
      { icon: '📅', label: 'Кол-во дней', value: '12-18' },
      { icon: '💸', label: 'Цена (сутки, 1 чел.)', value: 'от 52 BYN' },
    ],
  },
];

const SanatoriumPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const san = sanatoriums.find(s => s.id === id) || sanatoriums[0];

  const getMinMaxDays = (daysStr: string) => {
    const [min, max] = daysStr.split('-').map(Number);
    return { min, max };
  };
  const getPricePerDay = (priceStr: string) => {
    const match = priceStr.match(/(\d+)/);
    return match ? Number(match[1]) : 0;
  };
  const daysRange = getMinMaxDays(san.stats.find(s => s.label === 'Кол-во дней')?.value || '1-1');
  const pricePerDay = getPricePerDay(san.stats.find(s => s.label.includes('Цена'))?.value || '0');
  const [totalPrice, setTotalPrice] = useState(0);
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const d1 = new Date(bookingData.checkIn);
      const d2 = new Date(bookingData.checkOut);
      const days = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
      if (days < daysRange.min || days > daysRange.max) {
        setDateError(`Можно выбрать только от ${daysRange.min} до ${daysRange.max} дней проживания.`);
      } else {
        setDateError('');
      }
    } else {
      setDateError('');
    }
  }, [bookingData, daysRange]);

  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const d1 = new Date(bookingData.checkIn);
      const d2 = new Date(bookingData.checkOut);
      const days = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
      setTotalPrice(days * pricePerDay * bookingData.guests);
    } else {
      setTotalPrice(0);
    }
  }, [bookingData, pricePerDay]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Сохраняем новую путёвку в localStorage
    const newBooking = {
      id: san.id,
      sanatoriumName: san.name,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
    };
    localStorage.setItem('newBooking', JSON.stringify(newBooking));
    navigate('/profile');
  };

  return (
    <div className="container mx-auto px-1 sm:px-2 md:px-4 py-4 sm:py-8">
      <div className="flex flex-col md:flex-row gap-6 mb-6 items-center md:items-stretch h-full">
        <img src={san.image} alt={san.name} className="w-full max-w-xs md:max-w-sm rounded-lg shadow mx-auto h-full object-cover" />
        <div className="flex-1 w-full flex flex-col justify-between h-full p-2 md:p-4 bg-white dark:bg-gray-800 rounded-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-left text-gray-900 dark:text-white">{san.name}</h1>
          <p className="mb-2 text-gray-500 dark:text-gray-300 text-sm sm:text-base">{san.description}</p>
          <div className="font-semibold mb-1 text-gray-800 dark:text-gray-200">{san.info}</div>
          <p className="mb-4 text-xs sm:text-sm text-gray-700 dark:text-gray-200">{san.details}</p>
          <div className="flex gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <span className="font-medium">Мест:</span>
              <span>{san.stats.find(s => s.label === 'Кол-во мест')?.value}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
              <span className="text-2xl">📅</span>
              <span className="font-medium">Дней:</span>
              <span>{san.stats.find(s => s.label === 'Кол-во дней')?.value}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
              <span className="text-2xl">💸</span>
              <span className="font-medium">Цена/сутки:</span>
              <span>{pricePerDay} BYN</span>
            </div>
          </div>
          <button 
            onClick={() => setShowBookingForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition font-semibold text-base w-fit self-start mt-auto"
          >
            Оформить путёвку
          </button>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Оформление путёвки</h2>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Дата заезда
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={bookingData.checkIn}
                  onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Дата выезда
                </label>
                <input
                  type="date"
                  required
                  min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Количество гостей
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-lg font-bold"
                    onClick={() => setBookingData(data => ({ ...data, guests: Math.max(1, data.guests - 1) }))}
                    aria-label="Уменьшить количество гостей"
                  >-</button>
                  <span className="min-w-[2.5em] text-center text-base">{bookingData.guests}</span>
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-lg font-bold"
                    onClick={() => setBookingData(data => ({ ...data, guests: Math.min(500, data.guests + 1) }))}
                    aria-label="Увеличить количество гостей"
                  >+</button>
                </div>
              </div>
              {dateError && (
                <div className="text-red-600 text-sm text-center mb-2">{dateError}</div>
              )}
              {totalPrice > 0 && (
                <div className="text-lg font-semibold text-center text-blue-700 dark:text-blue-300 mb-2">
                  Итоговая сумма: {totalPrice} BYN
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                disabled={!!dateError}
              >
                Подтвердить бронирование
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SanatoriumPage; 