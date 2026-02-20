"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail } from "lucide-react"
import Button from "../Button"

const photos = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
]

/* Stagger variants */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const childVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export default function PhotosScreen({ onNext }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#fff8fc] p-6 rounded-[50px] drop-shadow-xl w-full max-w-110 relative flex flex-col items-center gap-4 my-6 card-glow overflow-hidden"
    >
      {/* Floating decorations - reduced count */}
      {[
        { emoji: "📸", top: "5%", left: "8%" },
        { emoji: "💜", top: "6%", right: "8%" },
      ].map((d, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-base opacity-30"
          style={{ top: d.top, left: d.left, right: d.right }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {d.emoji}
        </motion.div>
      ))}

      {/* Header */}
      <motion.div variants={childVariants} className="text-center">
        <h2 className="shimmer-text text-2xl font-semibold" style={{
          background: "linear-gradient(105deg, var(--accent) 0%, #7c5cbf 50%, var(--accent) 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "shimmerSlide 4s linear infinite",
        }}>
          Sweet Moments
        </h2>
        <p className="text-xs text-accent/50 mt-1">(Swipe left/right)</p>
      </motion.div>

      {/* Photo carousel box */}
      <motion.div
        variants={childVariants}
        className="relative p-4 md:p-6 bg-linear-to-b from-white to-violet-100 w-full rounded-[40px] flex flex-col items-center justify-center shadow-inner"
      >
        <div className="relative z-10">
          <Swiper
            effect="fade"
            modules={[EffectFade, Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="w-56 h-72 md:w-64 md:h-80"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gray-50 border border-violet-100">
                  <Image
                    src={src}
                    alt={`Memory ${i + 1}`}
                    fill
                    priority={i === 0}
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 640px) 224px, 256px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Slide indicator dots */}
        <div className="flex gap-2 mt-4 relative z-10">
          {photos.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full transition-all duration-400 ease-out"
              style={{
                height: 6,
                background: i === activeIndex ? "var(--accent)" : "rgba(89,75,160,0.22)",
                boxShadow: i === activeIndex ? "0 0 8px rgba(89,75,160,0.4)" : "none",
              }}
              animate={{ width: i === activeIndex ? 22 : 6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={childVariants} className="mt-4 flex justify-center">
        <Button onClick={onNext} className="bg-[#ddd6ff] text-accent relative overflow-hidden group">
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
          />
          <Mail size={18} className="relative z-10" />
          <span className="relative z-10">Open My Message</span>
        </Button>
      </motion.div>
    </motion.div>
  )
}
