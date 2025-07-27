"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Award, Briefcase } from "lucide-react"

export default function AboutSection() {
  const timeline = [
    {
      year: "2020",
      title: "Started Computer Science Journey",
      description:
        "Began Bachelor of Technology in Computer Science and Cyber Security at DRK College of Engineering, Hyderabad. Started learning programming fundamentals and mobile development.",
      icon: "🎓",
      side: "left",
    },
    {
      year: "2022",
      title: "First Industry Experience",
      description:
        "Joined OSOS PVT Ltd as Software Developer Intern. Worked on Sparks social networking app, improved Android performance by 15% and implemented dark mode functionality.",
      icon: "💼",
      side: "right",
    },
    {
      year: "2022-2023",
      title: "Flutter Developer at Decrypton",
      description:
        "Developed Winnable fantasy gaming app and TaskMagnet multi-ecommerce platform. Integrated payment gateways, real-time features, and published apps on Play Store.",
      icon: "📱",
      side: "left",
    },
    {
      year: "2023-2024",
      title: "Remote Flutter Developer",
      description:
        "Worked at Alemeno developing complex Flutter applications with BLoC pattern. Created automated web scraping solutions and implemented Django backend services.",
      icon: "🚀",
      side: "right",
    },
    {
      year: "2024",
      title: "Current Role at StepX",
      description:
        "Currently working as Flutter Developer, building high-performance applications with Clean Architecture. Integrated Firebase services, OCR features, and reduced release time by 20%.",
      icon: "⚡",
      side: "left",
    },
    {
      year: "Future",
      title: "Continuous Growth",
      description:
        "Focused on expanding expertise in mobile development, exploring new technologies, and contributing to innovative projects that make a real impact.",
      icon: "🌟",
      side: "right",
    },
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Story Unfold
          </h1>
          <p className="text-xl text-gray-300">My journey through the digital realm</p>
        </motion.div>

        {/* Personal Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
          >
            <MapPin className="text-cyan-400 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Location</h3>
            <p className="text-gray-300">Hyderabad, Telangana</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
          >
            <Briefcase className="text-purple-400 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Role</h3>
            <p className="text-gray-300">Flutter Developer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
          >
            <Award className="text-pink-400 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Experience</h3>
            <p className="text-gray-300">3+ Years</p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-full"></div>

          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: item.side === "left" ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${item.side === "left" ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Content */}
              <div className={`w-5/12 ${item.side === "left" ? "pr-8 text-right" : "pl-8 text-left"}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-center mb-3">
                    <Calendar className="text-cyan-400 mr-2" size={20} />
                    <span className="text-cyan-400 font-bold text-lg">{item.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </motion.div>
              </div>

              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-2xl z-10">
                <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                  {item.icon}
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-3xl font-bold text-white mb-6 text-center">My Philosophy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-bold text-cyan-400 mb-2">Purpose-Driven</h4>
              <p className="text-gray-300">
                Every line of code should serve a meaningful purpose and create real value.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="text-xl font-bold text-purple-400 mb-2">Innovation First</h4>
              <p className="text-gray-300">Embracing cutting-edge technologies to build tomorrow's solutions today.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-xl font-bold text-pink-400 mb-2">Collaboration</h4>
              <p className="text-gray-300">
                Great products are built by great teams working together towards a common vision.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
