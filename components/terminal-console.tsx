"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Terminal } from "lucide-react"

interface TerminalConsoleProps {
  onClose: () => void
}

export default function TerminalConsole({ onClose }: TerminalConsoleProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<
    Array<{ command: string; output: string; type: "command" | "output" | "error" }>
  >([
    { command: "", output: "Welcome to Venkatesh's Digital Terminal v2.0", type: "output" },
    { command: "", output: 'Type "help" for available commands', type: "output" },
    { command: "", output: "", type: "output" },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: () => `Available commands:
- about: Learn more about me
- skills: View my technical skills
- projects: List my projects
- contact: Get my contact information
- clear: Clear the terminal
- matrix: Enter the matrix
- hack: Try to hack (just for fun!)
- exit: Close terminal`,

    about: () => `Venkatesh - Full-Stack Developer & Digital Architect
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Passionate about creating future-ready digital experiences
🎯 5+ years of experience in web development
🌟 Specialized in React, Node.js, AI/ML integration
🔥 Always learning, always building`,

    skills: () => `Technical Arsenal:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend: React, Next.js, TypeScript, Tailwind CSS
Backend: Node.js, Python, Express.js, GraphQL
Database: PostgreSQL, MongoDB, Redis
Cloud: AWS, Docker, Kubernetes
AI/ML: TensorFlow, OpenAI API, Langchain
Mobile: React Native, Flutter`,

    projects: () => `Featured Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AI-Powered Dashboard - Real-time analytics with ML
2. Blockchain Voting System - Secure & transparent
3. Cloud Infrastructure Manager - Multi-cloud orchestration
4. Neural Network Visualizer - Interactive ML models
5. Real-time Collaboration Suite - Team productivity
6. IoT Smart Home Hub - Centralized automation`,

    contact: () => `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email: venkatesh@digitalrealm.dev
📱 Phone: +91 98765 43210
📍 Location: Bangalore, India
🔗 GitHub: github.com/venkatesh
💼 LinkedIn: linkedin.com/in/venkatesh`,

    matrix: () => `Entering the Matrix...
01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100
Wake up, Neo... The Matrix has you...
Follow the white rabbit 🐰`,

    hack: () => `Initiating hack sequence...
[████████████████████████████████] 100%
Access denied! Nice try though 😄
This is a portfolio, not a real system!
But I appreciate your curiosity 🕵️‍♂️`,

    clear: () => "CLEAR_TERMINAL",

    exit: () => "EXIT_TERMINAL",
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const command = input.toLowerCase().trim()
    const commandFunc = commands[command as keyof typeof commands]

    let output = ""
    let type: "output" | "error" = "output"

    if (command === "clear") {
      setHistory([])
      setInput("")
      return
    }

    if (command === "exit") {
      onClose()
      return
    }

    if (commandFunc) {
      output = commandFunc()
    } else {
      output = `Command not found: ${command}. Type "help" for available commands.`
      type = "error"
    }

    setHistory((prev) => [
      ...prev,
      { command: `$ ${input}`, output: "", type: "command" },
      { command: "", output, type },
    ])
    setInput("")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl h-96 bg-black border border-green-500/30 rounded-lg overflow-hidden shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-green-500/30">
          <div className="flex items-center space-x-2">
            <Terminal className="text-green-400" size={16} />
            <span className="text-green-400 text-sm font-mono">venkatesh@digitalrealm:~$</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Terminal Content */}
        <div ref={terminalRef} className="h-full p-4 overflow-y-auto font-mono text-sm bg-black text-green-400">
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`mb-1 ${
                  entry.type === "command"
                    ? "text-cyan-400"
                    : entry.type === "error"
                      ? "text-red-400"
                      : "text-green-400"
                }`}
              >
                {entry.command && <div>{entry.command}</div>}
                {entry.output && <div className="whitespace-pre-line">{entry.output}</div>}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-cyan-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-green-400 outline-none font-mono"
              placeholder="Type a command..."
            />
            <span className="text-green-400 animate-pulse">|</span>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}
