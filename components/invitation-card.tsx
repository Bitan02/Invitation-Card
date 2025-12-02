"use client"

import type React from "react"

import { useState, useRef } from "react"

export default function InvitationCard() {
  const [rotationY, setRotationY] = useState(0)
  const [rotationX, setRotationX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [lastRotationY, setLastRotationY] = useState(0)
  const [lastRotationX, setLastRotationX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setStartY(e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY

    // Calculate rotation based on drag distance
    // Sensitivity factor to convert pixels to degrees
    const newRotationY = lastRotationY + deltaX / 5
    const newRotationX = lastRotationX - deltaY / 5

    setRotationY(newRotationY)
    setRotationX(newRotationX)
  }

  const handleMouseUp = () => {
    setLastRotationY(rotationY)
    setLastRotationX(rotationX)
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const deltaX = e.touches[0].clientX - startX
    const deltaY = e.touches[0].clientY - startY

    const newRotationY = lastRotationY + deltaX / 5
    const newRotationX = lastRotationX - deltaY / 5

    setRotationY(newRotationY)
    setRotationX(newRotationX)
  }

  const handleTouchEnd = () => {
    setLastRotationY(rotationY)
    setLastRotationX(rotationX)
    setIsDragging(false)
  }

  // Adjust background gradient based on rotation
  const gradientAngle = (rotationY * 1.5) % 360

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(${gradientAngle}deg, #1a0a1f 0%, #4a0e4e 25%, #8b3a62 50%, #d4af37 75%, #1a0a1f 100%)`,
        }}
      >
        {/* Overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      </div>

      {/* Main Card Container - Centered */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full perspective">
        <style>{`
          .perspective {
            perspective: 1000px;
          }

          .card-3d {
            transform-style: preserve-3d;
            transition: ${isDragging ? "none" : "transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)"};
          }

          .card-side {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }

          .card-front {
            transform: rotateY(0deg);
          }

          .card-back {
            transform: rotateY(180deg);
          }

          @keyframes bubble {
            0%, 100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            50% {
              opacity: 0.8;
              transform: translateY(-8px) scale(1.05);
            }
          }

          .bubble-letter {
            display: inline-block;
            animation: bubble 2s ease-in-out infinite;
          }

          .bubble-letter:nth-child(1) { animation-delay: 0s; }
          .bubble-letter:nth-child(2) { animation-delay: 0.1s; }
          .bubble-letter:nth-child(3) { animation-delay: 0.2s; }
          .bubble-letter:nth-child(4) { animation-delay: 0.3s; }
          .bubble-letter:nth-child(5) { animation-delay: 0.4s; }
          .bubble-letter:nth-child(6) { animation-delay: 0.5s; }
          .bubble-letter:nth-child(7) { animation-delay: 0.6s; }
          .bubble-letter:nth-child(8) { animation-delay: 0.7s; }
          .bubble-letter:nth-child(9) { animation-delay: 0.8s; }
          .bubble-letter:nth-child(10) { animation-delay: 0.9s; }
          .bubble-letter:nth-child(11) { animation-delay: 1s; }
          .bubble-letter:nth-child(12) { animation-delay: 1.1s; }
          .bubble-letter:nth-child(13) { animation-delay: 1.2s; }
          .bubble-letter:nth-child(14) { animation-delay: 1.3s; }
          .bubble-letter:nth-child(15) { animation-delay: 1.4s; }
          .bubble-letter:nth-child(16) { animation-delay: 1.5s; }
          .bubble-letter:nth-child(17) { animation-delay: 1.6s; }
          .bubble-letter:nth-child(18) { animation-delay: 1.7s; }
          .bubble-letter:nth-child(19) { animation-delay: 1.8s; }
          .bubble-letter:nth-child(20) { animation-delay: 1.9s; }
          .bubble-letter:nth-child(21) { animation-delay: 2s; }
          .bubble-letter:nth-child(22) { animation-delay: 2.1s; }
          .bubble-letter:nth-child(23) { animation-delay: 2.2s; }
          .bubble-letter:nth-child(24) { animation-delay: 2.3s; }
          .bubble-letter:nth-child(25) { animation-delay: 2.4s; }
          .bubble-letter:nth-child(26) { animation-delay: 2.5s; }
          .bubble-letter:nth-child(27) { animation-delay: 2.6s; }
          .bubble-letter:nth-child(28) { animation-delay: 2.7s; }
          .bubble-letter:nth-child(29) { animation-delay: 2.8s; }
          .bubble-letter:nth-child(30) { animation-delay: 2.9s; }
          .bubble-letter:nth-child(31) { animation-delay: 3s; }
          .bubble-letter:nth-child(32) { animation-delay: 3.1s; }
          .bubble-letter:nth-child(33) { animation-delay: 3.2s; }

          .glow-text {
            filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.6));
          }
        `}</style>

        <div
          ref={cardRef}
          className="card-3d w-[85vw] max-w-[380px] h-auto aspect-[3/4] md:w-[420px] md:aspect-[3/4] flex-shrink-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
            transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
          }}
        >
          {/* Front Side */}
          <div
            className="card-side card-front absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
            style={{
              transform: "rotateY(0deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src="/card1.jpg"
              alt="Invitation Card Front"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Back Side */}
          <div
            className="card-side card-back absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src="/card2.jpg"
              alt="Invitation Card Back"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Hint Text */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <p className="text-white/60 text-sm md:text-base font-light tracking-widest">
          {isDragging ? "ROTATING..." : "DRAG TO ROTATE"}
        </p>
      </div>

      {/* Footer with Bubbling Text */}
      {/* PREMIUM FOOTER */}
      <div className="absolute bottom-16 md:bottom-14 lg:bottom-6 xl:bottom-4 left-1/2 -translate-x-1/2 w-full text-center select-none pointer-events-none">
        <p className="footer-text inline-block px-6 py-2 rounded-xl">
          {"You are invited by Prabir Kumar Dhara".split("").map((ch, i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.05}s` }}
              className={ch === " " ? "footer-space" : "footer-letter"}
            >
              {ch}
            </span>
          ))}
        </p>

        <style>{`
  .footer-letter {
    display: inline-block;
    background: linear-gradient(90deg, #ffeb99, #ffcc33, #ff9900);
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 0 0 10px rgba(255,200,120,0.7),
                 0 0 18px rgba(255,160,60,0.5);
    animation: floatUp 2.8s ease-in-out infinite;
  }

  /* Spacer acts as a NORMAL SPACE with animation disabled */
  .footer-space {
    display: inline-block;
    width: 0.5rem;     /* adjust space size */
  }

  @keyframes floatUp {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
`}</style>
      </div>


      {/* Mobile Touch Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 md:hidden">
        <p className="text-white/40 text-xs animate-pulse">← Swipe to rotate →</p>
      </div>
    </div>
  )
}
