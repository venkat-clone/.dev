"use client"

import ParticleBackground from "@/components/particle-background"
import ScrollProgress from "@/components/scroll-progress"
import BlogSection from "@/components/blog-section"

export default function Portfolio() {


    return (
        <div className="bg-black text-white">
            <ScrollProgress />
            <ParticleBackground />
            <div className="relative z-10">
                <BlogSection />
            </div>
        </div>
    )
}
