"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"
import WishScreen from "@/components/screens/WishScreen"
import CreditsScreen from "@/components/screens/CreditsScreen"
import BackgroundMusic from "@/components/BackgroundMusic"

/* ── Ambient particle config ── */
const PARTICLE_COUNT = 6 // Base count
const PARTICLE_COLORS = [
  "rgba(255,143,171,0.6)",
  "rgba(233,168,255,0.5)",
  "rgba(151,59,136,0.4)",
  "rgba(255,209,102,0.45)",
]

function AmbientParticles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 3 : PARTICLE_COUNT

    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.round(seededRandom(i) * 100 * 100) / 100,
      size: Math.round((4 + seededRandom(i + 100) * 8) * 100) / 100,
      duration: Math.round((12 + seededRandom(i + 200) * 12) * 100) / 100,
      delay: Math.round(seededRandom(i + 300) * -20 * 100) / 100,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    }))
    setParticles(newParticles)
  }, [])

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 1.2}px ${p.color}`,
            willChange: 'transform',
          }}
        />
      ))}
    </>
  )
}

/* ── Floating Stars Background ── */
function FloatingStars() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 3 : 6
    const newStars = Array.from({ length: count }, (_, i) => ({
      left: `${(i + 1) * (100 / (count + 1))}%`,
      delay: `${i * 2}s`
    }))
    setStars(newStars)
  }, [])

  return (
    <>
      <style jsx>{`
        .float-star {
          position: absolute;
          bottom: -20px;
          color: white;
          font-size: 18px;
          animation: floatStar 15s linear infinite;
          opacity: 0.5;
          pointer-events: none;
          z-index: 1;
          will-change: transform;
        }
        
        @keyframes floatStar {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% {
            transform: translateY(-110vh) scale(1);
            opacity: 0;
          }
        }
      `}</style>

      {stars.map((star, i) => (
        <div
          key={i}
          className="float-star"
          style={{
            left: star.left,
            animationDelay: star.delay,
          }}
        >
          ⭐
        </div>
      ))}
    </>
  )
}

/* ── Ambient glow orbs ── */
function GlowOrbs() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (isMobile) {
    return (
      <div className="glow-orb" style={{
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(255,143,171,0.2), transparent 70%)",
        top: "20%", left: "10%",
        opacity: 0.4,
      }} />
    )
  }

  return (
    <>
      <div className="glow-orb" style={{
        width: 300, height: 300,
        background: "radial-gradient(circle, rgba(255,143,171,0.4), transparent 70%)",
        top: "-60px", left: "-40px",
        animationDuration: "12s",
      }} />
      <div className="glow-orb" style={{
        width: 250, height: 250,
        background: "radial-gradient(circle, rgba(151,59,136,0.35), transparent 70%)",
        bottom: "-30px", right: "-40px",
        animationDuration: "15s",
        animationDelay: "-4s",
      }} />
      <div className="glow-orb" style={{
        width: 200, height: 200,
        background: "radial-gradient(circle, rgba(89,75,160,0.4), transparent 70%)",
        top: "40%", left: "60%",
        animationDuration: "18s",
        animationDelay: "-5s",
      }} />
    </>
  )
}

/* ── Progress indicator dots ── */
function ProgressDots({ current, total }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: current >= 1 ? 1 : 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-50"
    >
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          className={`rounded-full transition-all duration-500 ease-out ${i === current ? "dot-active" : i < current ? "dot-active opacity-50" : "dot-inactive"
            }`}
          style={{ width: i === current ? 24 : 8, height: 8 }}
          animate={{ width: i === current ? 24 : 8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  )
}

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} />,
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(4)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(5)} />,
    <WishScreen key="wish" onNext={() => setCurrentScreen(6)} />,
    <CreditsScreen key="credits" />,
  ]

  /* staggered transition variants - minimal for mobile */
  const pageVariants = {
    enter: {
      opacity: 0,
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2, // Very fast
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -4,
      transition: {
        duration: 0.15, // Very fast
        ease: "easeIn",
      },
    },
  }

  return (
    <main className="min-h-screen overflow-hidden relative" style={{ background: "var(--background)" }}>
      {/* Floating Stars Background */}
      <FloatingStars />

      {/* Ambient atmosphere */}
      <GlowOrbs />
      <AmbientParticles />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-2 sm:p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial="enter"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="flex items-center justify-center w-full"
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots (visible after loader) */}
      <ProgressDots current={currentScreen} total={7} />

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-4 right-4 text-sm text-black/40 pointer-events-none z-50 font-light"
      >
        KD
      </motion.div>

      {/* Background Music */}
      <BackgroundMusic />
    </main>
  )
}
