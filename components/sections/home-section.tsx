'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useAppStore, COMPANY_INFO } from '@/lib/store'
import { Logo } from '@/components/navigation/main-nav'

// Dynamically import 3D component to avoid SSR issues
const ModernHouse3D = dynamic(
  () => import('@/components/3d/modern-house').then(mod => mod.ModernHouse3D),
  { 
    ssr: false,
    loading: () => (
      <div className="flex size-full min-h-[300px] items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-4 border-tech-blue border-t-transparent" />
      </div>
    )
  }
)

// Simple theme toggle button (no lamp pull)
function SimpleThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useAppStore()
  
  return (
    <motion.button
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 border-2
        ${isDarkMode 
          ? 'border-amber-400/50 bg-amber-400/10 hover:bg-amber-400/20' 
          : 'border-blue-400/50 bg-blue-400/10 hover:bg-blue-400/20'
        }
      `}
    >
      <div className="flex items-center justify-center">
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
      <span className={`text-sm font-medium ${isDarkMode ? 'text-amber-400' : 'text-blue-400'}`}>
        {isDarkMode ? 'Siang' : 'Malam'}
      </span>
    </motion.button>
  )
}

// Social icons
const SocialIcons = () => (
  <div className="flex items-center gap-3">
    {[
      { name: 'Instagram', href: COMPANY_INFO.social.instagram, icon: InstagramIcon },
      { name: 'Facebook', href: COMPANY_INFO.social.facebook, icon: FacebookIcon },
      { name: 'TikTok', href: COMPANY_INFO.social.tiktok, icon: TikTokIcon },
    ].map((social, index) => (
      <motion.a
        key={social.name}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 + index * 0.1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        className="group relative"
      >
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-tech-blue to-tech-purple opacity-0 blur transition-opacity group-hover:opacity-50" />
        <div className="relative flex size-9 items-center justify-center rounded-lg bg-card/50 backdrop-blur transition-colors group-hover:bg-card border border-border/30">
          <social.icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
        </div>
      </motion.a>
    ))}
  </div>
)

export function HomeSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Desktop layout */}
      <div className="hidden lg:block">
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between p-6"
        >
          {/* Logo */}
          <Logo />
          
          <div className="flex items-center gap-4">
            {/* Social icons */}
            <SocialIcons />
            
            {/* Simple Theme toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <SimpleThemeToggle />
            </motion.div>
          </div>
        </motion.header>

        {/* Main content */}
        <div className="relative flex min-h-screen items-center">
          {/* Left side - Text content */}
          <div className="relative z-20 w-1/2 px-12 py-24">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-xl"
            >
              {/* Welcome badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-tech-blue/10 px-4 py-2 backdrop-blur border border-tech-blue/20"
              >
                <span className="size-2 animate-pulse rounded-full bg-tech-blue" />
                <span className="text-sm text-tech-blue-light">HAI</span>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6 text-4xl font-bold leading-tight xl:text-5xl"
              >
                <span className="text-foreground">Selamat Datang di</span>
                <br />
                <span className="bg-gradient-to-r from-tech-blue-light via-tech-purple-light to-tech-blue-light bg-clip-text text-transparent">
                  {COMPANY_INFO.name}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8 text-lg leading-relaxed text-muted-foreground"
              >
                {COMPANY_INFO.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#shop"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-tech-blue to-tech-purple px-8 py-4 font-semibold text-white shadow-lg shadow-tech-blue/25 transition-all hover:shadow-xl hover:shadow-tech-blue/30"
                >
                  <span className="relative z-10">Lihat Produk</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-tech-purple to-tech-blue opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-border bg-card/50 px-8 py-4 font-semibold text-foreground backdrop-blur transition-all hover:bg-card hover:shadow-lg"
                >
                  Hubungi Kami
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex gap-8"
              >
                {[
                  { value: '500+', label: 'Proyek Selesai' },
                  { value: '26+', label: 'Tahun Pengalaman' },
                  { value: '98%', label: 'Klien Puas' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold text-tech-blue-light">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - 3D House */}
          <div className="absolute right-0 top-0 h-full w-1/2">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative size-full"
            >
              <ModernHouse3D />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden">
        <div className="relative min-h-screen px-4 pb-24 pt-20">
          {/* Welcome content */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            {/* Welcome badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-tech-blue/10 px-3 py-1.5 backdrop-blur border border-tech-blue/20">
              <span className="size-1.5 animate-pulse rounded-full bg-tech-blue" />
              <span className="text-xs text-tech-blue-light">HAI</span>
            </div>

            {/* Main heading */}
            <h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl">
              <span className="text-foreground">Selamat Datang di</span>
              <br />
              <span className="bg-gradient-to-r from-tech-blue-light via-tech-purple-light to-tech-blue-light bg-clip-text text-transparent">
                {COMPANY_INFO.name}
              </span>
            </h1>

            {/* Description */}
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {COMPANY_INFO.description}
            </p>

            {/* Social icons */}
            <div className="mb-6">
              <SocialIcons />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#shop"
                className="flex-1 rounded-xl bg-gradient-to-r from-tech-blue to-tech-purple px-6 py-3 text-center text-sm font-semibold text-white shadow-lg"
              >
                Lihat Produk
              </a>
              <a
                href="#contact"
                className="flex-1 rounded-xl border border-border bg-card/50 px-6 py-3 text-center text-sm font-semibold text-foreground backdrop-blur"
              >
                Hubungi Kami
              </a>
            </div>
          </motion.div>

          {/* 3D House */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur"
          >
            <ModernHouse3D />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <p className="text-xs text-muted-foreground">
                Geser untuk memutar | Pinch untuk zoom
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 grid grid-cols-3 gap-3"
          >
            {[
              { value: '500+', label: 'Proyek' },
              { value: '26+', label: 'Tahun' },
              { value: '98%', label: 'Puas' },
            ].map((stat, index) => (
              <div key={index} className="rounded-xl bg-card/50 p-3 text-center backdrop-blur border border-border/30">
                <p className="text-lg font-bold text-tech-blue-light">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-xs text-muted-foreground">Scroll untuk explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="size-6 rounded-full border-2 border-muted-foreground/50"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mx-auto mt-1.5 size-1.5 rounded-full bg-muted-foreground"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Icon components
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  )
}
