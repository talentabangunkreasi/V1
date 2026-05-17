'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'

// Components
import { IntroScreen } from '@/components/intro/intro-screen'
import { AnimatedBackground } from '@/components/effects/animated-background'
import { FlyingParticles } from '@/components/effects/flying-particles'
import { DesktopNav, MobileNav } from '@/components/navigation/main-nav'
import { HomeSection } from '@/components/sections/home-section'
import { ShopSection } from '@/components/sections/shop-section'
import { AboutSection } from '@/components/sections/about-section'
import { TestimonialSection } from '@/components/sections/testimonial-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function HomePage() {
  const { introComplete, isDarkMode, setActiveSection } = useAppStore()

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Scroll sequence workaround khusus untuk HP biar navigasi presisi sempurna
  useEffect(() => {
    if (introComplete) {
      const isMobile = window.innerWidth <= 768

      if (isMobile) {
        // LANGKAH 1: Langsung mampir instan ke Kontak (contact) di paling bawah
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'auto' })
        }

        // LANGKAH 2: Kasih delay 300ms, lalu pindah instan ke Tentang Kami (about)
        setTimeout(() => {
          const aboutSection = document.getElementById('about')
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'auto' })
          }

          // LANGKAH 3: Kasih delay 400ms lagi biar layout nge-pres total, baru scroll halus ke Home
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setActiveSection('home')
          }, 2000)

        }, 300)

      } else {
        // Untuk desktop, langsung normal ke paling atas
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        window.scrollTo(0, 0)
        setActiveSection('home')
      }
      
      // Double check standar bawaan codingan lu
      setTimeout(() => {
        if (!isMobile) {
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
          window.scrollTo(0, 0)
        }
      }, 100)
    }
  }, [introComplete, setActiveSection])

  // Track scroll position for active section
  useEffect(() => {
    if (!introComplete) return

    const handleScroll = () => {
      const sections = ['home', 'shop', 'about', 'testimonial', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [introComplete, setActiveSection])

  return (
    <>
      {/* Intro screen */}
      <AnimatePresence mode="wait">
        {!introComplete && <IntroScreen />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Background effects */}
            <AnimatedBackground />
            <FlyingParticles />

            {/* Navigation */}
            <DesktopNav />
            <MobileNav />

            {/* Main sections */}
            <main className="relative">
              <HomeSection />
              <ShopSection />
              <AboutSection />
              <TestimonialSection />
              <ContactSection />
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Footer component
function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/50 py-8 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          {/* Logo & copyright */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-tech-blue to-tech-purple">
              <span className="text-sm font-bold text-white">TBK</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">PT Talenta Bangun Kreasi</p>
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Power by software engginering | Hakim |.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { href: '#home', label: 'Home' },
              { href: '#shop', label: 'Produk' },
              { href: '#about', label: 'Tentang' },
              { href: '#testimonial', label: 'Portfolio' },
              { href: '#contact', label: 'Kontak' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Made with love */}
          <p className="text-xs text-muted-foreground">
            Dibuat dengan dedikasi untuk kualitas terbaik
          </p>
        </div>
      </div>
    </footer>
  )
}
