"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LandingSectionProps {
  onEnter: () => void
}

export default function LandingSection({ onEnter }: LandingSectionProps) {
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")
  // const [showButton, setShowButton] = useState(false) // Removed showButton

  const fullText1 = "Welcome to My Digital Realm"
  const fullText2 = "I'm Venkatesh, Crafting Future-Ready Digital Experiences."

  useEffect(() => {
    let index1 = 0
    let index2 = 0

    const typeText1 = () => {
      if (index1 < fullText1.length) {
        setText1(fullText1.slice(0, index1 + 1))
        index1++
        setTimeout(typeText1, 100)
      } else {
        setTimeout(() => {
          const typeText2 = () => {
            if (index2 < fullText2.length) {
              setText2(fullText2.slice(0, index2 + 1))
              index2++
              setTimeout(typeText2, 50)
            } else {
              // Auto transition after 2 seconds
              setTimeout(() => {
                onEnter()
              }, 2000)
            }
          }
          typeText2()
        }, 500)
      }
    }

    typeText1()
  }, [onEnter])

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        {/* Glass Panel */}
        <div className="relative p-12 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>

          <div className="relative z-10 text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {text1}
                <span className="animate-pulse">|</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300">
                {text2}
                {text2.length < fullText2.length && <span className="animate-pulse">|</span>}
              </p>
            </div>

            {/* Removed button section */}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
