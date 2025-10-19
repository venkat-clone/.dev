"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mail, MapPin, Phone, Download } from "lucide-react"
import portfolioConfig from "@/config/portfolio.json"

interface HeroSectionProps {
  onNavigate: (section: string) => void
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [currentHighlight, setCurrentHighlight] = useState(0)
  const { hero, personal, theme } = portfolioConfig

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % hero.highlights.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [hero.highlights.length])

  const handleCTAClick = (action: string, url?: string) => {
    if (url) {
      window.open(url, "_blank")
    } else {
      onNavigate(action)
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Content */}
            <div className="space-y-8 max-w-lg">
              {/* Greeting & Name */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-3"
              >
                <p className="text-slate-400 font-medium text-lg">Hi, I'm</p>
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  {hero.name}
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-slate-300">
                  {hero.title}
                </h2>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg text-slate-400 leading-relaxed"
              >
                {hero.subtitle}
              </motion.p>

              {/* Highlights */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-8 overflow-hidden"
              >
                <motion.div
                    animate={{ y: -currentHighlight * 32 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-2"
                >
                  {hero.highlights.map((highlight, index) => (
                      <div key={index} className="h-8 flex items-center text-slate-400 font-medium">
                        {highlight}
                      </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                    onClick={() => handleCTAClick(hero.cta.primary.action)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-3 px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg font-medium text-white hover:bg-slate-700 transition-colors duration-200"
                >
                  {hero.cta.primary.text}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>

                <motion.button
                    onClick={() => handleCTAClick("", hero.cta.resume.url)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-6 py-3 bg-transparent border-2 border-slate-600 rounded-lg font-medium text-slate-300 hover:border-slate-400 hover:text-white transition-colors duration-200"
                >
                  <Download size={18} />
                  {hero.cta.resume.text}
                </motion.button>
              </motion.div>

              {/* Contact */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-wrap gap-6 pt-6 text-sm text-slate-500"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>{personal.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{personal.email}</span>
                </div>
              </motion.div>
            </div>

            {/* Right Content */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
            >
              {/* Profile Image */}
              <div className="w-72 h-72 mx-auto relative">
                <div className="absolute inset-0 rounded-2xl bg-slate-800 border border-slate-700"></div>
                <img
                    src={personal.profileImage || "/placeholder.svg"}
                    alt={personal.name}
                    className="absolute inset-2 rounded-xl object-cover w-full h-full"
                />
              </div>

              {/* Stats */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="grid grid-cols-2 gap-4 mt-8"
              >
                {hero.stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-slate-500 text-sm">{stat.label}</div>
                    </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 border-2 border-slate-600 rounded-full flex justify-center"
          >
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 h-3 bg-slate-600 rounded-full mt-2 self-start"
            />
          </motion.div>
        </motion.div>
      </div>
  )
}