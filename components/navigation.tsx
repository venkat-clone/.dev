"use client"

import { motion } from "framer-motion"
import { Home, User, Briefcase, Code, MessageCircle, Volume2, VolumeX } from "lucide-react"

interface NavigationProps {
  currentSection: string
  setCurrentSection: (section: string) => void
  soundEnabled: boolean
  setSoundEnabled: (enabled: boolean) => void
}

export default function Navigation({
  currentSection,
  setCurrentSection,
  soundEnabled,
  setSoundEnabled,
}: NavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Command Center" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "skills", icon: Code, label: "Skills Panel" },
    { id: "about", icon: User, label: "Story Unfold" },
    { id: "contact", icon: MessageCircle, label: "Secure Uplink" },
  ]

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50"
    >
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl">
        <div className="space-y-4">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`group relative p-3 rounded-xl transition-all duration-300 ${
                currentSection === item.id
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={24} />

              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {item.label}
              </div>

              {/* Active Indicator */}
              {currentSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30"
                />
              )}
            </motion.button>
          ))}

          <div className="border-t border-white/10 pt-4">
            <motion.button
              onClick={() => setSoundEnabled(!soundEnabled)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
