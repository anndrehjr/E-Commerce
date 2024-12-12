import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Moon, Sun, ChevronLeft, ChevronRight, X, ShoppingCart } from 'lucide-react'
import { useCart } from './context/CartContext'
import CartDrawer from './components/CartDrawer'

export default function ProductsPage({ isDarkMode, toggleDarkMode }) {
  const [currentImageIndex, setCurrentImageIndex] = useState({})
  const [fullscreenImage, setFullscreenImage] = useState(null)
  const [fullscreenProductId, setFullscreenProductId] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { collection } = useParams()
  const navigate = useNavigate()
  const { addItem, items } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collection]);

  const productsData = {
    cadernos: [
      {
        id: 1.4,
        name: 'Agenda Personalizada',
        description: 'Agendas podem ser personalizadas como desejar',
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
        id: 1.3,
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
        id: 1.1,
        name: 'Canecas Personalizadas',
        description: 'Canecas podem ser personalizadas como desejar',
        price: 'R$ 30,00',
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
        id: 1.2,
        name: 'Kit Adesivos',
        description: 'Kit com diversos adesivos personalizados',
        price: 'R$ 21,99',
        images: [
          '/adesivos/adesivo.webp?height=400&width=400',
          '/adesivos/kit 01.png?height=400&width=400',
          '/adesivos/kit 01.png?height=400&width=400',
          '/adesivos/kit 01.png?height=400&width=400'
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
    window.open(`https://wa.me/5518996798352?text=${message}`, '_blank')
  }

  const handleAddToCart = (product) => {
    addItem(product);
    setIsCartOpen(true);
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-black transition-colors duration-300 flex-grow">
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-black text-gray-800 dark:text-white shadow-md z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                  <ArrowLeft size={20} className="mr-2" />
                  <span>Voltar</span>
                </Link>
                <button onClick={() => { navigate('/products/cadernos'); }} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">Cadernos</button>
                <button onClick={() => { navigate('/products/presente'); }} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">Presentes</button>
                <button onClick={() => { navigate('/products/canecas'); }} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">Canecas</button>
                <button onClick={() => { navigate('/products/adesivos'); }} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">Adesivos</button>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <ShoppingCart size={24} />
                  {items.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {items.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-200"
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
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Adicionar ao Carrinho
                    </button>
                    <button
                      onClick={() => handleWhatsApp(product)}
                      className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Comprar pelo WhatsApp
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    As imagens são meramente ilustrativas.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Sobre Nós</h3>
                <p className="text-sm">Asa Personalizados é sua loja online para cadernos, agendas e presentes personalizados.</p>
              </div>
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Links Rápidos</h3>
                <ul className="text-sm">
                  <li><button onClick={() => { navigate('/products/cadernos'); }} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Cadernos</button></li>
                  <li><button onClick={() => { navigate('/products/presente'); }} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Presentes</button></li>
                  <li><button onClick={() => { navigate('/products/canecas'); }} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Canecas</button></li>
                  <li><button onClick={() => { navigate('/products/adesivos'); }} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Adesivos</button></li>
                </ul>
              </div>
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Contato</h3>
                <p className="text-sm">Email: </p>
                <p className="text-sm">Telefone: (18) 99679-8352</p>
              </div>
              <div className="w-full md:w-1/4">
                <h3 className="text-lg font-semibold mb-2">Siga-nos</h3>
                <div className="flex space-x-4 items-center">
                  <a
                    href="https://www.instagram.com/asa_personalizados/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    <img
                      src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000"
                      alt="Instagram"
                      className="h-5 w-5"
                    />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="https://wa.me/5518996798352?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    <img
                      src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000"
                      alt="WhatsApp"
                      className="h-5 w-5"
                    />
                    <span className="sr-only">WhatsApp</span>
                  </a>
                  <a
                    href="https://shopee.com.br/seu_perfil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    <img
                      src="https://img.icons8.com/?size=100&id=mBkyWceUPlkM&format=png&color=000000"
                      alt="Shopee"
                      className="h-5 w-5"
                    />
                    <span className="sr-only">Shopee</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-sm text-center">
              <p>&copy; 2024 Asa_Personalizados. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>

        {fullscreenImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => prevImage(fullscreenProductId)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md transition-colors duration-200"
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

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </div>
  )
}

