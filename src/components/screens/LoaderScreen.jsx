"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"

export default function LoaderScreen({ onDone }) {

  // Removed automatic timer to allow user interaction for audio playback


  /* letter-by-letter stagger data */
  const mainText = "Loading your birthday surprise..."
  const letters = mainText.split("")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center will-change-transform relative"
    >
      {/* Decorative floating ribbons - only on desktop for performance */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute -top-2 -left-20 text-2xl pointer-events-none"
          style={{ animation: "ribbonSway 4s ease-in-out infinite" }}
        >
          🎀
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute -top-2 -right-20 text-xl pointer-events-none"
          style={{ animation: "ribbonSway 4.5s ease-in-out infinite", animationDelay: "-1s" }}
        >
          🎁
        </motion.div>
      </div>

      {/* Cake emoji with layered glow ring */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulsing glow ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 120, height: 120,
            background: "radial-gradient(circle, rgba(255,143,171,0.22), transparent 70%)",
            animation: "orbPulse 3s ease-in-out infinite alternate",
          }}
        />

        {/* Cake icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-6xl md:text-7xl will-change-transform select-none"
        >
          🎂
        </motion.div>
      </div>

      {/* Main text — Simplified for mobile */}
      <div className="my-5 text-xl md:text-2xl font-semibold text-foreground text-center px-4">
        {/* Only stagger on desktop */}
        <div className="hidden md:flex flex-wrap justify-center leading-relaxed">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.03, duration: 0.4 }}
              style={letter === " " ? { width: "0.28em" } : {}}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>
        {/* Simple fade on mobile */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="md:hidden"
        >
          {mainText}
        </motion.span>
      </div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mt-8 relative z-50"
      >
        <button
          onClick={() => onDone?.()}
          className="px-10 py-4 bg-pink-400 text-white rounded-full font-bold shadow-lg active:scale-95 transition-all text-lg"
        >
          Open the Surprise ✨
        </button>
      </motion.div>

      {/* Subtle sparkle stars - reduced count */}
      {[
        { top: "10%", left: "15%", delay: 0.8, size: 14 },
        { bottom: "15%", right: "15%", delay: 1.0, size: 10 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-yellow-300 opacity-0"
          style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom, fontSize: s.size }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 3, delay: s.delay, repeat: Infinity }}
        >
          ✦
        </motion.div>
      ))}
    </motion.div>
  )
}
