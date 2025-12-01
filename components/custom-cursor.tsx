"use client"

import { useState, useEffect, useRef } from "react"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [isOverCard, setIsOverCard] = useState(false)
  const cometTrailRef = useRef<Array<{ x: number; y: number; id: number; time: number }>>([])
  const idRef = useRef(0)
  const prevPosRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      const vx = e.clientX - prevPosRef.current.x
      const vy = e.clientY - prevPosRef.current.y
      setVelocity({ x: vx, y: vy })
      prevPosRef.current = { x: e.clientX, y: e.clientY }

      const cardElements = document.querySelectorAll(".card-3d")
      let overCard = false
      cardElements.forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect()
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          overCard = true
        }
      })
      setIsOverCard(overCard)

      cometTrailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        id: idRef.current++,
        time: 0,
      })

      // Keep only last 40 particles for longer tail
      if (cometTrailRef.current.length > 40) {
        cometTrailRef.current.shift()
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const updateTrail = () => {
      cometTrailRef.current = cometTrailRef.current.map((p) => ({ ...p, time: p.time + 1 }))
      animationFrameRef.current = requestAnimationFrame(updateTrail)
    }
    updateTrail()
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <>
      {/* Comet Shooting Star Trail */}
      {cometTrailRef.current.map((particle, index) => {
        const progress = index / Math.max(cometTrailRef.current.length, 1)
        const ageOpacity = Math.max(0, 1 - particle.time / 40)
        const size = 3 + progress * 6
        const blurAmount = 2 + progress * 8

        const hue = 40 + progress * 20 // Gold to orange-red
        const lightness = 60 + progress * 10

        return (
          <div
            key={particle.id}
            className="fixed pointer-events-none"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              transform: `translate(-50%, -50%)`,
            }}
          >
            {/* Glow halo */}
            <div
              style={{
                position: "absolute",
                width: `${size * 3}px`,
                height: `${size * 3}px`,
                borderRadius: "50%",
                background: `radial-gradient(circle, hsla(${hue}, 100%, ${lightness}%, ${0.6 * ageOpacity}) 0%, transparent 70%)`,
                filter: `blur(${blurAmount}px)`,
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Solid particle */}
            <div
              style={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                background: `hsl(${hue}, 100%, ${lightness}%)`,
                boxShadow: `0 0 ${size * 2}px hsla(${hue}, 100%, ${lightness}%, ${ageOpacity})`,
                opacity: ageOpacity * 0.9,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        )
      })}

      {/* Main Comet Head */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: isOverCard ? "60px" : "45px",
            height: isOverCard ? "60px" : "45px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255, 215, 0, ${isOverCard ? 0.8 : 0.5}) 0%, transparent 100%)`,
            filter: "blur(15px)",
            transform: "translate(-50%, -50%)",
            transition: "all 0.2s ease-out",
            boxShadow: `0 0 ${isOverCard ? 40 : 25}px rgba(255, 215, 0, ${isOverCard ? 0.8 : 0.5})`,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: isOverCard ? "40px" : "30px",
            height: isOverCard ? "40px" : "30px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255, 165, 0, ${isOverCard ? 0.7 : 0.4}) 0%, transparent 100%)`,
            filter: "blur(8px)",
            transform: "translate(-50%, -50%)",
            transition: "all 0.2s ease-out",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: isOverCard ? "18px" : "12px",
            height: isOverCard ? "18px" : "12px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #ffff99 0%, #ffd700 40%, #ff8c00 100%)",
            boxShadow: `0 0 ${isOverCard ? 30 : 20}px rgba(255, 215, 0, 1), 
                        0 0 ${isOverCard ? 50 : 35}px rgba(255, 140, 0, 0.8),
                        inset -2px -2px 5px rgba(0, 0, 0, 0.3)`,
            transform: "translate(-50%, -50%)",
            transition: "all 0.2s ease-out",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: isOverCard ? "8px" : "5px",
            height: isOverCard ? "8px" : "5px",
            borderRadius: "50%",
            background: "#ffffff",
            boxShadow: "0 0 8px rgba(255, 255, 255, 1)",
            transform: "translate(-50%, -50%)",
            transition: "all 0.2s ease-out",
          }}
        />
      </div>
    </>
  )
}
