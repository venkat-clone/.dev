"use client"

import { useEffect, useRef } from "react"

export default function PortfolioBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    function animate() {
      if (!ctx || !canvas) return

      // Ultra-subtle animated gradient
      const time = Date.now() * 0.0005
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `rgba(15, 23, 42, 0.95)`)
      gradient.addColorStop(0.5, `rgba(17, 24, 39, 0.98)`)
      gradient.addColorStop(1, `rgba(15, 23, 42, ${0.95 + Math.sin(time) * 0.02})`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Barely visible animated texture overlay
      ctx.globalAlpha = 0.03 + Math.sin(time * 2) * 0.01
      ctx.fillStyle = "rgba(148, 163, 184, 0.1)"
      for (let x = 0; x < canvas.width; x += 40) {
        for (let y = 0; y < canvas.height; y += 40) {
          ctx.fillRect(x + Math.sin(time + x * 0.01) * 2, y + Math.cos(time + y * 0.01) * 2, 2, 2)
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", resizeCanvas)
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
      <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0"
      />
  )
}