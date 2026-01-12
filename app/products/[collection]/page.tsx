"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ArrowLeft, Moon, Sun, ChevronLeft, ChevronRight, X, MessageCircle, Instagram, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const productsData: Record<
  string,
  Array<{
    id: number
    name: string
    description: string
    price: string
    images: string[]
  }>
> = {
  cadernos: [
    {
      id: 1,
      name: "Agenda Personalizada",
      description: "Agendas podem ser personalizadas como desejar",
      price: "R$ 69,99",
      images: [
        "/personalized-agenda-planner-1.jpg",
        "/personalized-agenda-planner-2.jpg",
        "/personalized-agenda-planner-3.jpg",
        "/personalized-agenda-planner-4.jpg",
      ],
    },
  ],
  presente: [
    {
      id: 1,
      name: "Kit Presente Deluxe",
      description: "Kit Xícaras Personalizadas, Café e Coador Casal",
      price: "R$ 125,00",
      images: [
        "/gift-set-coffee-mug-couple-1.jpg",
        "/gift-set-coffee-mug-couple-2.jpg",
        "/gift-set-coffee-mug-couple-3.jpg",
        "/gift-set-coffee-mug-couple-4.jpg",
      ],
    },
  ],
  canecas: [
    {
      id: 1,
      name: "Canecas Personalizadas",
      description: "Canecas podem ser personalizadas como desejar",
      price: "R$ 30,00",
      images: [
        "/personalized-ceramic-mug-1.jpg",
        "/personalized-ceramic-mug-2.jpg",
        "/personalized-ceramic-mug-3.jpg",
        "/placeholder.svg?height=500&width=500",
      ],
    },
  ],
  adesivos: [
    {
      id: 1,
      name: "Kit Adesivos",
      description: "Kit com diversos adesivos personalizados",
      price: "R$ 21,99",
      images: [
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
      ],
    },
  ],
}

const collectionTitles: Record<string, string> = {
  cadernos: "Agendas & Cadernos",
  presente: "Kit Presente",
  canecas: "Canecas",
  adesivos: "Adesivos",
}

export default function ProductsPage() {
  const params = useParams()
  const collection = params.collection as string
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({})
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const [fullscreenProductId, setFullscreenProductId] = useState<number | null>(null)

  const products = productsData[collection] || []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [collection])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const nextImage = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    if (fullscreenImage) {
      const currentIndex = product.images.indexOf(fullscreenImage)
      const nextIndex = (currentIndex + 1) % product.images.length
      setFullscreenImage(product.images[nextIndex])
    } else {
      setCurrentImageIndex((prev) => ({
        ...prev,
        [productId]: ((prev[productId] || 0) + 1) % product.images.length,
      }))
    }
  }

  const prevImage = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    if (fullscreenImage) {
      const currentIndex = product.images.indexOf(fullscreenImage)
      const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length
      setFullscreenImage(product.images[prevIndex])
    } else {
      setCurrentImageIndex((prev) => ({
        ...prev,
        [productId]: ((prev[productId] || 0) - 1 + product.images.length) % product.images.length,
      }))
    }
  }

  const handleImageClick = (productId: number, imageUrl: string) => {
    setFullscreenImage(imageUrl)
    setFullscreenProductId(productId)
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
    setFullscreenProductId(null)
  }

  const handleWhatsApp = (product: { name: string; price: string }) => {
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre o produto ${product.name} - ${product.price}`)
    window.open(`https://wa.me/5518996798352?text=${message}`, "_blank")
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground transition-colors duration-300 flex-grow">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span className="hidden sm:inline">Voltar</span>
                </Link>
                <div className="hidden md:flex items-center gap-4">
                  {Object.entries(collectionTitles).map(([slug, title]) => (
                    <Link
                      key={slug}
                      href={`/products/${slug}`}
                      className={`text-sm transition-colors ${
                        collection === slug
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Alternar modo escuro"
              >
                {isDarkMode ? (
                  <Sun className="text-yellow-500 w-5 h-5" />
                ) : (
                  <Moon className="text-muted-foreground w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Pills */}
        <div className="md:hidden fixed top-16 left-0 right-0 bg-background/80 backdrop-blur-lg border-b border-border z-40 overflow-x-auto">
          <div className="flex gap-2 p-3">
            {Object.entries(collectionTitles).map(([slug, title]) => (
              <Link
                key={slug}
                href={`/products/${slug}`}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  collection === slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="pt-24 md:pt-20 pb-16">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{collectionTitles[collection] || collection}</h1>
              <p className="text-muted-foreground">
                {products.length} {products.length === 1 ? "produto" : "produtos"} disponíveis
              </p>
            </motion.div>

            <div className="space-y-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Gallery */}
                    <div className="relative w-full lg:w-1/2 aspect-square lg:aspect-auto lg:min-h-[400px]">
                      <Image
                        src={product.images[currentImageIndex[product.id] || 0]}
                        alt={product.name}
                        fill
                        className="object-cover cursor-pointer"
                        onClick={() => handleImageClick(product.id, product.images[currentImageIndex[product.id] || 0])}
                      />

                      {/* Navigation Arrows */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage(product.id)
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background transition-colors"
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage(product.id)
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background transition-colors"
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {product.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentImageIndex((prev) => ({
                                ...prev,
                                [product.id]: imgIndex,
                              }))
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              (currentImageIndex[product.id] || 0) === imgIndex
                                ? "bg-primary w-6"
                                : "bg-background/60 hover:bg-background/80"
                            }`}
                            aria-label={`Ver imagem ${imgIndex + 1}`}
                          />
                        ))}
                      </div>

                      {/* Click to expand hint */}
                      <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs text-muted-foreground">
                        Clique para ampliar
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-8 lg:w-1/2 flex flex-col justify-center">
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h2>
                      <p className="text-muted-foreground mb-6 text-lg">{product.description}</p>
                      <p className="text-3xl font-bold text-primary mb-6">{product.price}</p>

                      <Button
                        onClick={() => handleWhatsApp(product)}
                        size="lg"
                        className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Comprar pelo WhatsApp
                      </Button>

                      <p className="text-sm text-muted-foreground mt-4">
                        ⚡ Resposta rápida • As imagens são ilustrativas
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-muted/50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-lg">Asa Personalizados</h3>
                <p className="text-muted-foreground text-sm">
                  Sua loja online para produtos personalizados únicos e especiais.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Coleções</h4>
                <ul className="space-y-2 text-sm">
                  {Object.entries(collectionTitles).map(([slug, title]) => (
                    <li key={slug}>
                      <Link
                        href={`/products/${slug}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contato</h4>
                <p className="text-muted-foreground text-sm">Telefone: (18) 99679-8352</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Redes Sociais</h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/asa_personalizados/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-card hover:bg-primary/10 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/5518996798352"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-card hover:bg-primary/10 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                  <a
                    href="https://shopee.com.br/seu_perfil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-card hover:bg-primary/10 transition-colors"
                    aria-label="Shopee"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2026 Asa Personalizados. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && fullscreenProductId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100]"
            onClick={closeFullscreen}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={fullscreenImage || "/placeholder.svg"}
                alt="Visualização em tela cheia"
                fill
                className="object-contain"
              />

              <button
                onClick={() => prevImage(fullscreenProductId)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => nextImage(fullscreenProductId)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={closeFullscreen}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
