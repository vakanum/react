import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import SanatoriumList from './components/SanatoriumList';
import AboutPage from './pages/AboutPage';
import SanatoriumsPage from './pages/SanatoriumsPage';
import SanatoriumPage from './pages/SanatoriumPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function HomePage() {
  return (
    <main className="container flex-1 mx-auto px-2 md:px-4 py-6 md:py-10 w-full">
      <Hero />
      <SanatoriumList />
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <Header />
          <div className="flex-1 flex flex-col w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/sanatoriums" element={<SanatoriumsPage />} />
              <Route path="/sanatoriums/:id" element={<SanatoriumPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
