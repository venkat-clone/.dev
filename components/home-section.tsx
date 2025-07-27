"use client"

import { motion } from "framer-motion"
import { Code, Brain } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animations"

export default function HomeSection() {
  const techStack = [
    { name: "Flutter", icon: "📱", color: "from-blue-400 to-cyan-400" },
    { name: "Dart", icon: "🎯", color: "from-blue-500 to-blue-600" },
    { name: "Firebase", icon: "🔥", color: "from-orange-400 to-yellow-400" },
    { name: "Python", icon: "🐍", color: "from-yellow-400 to-green-500" },
    { name: "Node.js", icon: "🟢", color: "from-green-400 to-green-500" },
    { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-400" },
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollAnimation className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Command Center
          </h1>
          <p className="text-xl text-gray-300">Welcome to my digital workspace</p>
        </ScrollAnimation>

        {/* Profile Section */}
        <ScrollAnimation delay={0.1} className="text-center mb-12">
          <div className="relative inline-block">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-cyan-400 to-purple-400 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=200&width=200&text=Venkatesh"
                  alt="Lingampally Venkatesh"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mt-6 mb-2">Lingampally Venkatesh</h2>
          <p className="text-cyan-400 font-semibold">Flutter Android App Developer</p>
          <p className="text-gray-400 text-sm">Hyderabad, Telangana</p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Who I Am */}
          <ScrollAnimation
            direction="left"
            delay={0.2}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Code className="text-cyan-400 mr-4" size={32} />
              <h2 className="text-3xl font-bold text-white">Who I Am</h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I'm a passionate Flutter Android App Developer with 3+ years of experience building cross-platform
                mobile applications using Flutter and Firebase. I specialize in creating production-grade apps with
                clean architecture and optimal performance.
              </p>
              <p>
                My expertise spans across state management (BLoC, Provider), API integration, Firebase services, and
                delivering scalable mobile solutions. I've successfully published multiple apps on the Google Play Store
                and have experience with both Android and iOS development.
              </p>
              <p>
                When I'm not coding, you'll find me exploring the latest mobile development trends, contributing to
                open-source projects, or working on innovative solutions for real-world problems.
              </p>
            </div>
          </ScrollAnimation>

          {/* Tech Stack */}
          <ScrollAnimation
            direction="right"
            delay={0.4}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Brain className="text-purple-400 mr-4" size={32} />
              <h2 className="text-3xl font-bold text-white">Tech Arsenal</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{tech.icon}</span>
                    <span className="font-semibold text-white">{tech.name}</span>
                  </div>

                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>

                  {/* Pulse Animation */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/20 group-hover:animate-pulse"></div>
                </motion.div>
              ))}
            </div>
          </ScrollAnimation>
        </div>

        {/* Stats Section */}
        <ScrollAnimation delay={0.8} className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Years Experience", value: "3+", icon: "⏱️" },
            { label: "Apps Published", value: "10+", icon: "📱" },
            { label: "Technologies Mastered", value: "15+", icon: "🛠️" },
            { label: "Coffee Consumed", value: "∞", icon: "☕" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </ScrollAnimation>
      </div>
    </div>
  )
}
