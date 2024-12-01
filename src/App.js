import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import ProductsPage from './ProductsPage';
import { PageTransition } from './components/PageTransition';
import { NotFound } from './components/NotFound';
import HomePage from './components/HomePage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <PageTransition isDarkMode={isDarkMode}>
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/products/:collection" element={<ProductsPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </PageTransition>
    </Router>
  );
}

export default App;

