import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Moon, Sun, Instagram, PhoneIcon as WhatsApp } from 'lucide-react';
import ProductsPage from './ProductsPage';

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

  const collections = [
    { title: "Agendas & Cadernos", image: "/agendas/1.png?height=300&width=300", slug: "cadernos" },
    { title: "Kit Presente", image: "/kitpresente/kit-presente.webp?height=300&width=300", slug: "presente" },
    { title: "Canecas", image: "/canecas/Imagem frontal.png?height=300&width=300", slug: "canecas" },
    { title: "Adesivos", image: "/adesivos/adesivo.webp?height=300&width=300", slug: "adesivos" },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
            <div className="dark:bg-black transition-colors duration-200 min-h-screen">
              {/* Social Media Sidebar */}
              <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
                <a
                  href="https://wa.me/0188996798352?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços."
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=16712&format=png&color=000000"
                    alt="Ícone WhatsApp"
                    className="w-5 h-5"
                  />
                </a>

                <a
                  href="https://www.instagram.com/asa_personalizados/"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://shopee.com.br/seu_perfil"
                  className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=OO5wGWyvSK0L&format=png&color=000000"
                    alt="Ícone Shopee"
                    className="w-5 h-5"
                  />
                </a>
              </div>

              {/* Main Content */}
              <div className="container mx-auto px-4 pb-12">
                {/* Header */}
                <header className="text-center py-8">
                  <div className="mb-4">
                    <img
                      src="/marca.png?height=80&width=90"
                      alt="Logo"
                      className="mx-auto h-15 dark:invert"
                    />
                  </div>
                  <nav className="flex justify-center gap-8 text-sm text-gray-600 dark:text-gray-300">
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white">Início</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white">Loja</a>
                    <a href="https://www.instagram.com/asa_personalizados/" className="hover:text-gray-900 dark:hover:text-white">Sobre</a>
                    <a
                      href="https://wa.me/5518981111772?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços."
                      className="hover:text-gray-900 dark:hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contato
                    </a>
                  </nav>
                </header>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="fixed right-4 top-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 z-10"
                  aria-label="Alternar modo escuro"
                >
                  {isDarkMode ? <Sun className="text-yellow-500" size={24} /> : <Moon className="text-gray-600" size={24} />}
                </button>

                {/* Main Content */}
                <main className="py-12">
                  <h1 className="text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-white">Comprar coleções</h1>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {collections.map((collection) => (
                      <div
                        key={collection.slug}
                        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
                      >
                        <img src={collection.image} alt={collection.title} className="w-full h-64 object-cover" />
                        <div className="p-4 text-center">
                          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{collection.title}</h2>
                          <Link
                            to={`/products/${collection.slug}`}
                            className="inline-block px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          >
                            Ver tudo
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </main>
              </div>
            </div>
          </div>
        } />
        <Route path="/products/:collection" element={<ProductsPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;
