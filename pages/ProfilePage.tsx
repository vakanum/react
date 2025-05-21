import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

// Импортируем данные о санаториях для расчёта цен
import nadezhdaImage from '../images/sanatoriy1.jpg';
import napolbaskaImage from '../images/sanatoriy2.jpg';
import zhemchuzhinaImage from '../images/sanatoriy3.jpg';
import zubrenokImage from '../images/sanatoriy4.jpg';
import zhdanovichiImage from '../images/sanatoriy5.jpg';
import serebryanyeKlyuchiImage from '../images/sanatoriy6.jpg';

const sanatoriumsData = [
  {
    id: 'nadezhda',
    price: 50,
  },
  {
    id: 'napolbaska',
    price: 45,
  },
  {
    id: 'zhemchuzhina',
    price: 60,
  },
  {
    id: 'zubrenok',
    price: 55,
  },
  {
    id: 'zhdanovichi',
    price: 48,
  },
  {
    id: 'serebryanye-klyuchi',
    price: 52,
  },
];

function getPricePerDay(sanId: string) {
  const san = sanatoriumsData.find(s => s.id === sanId);
  return san ? san.price : 0;
}
function getDaysCount(checkIn: string, checkOut: string) {
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  return Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
}

interface Booking {
  id: string;
  sanatoriumName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface User {
  email: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  bookings: Booking[];
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'bookings'>('info');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [editData, setEditData] = useState({ name: '', surname: '', email: '', phone: '' });
  const [editMode, setEditMode] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

  // Получить пользователей из localStorage
  const getUsers = (): User[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };
  // Сохранить пользователей
  const setUsers = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Получить текущего пользователя по email
  const getCurrentUser = (): User | null => {
    const email = localStorage.getItem('currentUserEmail');
    if (!email) return null;
    const users = getUsers();
    return users.find(u => u.email === email) || null;
  };

  // Сессия: при загрузке страницы
  useEffect(() => {
    const current = getCurrentUser();
    if (current) {
      setIsAuthenticated(true);
      setUser(current);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  // Загружаем аватар из localStorage при инициализации
  useEffect(() => {
    const saved = localStorage.getItem('profileAvatar');
    if (saved) setAvatar(saved);
  }, []);

  // Обработчик выбора файла
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setAvatar(result);
        localStorage.setItem('profileAvatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  // После успешной авторизации — обновить user
  const handleAuthSuccess = () => {
    const current = getCurrentUser();
    setIsAuthenticated(!!current);
    setUser(current);
  };

  // Выход
  const handleLogout = () => {
    localStorage.removeItem('currentUserEmail');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Добавление новой путёвки (если есть newBooking)
  useEffect(() => {
    const newBooking = localStorage.getItem('newBooking');
    if (newBooking && user) {
      const booking: Booking = JSON.parse(newBooking);
      const users = getUsers();
      const idx = users.findIndex(u => u.email === user.email);
      if (idx !== -1) {
        users[idx].bookings = [booking, ...users[idx].bookings];
        setUsers(users);
        setUser(users[idx]);
      }
      localStorage.removeItem('newBooking');
      setActiveTab('bookings');
    }
    // eslint-disable-next-line
  }, [user]);

  // Удаление путёвки
  const handleDeleteBooking = (id: string) => {
    if (!user) return;
    const users = getUsers();
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx].bookings = users[idx].bookings.filter(b => b.id !== id);
      setUsers(users);
      setUser(users[idx]);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const users = getUsers();
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx] = {
        ...users[idx],
        name: editData.name,
        surname: editData.surname,
        email: editData.email,
        phone: editData.phone,
      };
      setUsers(users);
      setUser(users[idx]);
      localStorage.setItem('currentUserEmail', editData.email);
      setEditMode(false);
      setSaveMsg('Изменения сохранены!');
      setTimeout(() => setSaveMsg(''), 2000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-1 sm:px-2 md:px-4 py-4 sm:py-8">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Личный кабинет</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Для доступа к личному кабинету необходимо войти в систему
          </p>
          <button
            onClick={() => setShowAuthForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Войти
          </button>
        </div>
        {showAuthForm && (
          <AuthForm onClose={() => setShowAuthForm(false)} onAuthSuccess={handleAuthSuccess} />
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-1 sm:px-2 md:px-4 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative group cursor-pointer" onClick={() => document.getElementById('avatarInput')?.click()} title="Изменить фото">
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-24 h-24 object-cover rounded-full" />
            ) : (
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
            <input id="avatarInput" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            <span className="absolute bottom-1 right-1 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 opacity-80 group-hover:opacity-100 transition">Изм.</span>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{user?.name} {user?.surname}</h1>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.phone}</p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md transition"
          >
            Выйти
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'info'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Личная информация
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            Мои бронирования
          </button>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          {activeTab === 'info' && user && (
            <form className="space-y-4" onSubmit={handleSaveProfile}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Имя</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md ${editMode ? 'bg-white dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-900'} text-gray-700 dark:text-gray-100 transition-colors`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Фамилия</label>
                <input
                  type="text"
                  name="surname"
                  value={editData.surname}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md ${editMode ? 'bg-white dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-900'} text-gray-700 dark:text-gray-100 transition-colors`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md ${editMode ? 'bg-white dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-900'} text-gray-700 dark:text-gray-100 transition-colors`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md ${editMode ? 'bg-white dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-900'} text-gray-700 dark:text-gray-100 transition-colors`}
                />
              </div>
              {editMode ? (
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">Сохранить</button>
                  <button type="button" onClick={() => { setEditMode(false); setEditData({ name: user.name, surname: user.surname, email: user.email, phone: user.phone }); }} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md transition">Отмена</button>
                </div>
              ) : (
                <button type="button" onClick={() => setEditMode(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">Редактировать</button>
              )}
              {saveMsg && <div className="text-green-600 text-sm mt-2">{saveMsg}</div>}
            </form>
          )}

          {activeTab === 'bookings' && user && (
            <div className="space-y-4">
              {user.bookings.length === 0 && (
                <div className="text-gray-500 dark:text-gray-400 text-center">У вас пока нет бронирований.</div>
              )}
              {user.bookings.map((booking) => {
                const pricePerDay = getPricePerDay(booking.id);
                const days = getDaysCount(booking.checkIn, booking.checkOut);
                const total = pricePerDay * days * booking.guests;
                return (
                  <div
                    key={booking.id + booking.checkIn + booking.checkOut}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 transition-colors duration-200"
                  >
                    <div>
                      <h3 className="font-medium text-lg text-white dark:text-gray-100 transition-colors">{booking.sanatoriumName}</h3>
                      <p className="text-sm text-gray-400 dark:text-gray-300 transition-colors">
                        {booking.checkIn} - {booking.checkOut} | Гостей: {booking.guests}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-200 mt-1">
                        Цена за путёвку: <span className="font-semibold">{total} BYN</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <NavLink
                        to={`/sanatoriums/${booking.id}`}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
                      >
                        Подробнее
                      </NavLink>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                );
              })}
              {/* Общая сумма за все путёвки */}
              {user.bookings.length > 0 && (
                <div className="text-right text-lg font-semibold text-blue-700 dark:text-blue-300 mt-4">
                  Общая сумма: {user.bookings.reduce((sum, booking) => {
                    const pricePerDay = getPricePerDay(booking.id);
                    const days = getDaysCount(booking.checkIn, booking.checkOut);
                    return sum + pricePerDay * days * booking.guests;
                  }, 0)} BYN
                </div>
              )}
              <button
                onClick={() => navigate('/sanatoriums')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition mt-4"
              >
                Оформить новую путёвку
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 