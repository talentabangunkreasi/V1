'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'

export function IntroScreen() {
  const [phase, setPhase] = useState(0)
  const { setIntroComplete, setDarkMode } = useAppStore()

  useEffect(() => {
    // Phase 0: Logo appears
    const timer1 = setTimeout(() => setPhase(1), 800)
    // Phase 1: Text appears
    const timer2 = setTimeout(() => setPhase(2), 2000)
    // Phase 2: Tagline
    const timer3 = setTimeout(() => setPhase(3), 3500)
    // Phase 3: Fade out and complete
    const timer4 = setTimeout(() => {
      setDarkMode(true)
      setIntroComplete(true)
    }, 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [setIntroComplete, setDarkMode])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 20% 20%, oklch(0.35 0.15 260) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, oklch(0.30 0.20 290) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, oklch(0.25 0.12 270) 0%, transparent 70%),
                oklch(0.08 0.03 260)
              `
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-1 rounded-full bg-tech-blue-light/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          <svg className="size-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-tech-blue" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: phase >= 0 ? 1 : 0, rotate: phase >= 0 ? 0 : -180 }}
            transition={{ type: "spring", duration: 1.2, bounce: 0.4 }}
            className="relative"
          >
            {/* Logo glow */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: 'linear-gradient(135deg, oklch(0.55 0.2 250), oklch(0.55 0.25 290))' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Logo container -> DISINI YANG DIUBAH UNTUK LOGO LONJONG PNG */}
            <div className="relative w-48 h-28 md:w-56 md:h-32 rounded-2xl bg-gradient-to-br from-tech-blue to-tech-purple p-1 shadow-2xl">
              <div className="flex size-full items-center justify-center rounded-xl bg-bg-darker p-4">
                <img 
                  src="logo-pt.png" 
                  alt="Logo PT Talenta Bangun Kreasi" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Company name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="mt-8 text-center"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-foreground">
              <span className="bg-gradient-to-r from-tech-blue-light via-white to-tech-purple-light bg-clip-text text-transparent">
                PT Talenta Bangun Kreasi
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="mt-4"
          >
            <p className="text-sm md:text-lg text-muted-foreground tracking-wide">
              Membangun Kreasi, Mewujudkan Impian
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, scaleX: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            className="mt-8 h-1 w-48 md:w-64 overflow-hidden rounded-full bg-muted origin-left"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-tech-blue via-tech-purple to-tech-blue"
              initial={{ x: '-100%' }}
              animate={{ x: phase >= 2 ? '100%' : '-100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Enter text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-xs text-muted-foreground animate-pulse"
          >
            Memuat pengalaman...
          </motion.p>
        </div>

        {/* Corner decorations */}
        <motion.div
          className="absolute top-0 left-0 size-32 md:size-48"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5 }}
        >
          <svg viewBox="0 0 100 100" className="size-full text-tech-blue">
            <path d="M0 0 L100 0 L0 100 Z" fill="currentColor" opacity="0.1" />
            <path d="M0 0 L50 0 L0 50 Z" fill="currentColor" opacity="0.2" />
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute bottom-0 right-0 size-32 md:size-48 rotate-180"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5 }}
        >
          <svg viewBox="0 0 100 100" className="size-full text-tech-purple">
            <path d="M0 0 L100 0 L0 100 Z" fill="currentColor" opacity="0.1" />
            <path d="M0 0 L50 0 L0 50 Z" fill="currentColor" opacity="0.2" />
          </svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
