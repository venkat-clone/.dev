"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, ArrowRight, Play, MapPin, Mail, Phone } from "lucide-react"
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
    }, 3000)
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <p className="text-cyan-400 font-medium text-lg">{hero.greeting}</p>
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className={`bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent`}>
                  {hero.name}
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-white/90">{hero.title}</h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 leading-relaxed max-w-2xl"
            >
              {hero.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 leading-relaxed max-w-2xl"
            >
              {hero.description}
            </motion.p>

            {/* Rotating Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-8 overflow-hidden"
            >
              <motion.div
                animate={{ y: -currentHighlight * 32 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-2"
              >
                {hero.highlights.map((highlight, index) => (
                  <div key={index} className="text-cyan-400 font-medium h-8 flex items-center">
                    {highlight}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={() => handleCTAClick(hero.cta.primary.action)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`group flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${theme.colors.secondary} rounded-xl font-semibold text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300`}
              >
                <Play size={20} />
                {hero.cta.primary.text}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              <motion.button
                onClick={() => handleCTAClick(hero.cta.secondary.action)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300"
              >
                <Mail size={20} />
                {hero.cta.secondary.text}
              </motion.button>

              <motion.button
                onClick={() => handleCTAClick("", hero.cta.resume.url)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300"
              >
                <Download size={20} />
                {hero.cta.resume.text}
              </motion.button>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span className="text-sm">{personal.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span className="text-sm">{personal.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <span className="text-sm">{personal.phone}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="relative">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-spin-slow"></div>
                <div className="absolute inset-2 rounded-full bg-black"></div>

                {/* Profile Image */}
                <div className="absolute inset-4 rounded-full overflow-hidden">
                  <img
                    src={personal.profileImage || "/placeholder.svg"}
                    alt={personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                >
                  📱
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                >
                  🔥
                </motion.div>

                <motion.div
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-xl shadow-lg"
                >
                  ⚡
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-2 gap-4 mt-12"
            >
              {hero.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div
                    className={`text-2xl font-bold bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
