"use client"

import { motion } from "framer-motion"
import { Code, Server, Cloud, Brain, Database, Smartphone } from "lucide-react"

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Mobile Development",
      icon: Smartphone,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Flutter", level: 95 },
        { name: "Dart", level: 90 },
        { name: "Android", level: 85 },
        { name: "iOS", level: 80 },
        { name: "Kotlin", level: 75 },
      ],
    },
    {
      title: "State Management",
      icon: Code,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "BLoC", level: 90 },
        { name: "Provider", level: 88 },
        { name: "Riverpod", level: 85 },
        { name: "GetX", level: 82 },
        { name: "Cubit", level: 80 },
      ],
    },
    {
      title: "Backend & APIs",
      icon: Server,
      color: "from-green-500 to-teal-500",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express", level: 82 },
        { name: "Django", level: 80 },
        { name: "REST APIs", level: 90 },
        { name: "GraphQL", level: 75 },
      ],
    },
    {
      title: "Firebase & Cloud",
      icon: Cloud,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Firebase Auth", level: 90 },
        { name: "Cloud Messaging", level: 88 },
        { name: "Firestore", level: 85 },
        { name: "Cloud Functions", level: 80 },
        { name: "Firebase Storage", level: 82 },
      ],
    },
    {
      title: "Database",
      icon: Database,
      color: "from-indigo-500 to-purple-500",
      skills: [
        { name: "SQLite", level: 88 },
        { name: "Hive", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "Firebase DB", level: 90 },
      ],
    },
    {
      title: "Programming Languages",
      icon: Brain,
      color: "from-yellow-500 to-orange-500",
      skills: [
        { name: "Dart", level: 95 },
        { name: "Python", level: 88 },
        { name: "JavaScript", level: 85 },
        { name: "Java", level: 80 },
        { name: "Kotlin", level: 75 },
      ],
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
            Skills Panel
          </h1>
          <p className="text-xl text-gray-300">My technical arsenal and expertise levels</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} mr-4`}>
                    <category.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="group/skill"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-cyan-400 text-sm font-bold">{skill.level}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5 }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full relative`}
                        >
                          {/* Glow Effect */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${category.color} blur-sm opacity-50`}
                          ></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Floating Labels Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={`floating-${skill.name}`}
                      className="absolute opacity-0 group-hover:opacity-20 text-xs text-white/50"
                      style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      }}
                    >
                      {skill.name}
                    </motion.div>
                  ))}
                </div>

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Expertise Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">20+</div>
                <div className="text-gray-300 text-sm">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">5+</div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">50+</div>
                <div className="text-gray-300 text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
                <div className="text-gray-300 text-sm">Learning Mindset</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
