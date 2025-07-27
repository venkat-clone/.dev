"use client"

import { motion } from "framer-motion"
import { Home, User, Briefcase, Code, MessageCircle, Volume2, VolumeX, ChevronUp, BookOpen } from "lucide-react"
import portfolioConfig from "@/config/portfolio.json"

interface ScrollHeaderProps {
  soundEnabled: boolean
  setSoundEnabled: (enabled: boolean) => void
  scrollToSection: (sectionId: string) => void
}

const iconMap = {
  Home,
  User,
  Briefcase,
  Code,
  MessageCircle,
  BookOpen,
}

export default function ScrollHeader({ soundEnabled, setSoundEnabled, scrollToSection }: ScrollHeaderProps) {
  const { navigation, theme } = portfolioConfig

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-2xl font-bold bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent cursor-pointer`}
            onClick={scrollToTop}
          >
            {navigation.logo}
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.items.map((item) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap]
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <IconComponent size={18} />
                  <span>{item.label}</span>
                </motion.button>
              )
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setSoundEnabled(!soundEnabled)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </motion.button>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <ChevronUp size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
