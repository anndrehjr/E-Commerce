'use client'

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Moon, Sun, ChevronLeft, ChevronRight, Instagram, Facebook, Twitter, X } from 'lucide-react'

export default function Component({ initialIsDarkMode = false, parentToggleDarkMode = () => {} }) {
  const [isDarkMode, setIsDarkMode] = useState(initialIsDarkMode)
  const [currentImageIndex, setCurrentImageIndex] = useState({})
  const [fullscreenImage, setFullscreenImage] = useState(null)
  const [fullscreenProductId, setFullscreenProductId] = useState(null)
  const { collection } = useParams()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode)
    parentToggleDarkMode()
  }

  const productsData = {
    cadernos: [
      { 
        id: 1, 
        name: 'Agenda Personalizada', 
        description: 'Agenda podem ser personalizadas como desejar',
        price: 'R$ 69,99', 
        images: [
          '/agendas/1.png?height=400&width=400',
          '/agendas/2.png?height=400&width=400',
          '/agendas/3.png?height=400&width=400',
          '/agendas/4.png?height=400&width=400'
        ]
      },
    ],
    presente: [
      { 
        id: 1, 
        name: 'Kit Presente Deluxe', 
        description: 'Kit Xícaras Personalizadas, Café e Coador Casal',
        price: 'R$ 125,00', 
        images: [
          '/kitpresente/1.png?height=400&width=400',
          '/kitpresente/2.png?height=400&width=400',
          '/kitpresente/3.png?height=400&width=400',
          '/kitpresente/4.png?height=400&width=400'        
        ]
      },
    ],
    canecas: [
      { 
        id: 1, 
        name: 'Canecas Personalizadas', 
        description: 'Canecas podem ser personalizadas como desejar',
        price: 'R$ 25,00', 
        images: [
          '/canecas/caneca-01.png?height=400&width=400',
          '/canecas/caneca-02.png?height=400&width=400',
          '/canecas/caneca-03.png?height=400&width=400',
          '/canecas/caneca-04.png?height=400&width=400'
        ]
      },
    ],
    adesivos: [
      { 
        id: 1, 
        name: 'Kit Adesivos', 
        description: 'Kit com diversos adesivos personalizados',
        price: 'R$ 15,99', 
        images: [
          '/adesivos/1.png?height=400&width=400',
          '/adesivos/2.png?height=400&width=400',
          '/adesivos/3.png?height=400&width=400',
          '/adesivos/4.png?height=400&width=400'
        ]
      },
    ],
  }

  const products = productsData[collection] || []

  const nextImage = (productId) => {
    const product = products.find(p => p.id === productId)
    if (fullscreenImage) {
      setFullscreenImage(prev => {
        const currentIndex = product.images.indexOf(prev)
        const nextIndex = (currentIndex + 1) % product.images.length
        return product.images[nextIndex]
      })
    } else {
      setCurrentImageIndex(prev => ({
        ...prev,
        [productId]: ((prev[productId] || 0) + 1) % product.images.length
      }))
    }
  }

  const prevImage = (productId) => {
    const product = products.find(p => p.id === productId)
    if (fullscreenImage) {
      setFullscreenImage(prev => {
        const currentIndex = product.images.indexOf(prev)
        const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length
        return product.images[prevIndex]
      })
    } else {
      setCurrentImageIndex(prev => ({
        ...prev,
        [productId]: ((prev[productId] || 0) - 1 + product.images.length) % product.images.length
      }))
    }
  }

  const handleImageClick = (productId, imageUrl) => {
    setFullscreenImage(imageUrl)
    setFullscreenProductId(productId)
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
    setFullscreenProductId(null)
  }

  const handleWhatsApp = (product) => {
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre o produto ${product.name} - ${product.price}`)
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank')
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-[#000000] transition-colors duration-300 min-h-screen">
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                  <ArrowLeft size={20} className="mr-2" />
                  <span>Voltar</span>
                </Link>
                <Link to="/products/cadernos" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">Cadernos</Link>
                <Link to="/products/presente" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">Presentes</Link>
                <Link to="/products/canecas" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">Canecas</Link>
                <Link to="/products/adesivos" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">Adesivos</Link>
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

        <div className="pt-20 container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white capitalize">
            {collection}
          </h1>

          <div className="space-y-8">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full md:w-1/3 h-64">
                  <img 
                    src={product.images[currentImageIndex[product.id] || 0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleImageClick(product.id, product.images[currentImageIndex[product.id] || 0])}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage(product.id)
                    }} 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md transition-colors duration-200"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage(product.id)
                    }} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md transition-colors duration-200"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="h-4 w-4" />
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

        <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Sobre Nós</h3>
                <p className="text-sm">Mugs & More é sua loja online para cadernos, agendas e presentes personalizados.</p>
              </div>
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Links Rápidos</h3>
                <ul className="text-sm">
                  <li><Link to="/products/cadernos" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Cadernos</Link></li>
                  <li><Link to="/products/presente" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Presentes</Link></li>
                  <li><Link to="/products/canecas" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Canecas</Link></li>
                  <li><Link to="/products/adesivos" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Adesivos</Link></li>
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
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                    <Twitter className="h-5 w-5" />
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

      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img 
            src={fullscreenImage} 
            alt="Fullscreen view" 
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={() => prevImage(fullscreenProductId)}
            className="absolute left-4
top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md transition-colors duration-200"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => nextImage(fullscreenProductId)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md transition-colors duration-200"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md transition-colors duration-200"
            aria-label="Fechar visualização em tela cheia"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  )
}

