'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'

export function AnimatedBackground() {
  const { isDarkMode } = useAppStore()

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDarkMode
            ? [
                'linear-gradient(-45deg, oklch(0.08 0.04 260), oklch(0.12 0.06 280), oklch(0.06 0.05 250), oklch(0.10 0.07 300))',
                'linear-gradient(-45deg, oklch(0.10 0.06 280), oklch(0.08 0.04 260), oklch(0.12 0.07 300), oklch(0.06 0.05 250))',
                'linear-gradient(-45deg, oklch(0.08 0.04 260), oklch(0.12 0.06 280), oklch(0.06 0.05 250), oklch(0.10 0.07 300))',
              ]
            : [
                'linear-gradient(-45deg, oklch(0.97 0.02 260), oklch(0.94 0.03 280), oklch(0.98 0.02 250), oklch(0.92 0.04 300))',
                'linear-gradient(-45deg, oklch(0.94 0.03 280), oklch(0.97 0.02 260), oklch(0.92 0.04 300), oklch(0.98 0.02 250))',
                'linear-gradient(-45deg, oklch(0.97 0.02 260), oklch(0.94 0.03 280), oklch(0.98 0.02 250), oklch(0.92 0.04 300))',
              ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Animated blobs */}
      <motion.div
        className="absolute -left-1/4 -top-1/4 size-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, oklch(0.4 0.2 260) 0%, transparent 70%)'
            : 'radial-gradient(circle, oklch(0.7 0.15 260) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -bottom-1/4 -right-1/4 size-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, oklch(0.35 0.25 290) 0%, transparent 70%)'
            : 'radial-gradient(circle, oklch(0.75 0.18 290) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute left-1/4 top-1/2 size-1/3 rounded-full opacity-20 blur-3xl"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, oklch(0.35 0.18 250) 0%, transparent 70%)'
            : 'radial-gradient(circle, oklch(0.8 0.12 250) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
