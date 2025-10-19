"use client"

import { motion } from "framer-motion"
import { skillCategories } from "@/lib/consts"

export default function SkillsSection() {
  return (
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical Skills
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Core technologies and expertise levels
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
                <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    className="bg-gray-900 border border-gray-700 rounded-xl p-6"
                >
                  {/* Category Header */}
                  <div className="flex items-center mb-6">
                    <div className={`p-2 rounded-lg ${category.color} mr-3 flex-shrink-0`}>
                      <category.icon className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                            className="group"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300 font-medium">{skill.name}</span>
                            <span className="text-white font-semibold">{skill.level}%</span>
                          </div>

                          {/* Progress Bar */}
                          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2 }}
                                className={`h-full ${category.color}  rounded-full relative`}
                            />
                          </div>
                        </motion.div>
                    ))}
                  </div>
                </motion.div>
            ))}
          </div>

          {/* Stats Overview */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
          >
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-8">
                Expertise Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "20+", label: "Technologies", color: "text-blue-400" },
                  { value: "5+", label: "Years Exp.", color: "text-purple-400" },
                  { value: "50+", label: "Projects", color: "text-green-400" },
                  { value: "Ongoing", label: "Learning", color: "text-cyan-400" }
                ].map((stat, index) => (
                    <div key={stat.label} className="text-center">
                      <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
  )
}