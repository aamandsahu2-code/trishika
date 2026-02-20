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
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center will-change-transform relative"
    >
      {/* Decorative floating ribbons */}
      <motion.div
        initial={{ opacity: 0, rotate: -12, y: -10 }}
        animate={{ opacity: 0.6, rotate: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="absolute -top-2 -left-12 md:-left-20 text-2xl pointer-events-none"
        style={{ animation: "ribbonSway 3s ease-in-out infinite" }}
      >
        🎀
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 12, y: -10 }}
        animate={{ opacity: 0.6, rotate: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="absolute -top-2 -right-12 md:-right-20 text-xl pointer-events-none"
        style={{ animation: "ribbonSway 3.4s ease-in-out infinite", animationDelay: "-1.2s" }}
      >
        🎁
      </motion.div>

      {/* Cake emoji with layered glow ring */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulsing glow ring */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute rounded-full"
          style={{
            width: 120, height: 120,
            background: "radial-gradient(circle, rgba(255,143,171,0.22), transparent 70%)",
            animation: "orbPulse 2.5s ease-in-out infinite alternate",
          }}
        />
        {/* Inner shimmer ring */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute rounded-full border border-pink-200/60"
          style={{ width: 96, height: 96 }}
        />

        {/* Cake icon with bounce */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.34, 1.56, 0.64, 1], /* spring bounce */
          }}
          className="relative z-10 text-6xl md:text-7xl will-change-transform select-none"
        >
          🎂
        </motion.div>
      </div>

      {/* Main text — letter stagger */}
      <motion.p
        initial={false}
        className="my-5 text-xl md:text-2xl font-semibold text-foreground text-center flex flex-wrap justify-center leading-relaxed"
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.55 + i * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="will-change-transform"
            style={letter === " " ? { width: "0.28em", display: "inline-block" } : {}}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.p>

      {/* Action Button - Unlocks Audio Playback */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.2 }}
        className="mt-8 relative z-50"
      >
        <button
          onClick={() => onDone?.()}
          className="px-8 py-3 bg-pink-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-pink-500 transition-all active:scale-95 flex items-center gap-2 group"
        >
          <span>Open the Surprise</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✨
          </motion.span>
        </button>
      </motion.div>


      {/* Subtle sparkle stars */}
      {[
        { top: "8%", left: "12%", delay: 0.8, size: 14 },
        { top: "15%", right: "10%", delay: 1.2, size: 10 },
        { bottom: "18%", left: "18%", delay: 1.5, size: 12 },
        { bottom: "10%", right: "15%", delay: 1.0, size: 9 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-yellow-300"
          style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom, fontSize: s.size }}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{ opacity: [0, 1, 0.3, 1, 0], scale: [0, 1.2, 0.8, 1, 0], rotate: [0, 20, -10, 5, 0] }}
          transition={{ duration: 2.2, delay: s.delay, repeat: Infinity, repeatDelay: 1.5 }}
        >
          ✦
        </motion.div>
      ))}
    </motion.div>
  )
}
