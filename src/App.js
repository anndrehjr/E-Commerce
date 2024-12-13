import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CartProvider } from './context/CartContext';
import ProductsPage from './ProductsPage';
import { PageTransition } from './components/PageTransition';
import { NotFound } from './components/NotFound';
import HomePage from './components/HomePage';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';



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
    <AuthProvider>
    <ThemeProvider>
    <CartProvider>
      <Router>
        <Helmet>
          <title>Personalizados Aguiar - Produtos Únicos e Especiais</title>
          <meta name="description" content="Descubra produtos personalizados únicos na Personalizados Aguiar. Agendas, canecas, presentes e muito mais para tornar seu dia especial." />
          <meta name="keywords" content="personalizados aguiar, produtos personalizados, agendas, canecas, presentes" />
          <link rel="canonical" href="https://personalizadosaguiar.netlify.app" />
          <meta property="og:title" content="Personalizados Aguiar - Produtos Únicos e Especiais" />
          <meta property="og:description" content="Descubra produtos personalizados únicos na Personalizados Aguiar. Agendas, canecas, presentes e muito mais para tornar seu dia especial." />
          <meta property="og:url" content="https://personalizadosaguiar.netlify.app" />
          <meta property="og:type" content="website" />
        </Helmet>
        <PageTransition isDarkMode={isDarkMode}>
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/products/:collection" element={<ProductsPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </PageTransition>
      </Router>
    </CartProvider>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

