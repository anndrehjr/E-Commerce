import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, ChevronLeft, ChevronRight, Instagram, Facebook, Twitter } from 'lucide-react';

function ProductsPage({ isDarkMode: initialIsDarkMode, toggleDarkMode: parentToggleDarkMode }) {
  const { collection } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : initialIsDarkMode;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    if (parentToggleDarkMode) {
      parentToggleDarkMode();
    }
  };

  const productsData = {
    cadernos: [
      { 
        id: 1, 
        name: 'Caderno Espiral', 
        description: 'Caderno espiral com 100 folhas pautadas, capa dura e design moderno.',
        price: 'R$ 19,99', 
        images: [
          '/agendas/1.png?height=400&width=400',
          '/agendas/2.png?height=400&width=400',
          '/agendas/3.png?height=400&width=400',
          '/agendas/4.png?height=400&width=400'
        ]
      },
      { 
        id: 2, 
        name: 'Caderno Capa Dura', 
        description: 'Caderno com capa dura resistente, 200 folhas sem pauta, ideal para desenhos e anotações.',
        price: 'R$ 29,99', 
        images: [
          '/agendas/4.png?height=400&width=400',
          '/agendas/5.png?height=400&width=400',
          '/agendas/6.png?height=400&width=400',
          '/agendas/7.png?height=400&width=400'
        ]
      },
      { 
        id: 3, 
        name: 'Sketchbook', 
        description: 'Sketchbook com papel especial para desenho, 80 folhas e capa personalizada.',
        price: 'R$ 39,99', 
        images: [
          '/agendas/3.png?height=400&width=400',
          '/agendas/8.png?height=400&width=400',
          '/agendas/9.png?height=400&width=400',
          '/agendas/10.png?height=400&width=400'
        ]
      },
    ],
    presente: [
      { 
        id: 1, 
        name: 'Kit Presente Deluxe', 
        description: 'Kit presente com caderno personalizado, caneta e marcadores.',
        price: 'R$ 59,99', 
        images: [
          '/agendas/1.png?height=400&width=400',
          '/agendas/2.png?height=400&width=400',
          '/agendas/3.png?height=400&width=400',
          '/agendas/4.png?height=400&width=400'
        ]
      },
      { 
        id: 2, 
        name: 'Conjunto Escritório', 
        description: 'Conjunto para escritório com organizador, bloco de notas e canetas.',
        price: 'R$ 79,99', 
        images: [
          '/agendas/4.png?height=400&width=400',
          '/agendas/5.png?height=400&width=400',
          '/agendas/6.png?height=400&width=400',
          '/agendas/7.png?height=400&width=400'
        ]
      },
      { 
        id: 3, 
        name: 'Kit Artista', 
        description: 'Kit completo para artistas com sketchbook, lápis e estojo.',
        price: 'R$ 99,99', 
        images: [
          '/agendas/3.png?height=400&width=400',
          '/agendas/8.png?height=400&width=400',
          '/agendas/9.png?height=400&width=400',
          '/agendas/10.png?height=400&width=400'
        ]
      },
    ],
  };

  const products = productsData[collection] || [];

  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const nextImage = (productId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: (prev[productId] + 1) % 4 || 1
    }));
  };

  const prevImage = (productId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: (prev[productId] - 1 + 4) % 4 || 3
    }));
  };

  const handleWhatsApp = (product) => {
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre o produto ${product.name} - ${product.price}`);
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-[#000000] transition-colors duration-300 min-h-screen">
        {/* Enhanced Navbar */}
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                  <ArrowLeft size={20} className="mr-2" />
                  <span>Voltar</span>
                </Link>
                <Link to="/cadernos" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">Cadernos</Link>
                <Link to="/presentes" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">Presentes</Link>
                <Link to="/sobre" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">Sobre</Link>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
                  aria-label="Alternar modo escuro"
                >
                  {isDarkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-600" size={20} />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-20 container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white capitalize">
            {collection.replace('-', ' ')}
          </h1>

          <div className="space-y-8">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full md:w-1/3 h-64">
                  <img 
                    src={product.images[currentImageIndex[product.id] || 0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => prevImage(product.id)} 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md transition-colors duration-200"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft size={24} className="text-gray-800 dark:text-gray-200" />
                  </button>
                  <button 
                    onClick={() => nextImage(product.id)} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md transition-colors duration-200"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight size={24} className="text-gray-800 dark:text-gray-200" />
                  </button>
                </div>
                <div className="p-6 flex-grow">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{product.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">{product.price}</p>
                  <button 
                    onClick={() => handleWhatsApp(product)}
                    className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Comprar pelo WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Sobre Nós</h3>
                <p className="text-sm">Mugs & More é sua loja online para cadernos, agendas e presentes personalizados.</p>
              </div>
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Links Rápidos</h3>
                <ul className="text-sm">
                  <li><Link to="/cadernos" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Cadernos</Link></li>
                  <li><Link to="/presentes" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Presentes</Link></li>
                  <li><Link to="/sobre" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Sobre Nós</Link></li>
                  <li><Link to="/contato" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Contato</Link></li>
                </ul>
              </div>
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Contato</h3>
                <p className="text-sm">Email: contato@mugsandmore.com</p>
                <p className="text-sm">Telefone: (11) 1234-5678</p>
              </div>
              <div className="w-full md:w-1/4">
                <h3 className="text-lg font-semibold mb-2">Siga-nos</h3>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                    <Instagram size={24} />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                    <Facebook size={24} />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                    <Twitter size={24} />
                    <span className="sr-only">Twitter</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-sm text-center">
              <p>&copy; 2024 Mugs & More. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ProductsPage;