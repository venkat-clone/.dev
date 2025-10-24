"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import HomeSection from "@/components/home-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import ParticleBackground from "@/components/particle-background"
import TerminalConsole from "@/components/terminal-console"
import ScrollHeader from "@/components/scroll-header"
import ScrollProgress from "@/components/scroll-progress"
import BlogSection from "@/components/blog-section"

export default function Portfolio() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showScrollHeader, setShowScrollHeader] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "~") {
        setShowTerminal(!showTerminal)
      }
    }

    const handleScroll = () => {
      setShowScrollHeader(window.scrollY > window.innerHeight * 0.5)
    }

    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [showTerminal])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-black text-white">
      <ScrollProgress />
      <ParticleBackground />

      {showScrollHeader && (
        <ScrollHeader soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} scrollToSection={scrollToSection} />
      )}

      <div className="relative z-10">
        <section id="hero">
          <HeroSection onNavigate={scrollToSection} />
        </section>

        {/* <section id="home">
          <HomeSection />
        </section> */}

        <section id="projects">
          <ProjectsSection />
        </section>
        
        <section id="blog">
          <BlogSection />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>


        <section id="contact">
          <ContactSection />
        </section>
      </div>

      {showTerminal && <TerminalConsole onClose={() => setShowTerminal(false)} />}
    </div>
  )
}
