"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, X } from "lucide-react"

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "Pharma Vision App",
      shortDesc: "OCR-powered pharmaceutical application",
      fullDesc:
        "Improved OCR features in the Flutter app using Google MLKit and Tesseract OCR, fixed critical bugs, and published updates on the Google Play Store. Integrated Firebase Cloud Messaging for real-time notifications.",
      image: "/placeholder.svg?height=300&width=500&text=Pharma+Vision",
      tech: ["Flutter", "Google MLKit", "Tesseract OCR", "Firebase", "Provider"],
      github: "https://github.com",
      live: "https://play.google.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Winnable Fantasy Gaming",
      shortDesc: "Real-time fantasy sports application",
      fullDesc:
        "Developed a fantasy gaming application with real-time cricket and football match updates. Integrated Google Authentication, Firebase Notifications, GPay and PhonePe for wallet functionality, and optimized API calls for enhanced performance.",
      image: "/placeholder.svg?height=300&width=500&text=Winnable",
      tech: ["Flutter", "Firebase", "Google Auth", "GPay", "PhonePe", "Provider"],
      github: "https://github.com",
      live: "https://play.google.com",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "TaskMagnet Multi-Ecommerce",
      shortDesc: "Multi-platform ecommerce solution",
      fullDesc:
        "Developed a comprehensive ecommerce platform with grocery shopping, real-time food delivery, package delivery system, and pickup/drop functionality. Implemented dark mode and real-time location tracking for enhanced user experience.",
      image: "/placeholder.svg?height=300&width=500&text=TaskMagnet",
      tech: ["Flutter", "Firebase", "Real-time Location", "Dark Mode", "MVCController"],
      github: "https://github.com",
      live: "https://play.google.com",
      color: "from-green-500 to-teal-500",
    },
    {
      id: 4,
      title: "Full Stack News Application",
      shortDesc: "Complete news platform with authentication",
      fullDesc:
        "Developed a full-stack news application with secure user authentication using JWT & Firebase Auth. Implemented state management with Bloc for efficient UI updates and optimized API calls using lazy loading and pagination.",
      image: "/placeholder.svg?height=300&width=500&text=News+App",
      tech: ["Flutter", "Node.js", "Express", "Firebase", "Bloc", "JWT"],
      github: "https://github.com",
      live: "https://demo.com",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "RansomAware Decryptor",
      shortDesc: "Security tool for ransomware protection",
      fullDesc:
        "Engineered a ransomware decryption tool leveraging AES and RSA encryption for enhanced security. Implemented automated malware detection using SHA-256 hashing and deployed RESTful APIs with Django and JWT authentication.",
      image: "/placeholder.svg?height=300&width=500&text=RansomAware",
      tech: ["Python", "Flet", "Django", "AES", "RSA", "SHA-256"],
      github: "https://github.com",
      live: "https://demo.com",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      title: "OpenAI Mobile Application",
      shortDesc: "AI-powered chatbot with image generation",
      fullDesc:
        "Developed an AI-powered chatbot using GPT-4 API with DALL·E 2 image generation support. Implemented GetX for reactive state management and secured user authentication using OAuth 2.0 and Firebase Auth.",
      image: "/placeholder.svg?height=300&width=500&text=OpenAI+App",
      tech: ["Flutter", "GPT-4 API", "DALL·E 2", "GetX", "OAuth2", "Firebase"],
      github: "https://github.com",
      live: "https://demo.com",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Interactive Showcase
          </h1>
          <p className="text-xl text-gray-300">Explore my digital creations</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedProject(project.id)}
              className="group relative cursor-pointer"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">View Details</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{project.shortDesc}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden"
              >
                {(() => {
                  const project = projects.find((p) => p.id === selectedProject)!
                  return (
                    <>
                      <div className="relative h-64 md:h-80">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                        >
                          <X size={24} />
                        </button>
                      </div>

                      <div className="p-8">
                        <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">{project.fullDesc}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                          >
                            <Github size={20} />
                            View Code
                          </a>
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-full transition-colors"
                          >
                            <ExternalLink size={20} />
                            Live Demo
                          </a>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
