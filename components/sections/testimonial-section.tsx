'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Dummy project data
const projects = [
  {
    id: '1',
    title: 'Rumah Modern Minimalis',
    location: 'Jakarta Selatan',
    category: 'Konstruksi',
    description: 'Pembangunan rumah 2 lantai dengan desain modern minimalis. Luas bangunan 150m² dengan 4 kamar tidur dan 3 kamar mandi.',
    year: '2024',
    images: ['/projects/house-1.jpg'],
  },
  {
    id: '2',
    title: 'Kitchen Set Custom',
    location: 'Tangerang',
    category: 'Custom Furnitur',
    description: 'Kitchen set dengan island dan storage maksimal. Menggunakan material HPL premium dengan finishing duco.',
    year: '2024',
    images: ['/projects/kitchen-1.jpg'],
  },
  {
    id: '3',
    title: 'Renovasi Apartemen',
    location: 'BSD City',
    category: 'Renovasi',
    description: 'Renovasi total apartemen 3BR menjadi hunian modern dengan konsep open space dan pencahayaan alami.',
    year: '2023',
    images: ['/projects/apartment-1.jpg'],
  },
  {
    id: '4',
    title: 'Living Room Set',
    location: 'Depok',
    category: 'Furnitur',
    description: 'Set furnitur ruang tamu lengkap dengan sofa, coffee table, TV cabinet, dan rak display.',
    year: '2023',
    images: ['/projects/living-1.jpg'],
  },
  {
    id: '5',
    title: 'Kamar Tidur Utama',
    location: 'Bekasi',
    category: 'Custom Furnitur',
    description: 'Custom bedroom set dengan walk-in closet, tempat tidur king size, dan meja rias built-in.',
    year: '2023',
    images: ['/projects/bedroom-1.jpg'],
  },
  {
    id: '6',
    title: 'Rumah Tropis Modern',
    location: 'Bogor',
    category: 'Konstruksi',
    description: 'Rumah dengan konsep tropis modern, mengoptimalkan sirkulasi udara dan pencahayaan alami.',
    year: '2022',
    images: ['/projects/house-2.jpg'],
  },
]

const categories = ['Semua', 'Konstruksi', 'Renovasi', 'Custom Furnitur', 'Furnitur']

export function TestimonialSection() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = activeCategory === 'Semua'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="testimonial" className="relative min-h-screen py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-tech-blue/10 px-4 py-2 text-sm text-tech-blue-light">
            Portfolio
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
            Proyek{' '}
            <span className="bg-gradient-to-r from-tech-blue-light to-tech-purple-light bg-clip-text text-transparent">
              Yang Telah Selesai
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Lihat berbagai proyek yang telah kami kerjakan dengan penuh dedikasi dan profesionalisme
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                rounded-xl px-4 py-2.5 text-sm font-medium transition-all
                ${activeCategory === cat
                  ? 'bg-gradient-to-r from-tech-blue to-tech-purple text-white shadow-lg shadow-tech-blue/25'
                  : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid - Masonry style */}
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className={`
                  group cursor-pointer overflow-hidden rounded-2xl bg-card/50 backdrop-blur transition-all hover:shadow-xl
                  ${index % 3 === 0 ? 'lg:row-span-2' : ''}
                `}
              >
                {/* Image */}
                <div className={`
                  relative overflow-hidden bg-gradient-to-br from-tech-blue/20 to-tech-purple/20
                  ${index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-video'}
                `}>
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <ProjectIcon category={project.category} />
                      <p className="mt-2 text-xs text-muted-foreground">Foto Proyek</p>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/50 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-xs font-medium text-tech-blue-light">{project.category}</span>
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.location}</p>
                  </div>

                  {/* Year badge */}
                  <div className="absolute right-3 top-3 rounded-full bg-card/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                    {project.year}
                  </div>
                </div>

                {/* Quick info - visible on mobile */}
                <div className="p-4 lg:hidden">
                  <span className="text-xs font-medium text-tech-blue-light">{project.category}</span>
                  <h3 className="font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { value: '500+', label: 'Proyek Selesai', icon: ProjectsIcon },
            { value: '98%', label: 'Klien Puas', icon: HappyIcon },
            { value: '10+', label: 'Tahun Pengalaman', icon: ExperienceIcon },
            { value: '50+', label: 'Tenaga Ahli', icon: TeamIcon },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-4 rounded-2xl bg-card/50 p-6 backdrop-blur"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-tech-blue/20 to-tech-purple/20">
                <stat.icon className="size-6 text-tech-blue-light" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-2xl bg-card shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-video bg-gradient-to-br from-tech-blue/20 to-tech-purple/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ProjectIcon category={selectedProject.category} large />
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 rounded-full bg-card/80 p-2 backdrop-blur transition-colors hover:bg-card"
                >
                  <svg className="size-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <span className="text-sm font-medium text-tech-blue-light">{selectedProject.category}</span>
                    <h3 className="text-2xl font-bold text-foreground">{selectedProject.title}</h3>
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                    {selectedProject.year}
                  </span>
                </div>

                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedProject.location}
                </div>

                <p className="mb-6 text-muted-foreground">{selectedProject.description}</p>

                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-tech-blue to-tech-purple px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                >
                  Ingin Proyek Serupa?
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Project icon based on category
function ProjectIcon({ category, large = false }: { category: string; large?: boolean }) {
  const size = large ? 'size-16' : 'size-12'
  
  if (category === 'Konstruksi') {
    return (
      <div className={`mx-auto flex ${size} items-center justify-center rounded-full bg-card/50`}>
        <svg className={large ? 'size-8' : 'size-6'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
    )
  }
  if (category === 'Renovasi') {
    return (
      <div className={`mx-auto flex ${size} items-center justify-center rounded-full bg-card/50`}>
        <svg className={large ? 'size-8' : 'size-6'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
    )
  }
  if (category === 'Custom Furnitur') {
    return (
      <div className={`mx-auto flex ${size} items-center justify-center rounded-full bg-card/50`}>
        <svg className={large ? 'size-8' : 'size-6'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
    )
  }
  return (
    <div className={`mx-auto flex ${size} items-center justify-center rounded-full bg-card/50`}>
      <svg className={large ? 'size-8' : 'size-6'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    </div>
  )
}

// Stat icons
function ProjectsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

function HappyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function ExperienceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function TeamIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}
