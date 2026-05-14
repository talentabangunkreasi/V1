'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function FlyingParticles() {
  const { isDarkMode } = useAppStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const animationRef = useRef<number>()
  const particleCount = 40

  // Initialize particles
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const initialParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5 - 0.2, // Slight upward bias
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.3,
    }))
    setParticles(initialParticles)
  }, [])

  // Track mouse
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Animate particles
  useEffect(() => {
    if (!isDarkMode || particles.length === 0) return

    const animate = () => {
      setParticles(prev => prev.map(particle => {
        let { x, y, vx, vy } = particle
        
        // Calculate distance from mouse
        const dx = mousePos.x - x
        const dy = mousePos.y - y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Repel from mouse (flee behavior)
        if (distance < 150) {
          const force = (150 - distance) / 150
          vx -= (dx / distance) * force * 0.5
          vy -= (dy / distance) * force * 0.5
        }
        
        // Apply velocity
        x += vx
        y += vy
        
        // Add slight randomness
        vx += (Math.random() - 0.5) * 0.05
        vy += (Math.random() - 0.5) * 0.05
        
        // Damping
        vx *= 0.99
        vy *= 0.99
        
        // Boundaries - wrap around
        const width = window.innerWidth
        const height = window.innerHeight
        
        if (x < -20) x = width + 20
        if (x > width + 20) x = -20
        if (y < -20) y = height + 20
        if (y > height + 20) y = -20
        
        return { ...particle, x, y, vx, vy }
      }))
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDarkMode, mousePos, particles.length])

  if (!isDarkMode) return null

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(255,255,255,${particle.opacity}) 0%, rgba(200,220,255,${particle.opacity * 0.5}) 50%, transparent 70%)`,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${particle.size * 2}px rgba(255,255,255,${particle.opacity * 0.5})`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.3, particle.opacity],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
