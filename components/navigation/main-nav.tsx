'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, NAV_ITEMS } from '@/lib/store'

// Nav icons
const NavIcons: Record<string, React.FC<{ className?: string }>> = {
  home: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  ),
  shop: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  about: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  testimonial: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21,15 16,10 5,21" />
    </svg>
  ),
  contact: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
}

// Desktop sidebar navigation (right side) - Simple vertical pill with icons
export function DesktopNav() {
  const { activeSection, setActiveSection } = useAppStore()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleClick = (id: string, href: string) => {
    setActiveSection(id)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:flex"
    >
      {/* Pill container - vertical oval shape with stroke */}
      <div className="relative rounded-full border-2 border-tech-blue/30 bg-background/20 p-2 backdrop-blur-md">
        {/* Active indicator bubble */}
        <motion.div
          className="absolute left-1/2 w-10 h-10 -translate-x-1/2 rounded-full bg-tech-blue/20 border border-tech-blue/50"
          layoutId="activeNavBubble"
          initial={false}
          animate={{
            top: NAV_ITEMS.findIndex(item => item.id === activeSection) * 52 + 8,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        <div className="relative flex flex-col items-center gap-3">
          {NAV_ITEMS.map((item, index) => {
            const IconComponent = NavIcons[item.id]
            const isActive = activeSection === item.id
            const isHovered = hoveredItem === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => handleClick(item.id, item.href)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="group relative flex size-10 items-center justify-center rounded-full transition-all duration-300"
              >
                {/* Icon */}
                <IconComponent
                  className={`
                    size-5 transition-all duration-300
                    ${isActive 
                      ? 'text-tech-blue-light scale-110' 
                      : isHovered 
                        ? 'text-tech-blue scale-105'
                        : 'text-muted-foreground'
                    }
                  `}
                />
                
                {/* Tooltip label - shows on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.9 }}
                      className="absolute right-14 whitespace-nowrap rounded-lg bg-card/90 px-3 py-1.5 text-sm font-medium text-foreground shadow-lg backdrop-blur border border-border/50"
                    >
                      {item.label}
                      {/* Arrow */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-4 border-transparent border-l-card/90" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}

// Mobile Header with simple theme toggle
export function MobileNav() {
  const { activeSection, setActiveSection, isDarkMode, toggleDarkMode, isMobileMenuOpen, setMobileMenuOpen } = useAppStore()

  const handleClick = (id: string, href: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between p-4 lg:hidden"
      >
        {/* Logo */}
        <Logo />
        
        <div className="flex items-center gap-3">
          {/* Simple Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className={`
              relative size-10 rounded-full transition-all duration-300 border-2
              ${isDarkMode 
                ? 'border-amber-400/50 bg-amber-400/10' 
                : 'border-blue-400/50 bg-blue-400/10'
              }
            `}
          >
            <div className="flex size-full items-center justify-center">
              {isDarkMode ? (
                <svg className="size-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="size-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </div>
          </button>
          
          {/* Menu button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="flex size-10 items-center justify-center rounded-xl border-2 border-border/50 bg-background/20 backdrop-blur"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={{ 
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                }}
                className="h-0.5 w-5 bg-foreground transition-colors"
              />
              <motion.span
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="h-0.5 w-5 bg-foreground"
              />
              <motion.span
                animate={{ 
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                }}
                className="h-0.5 w-5 bg-foreground transition-colors"
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-border/50 bg-card p-6 pb-8"
            >
              {NAV_ITEMS.map((item, index) => {
                const IconComponent = NavIcons[item.id]
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleClick(item.id, item.href)}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      flex w-full items-center gap-4 rounded-xl px-4 py-4 transition-all
                      ${activeSection === item.id 
                        ? 'bg-tech-blue/10 text-tech-blue-light' 
                        : 'text-foreground/80 hover:bg-muted'
                      }
                    `}
                  >
                    <IconComponent className={`size-5 ${activeSection === item.id ? 'text-tech-blue-light' : 'text-muted-foreground'}`} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                )
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom nav bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border/50 bg-card/80 px-2 py-3 backdrop-blur-lg lg:hidden"
      >
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const IconComponent = NavIcons[item.id]
          const isActive = activeSection === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id, item.href)}
              className={`
                flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 transition-all
                ${isActive 
                  ? 'text-tech-blue-light' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <IconComponent className={`size-5 ${isActive ? 'text-tech-blue-light' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </motion.nav>
    </>
  )
}

// Logo component
export function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3"
    >
      <div className="relative size-10 rounded-xl bg-gradient-to-br from-tech-blue to-tech-purple p-0.5 shadow-lg">
        <div className="flex size-full items-center justify-center rounded-lg bg-background">
          <span className="text-sm font-bold bg-gradient-to-r from-tech-blue-light to-tech-purple-light bg-clip-text text-transparent">
            TBK
          </span>
        </div>
      </div>
      <div className="hidden sm:block">
        <p className="text-xs font-semibold text-foreground">PT Talenta</p>
        <p className="text-[10px] text-muted-foreground">Bangun Kreasi</p>
      </div>
    </motion.div>
  )
}
