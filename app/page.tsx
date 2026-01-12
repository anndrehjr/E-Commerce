"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Moon, Sun, MessageCircle, Instagram, ShoppingBag, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const collections = [
  {
    title: "Agendas & Cadernos",
    description: "Organize seu dia com estilo",
    image: "/personalized-agenda-notebook-elegant.jpg",
    slug: "cadernos",
  },
  {
    title: "Kit Presente",
    description: "Surpreenda quem você ama",
    image: "/gift-set-coffee-mug-elegant.jpg",
    slug: "presente",
  },
  {
    title: "Canecas",
    description: "Momentos especiais merecem canecas únicas",
    image: "/personalized-ceramic-mug-elegant.jpg",
    slug: "canecas",
  },
  {
    title: "Adesivos",
    description: "Personalize tudo ao seu redor",
    image: "/sticker-set-colorful-elegant.jpg",
    slug: "adesivos",
  },
]

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground transition-colors duration-300 min-h-screen">
        {/* Social Media Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50"
        >
          <a
            href="https://wa.me/5518996798352?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços."
            className="p-3 rounded-full bg-card shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-green-500 group-hover:text-green-600" />
          </a>
          <a
            href="https://www.instagram.com/asa_personalizados/"
            className="p-3 rounded-full bg-card shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 text-pink-500 group-hover:text-pink-600" />
          </a>
          <a
            href="https://shopee.com.br/seu_perfil"
            className="p-3 rounded-full bg-card shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Shopee"
          >
            <ShoppingBag className="w-5 h-5 text-orange-500 group-hover:text-orange-600" />
          </a>
        </motion.div>

        {/* Dark Mode Toggle */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleDarkMode}
          className="fixed right-4 top-4 p-3 rounded-full bg-card shadow-lg hover:shadow-xl z-50 transition-all duration-300 hover:scale-110"
          aria-label="Alternar modo escuro"
        >
          {isDarkMode ? (
            <Sun className="text-yellow-500 w-5 h-5" />
          ) : (
            <Moon className="text-muted-foreground w-5 h-5" />
          )}
        </motion.button>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-16">
          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Asa Personalizados
              </h1>
              <p className="text-muted-foreground mt-2">Produtos únicos feitos com carinho</p>
            </div>
            <nav className="flex justify-center gap-8 text-sm">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Início
              </Link>
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Loja
              </Link>
              <a
                href="https://www.instagram.com/asa_personalizados/"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sobre
              </a>
              <a
                href="https://wa.me/5518ZXXXXXXXtext=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços."
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contato
              </a>
            </nav>
          </motion.header>

          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-12 mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-balance">Transforme momentos em memórias</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Descubra nossa coleção de produtos personalizados, criados especialmente para você
            </p>
          </motion.section>

          {/* Product Grid */}
          <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link href={`/products/${collection.slug}`}>
                    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                      <div className="relative overflow-hidden aspect-square">
                        <Image
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {collection.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">{collection.description}</p>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                          Ver coleção
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.main>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="py-16 mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold mb-2">100% Personalizável</h3>
                <p className="text-muted-foreground text-sm">Cada produto é feito sob medida para você</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="font-semibold mb-2">Presente Perfeito</h3>
                <p className="text-muted-foreground text-sm">Ideal para surpreender quem você ama</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-semibold mb-2">Atendimento via WhatsApp</h3>
                <p className="text-muted-foreground text-sm">Tire suas dúvidas rapidamente</p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Footer */}
        <footer className="bg-muted/50 py-12 mt-8">
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
                  <li>
                    <Link
                      href="/products/cadernos"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Agendas & Cadernos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/presente"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Kit Presente
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/canecas"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Canecas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/adesivos"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Adesivos
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contato</h4>
                <p className="text-muted-foreground text-sm">Telefone: (18) ZXXXX XXXX</p>
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
                    href="https://wa.me/5518ZXXXXXX"
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
    </div>
  )
}
