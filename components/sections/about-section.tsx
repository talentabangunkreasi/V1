'use client'

import { motion } from 'framer-motion'
import { COMPANY_INFO } from '@/lib/store'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'CEO & Founder',
    role: 'Direktur Utama',
    image: '/team/ceo.jpg',
    description: 'Memimpin visi dan strategi perusahaan dengan pengalaman 15 tahun di industri konstruksi.',
  },
  {
    name: 'Head of Design',
    role: 'Kepala Desain',
    image: '/team/designer.jpg',
    description: 'Menghadirkan desain inovatif dengan sentuhan modern dan fungsional.',
  },
  {
    name: 'Project Manager',
    role: 'Manajer Proyek',
    image: '/team/pm.jpg',
    description: 'Memastikan setiap proyek berjalan tepat waktu dengan kualitas terbaik.',
  },
]

const milestones = [
  { year: '1999', title: 'Didirikan', description: 'PT Talenta Bangun Kreasi resmi didirikan' },
  { year: '2016', title: '100 Proyek', description: 'Menyelesaikan 100 proyek pertama' },
  { year: '2019', title: 'Ekspansi', description: 'menyelesaikan 200 proyek ke 2' },
  { year: '2022', title: '500 Proyek', description: 'Mencapai 500 proyek sukses' },
  { year: '2018', title: 'Inovasi', description: 'Meluncurkan layanan digital' },
]

const values = [
  {
    icon: QualityIcon,
    title: 'Kualitas Terbaik',
    description: 'Menggunakan material premium dan tenaga ahli berpengalaman',
  },
  {
    icon: InnovationIcon,
    title: 'Inovasi Desain',
    description: 'Selalu menghadirkan desain terkini sesuai tren global',
  },
  {
    icon: TrustIcon,
    title: 'Kepercayaan',
    description: 'Membangun hubungan jangka panjang dengan transparansi',
  },
  {
    icon: ServiceIcon,
    title: 'Layanan Prima',
    description: 'Pendampingan dari konsultasi hingga purna jual',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-tech-purple/10 px-4 py-2 text-sm text-tech-purple-light">
            Tentang Kami
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
            Kenali{' '}
            <span className="bg-gradient-to-r from-tech-blue-light to-tech-purple-light bg-clip-text text-transparent">
              {COMPANY_INFO.name}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {COMPANY_INFO.tagline}
          </p>
        </motion.div>

        {/* Company overview */}
        <div className="mb-20 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-tech-blue/20 to-tech-purple/20">
              
              {/* Image perusahaan menggunakan PNG kamu */}
              <Image 
                src="perusahaan.png" 
                alt="Foto Perusahaan"
                fill
                className="object-cover"
                priority
              />
              
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 size-24 rounded-full bg-tech-blue/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 size-32 rounded-full bg-tech-purple/20 blur-2xl" />
            </div>

            {/* Stats overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-6 left-6 right-6 rounded-xl bg-card/90 p-4 shadow-xl backdrop-blur lg:left-auto lg:right-6 lg:w-64"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-tech-blue-light">26+</p>
                  <p className="text-xs text-muted-foreground">Tahun Pengalaman</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-tech-purple-light">500+</p>
                  <p className="text-xs text-muted-foreground">Proyek Selesai</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center lg:pl-8"
          >
            <h3 className="mb-4 text-2xl font-bold text-foreground">
              Mitra Terpercaya untuk Hunian Impian Anda
            </h3>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {COMPANY_INFO.description}
            </p>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Dengan tim profesional dan berpengalaman, kami berkomitmen menghadirkan 
              hasil terbaik yang melampaui ekspektasi. Setiap proyek dikerjakan dengan 
              penuh dedikasi dan perhatian terhadap detail.
            </p>
            
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '98%', label: 'Kepuasan Klien' },
                { value: '50+', label: 'Tenaga Ahli' },
                { value: '26+', label: 'Pengalaman' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="rounded-xl bg-card/50 p-4 text-center backdrop-blur"
                >
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
            Nilai-Nilai Kami
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group rounded-2xl bg-card/50 p-6 backdrop-blur transition-all hover:bg-card hover:shadow-lg"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-tech-blue/20 to-tech-purple/20 transition-colors group-hover:from-tech-blue/30 group-hover:to-tech-purple/30">
                  <value.icon className="size-6 text-tech-blue-light" />
                </div>
                <h4 className="mb-2 font-semibold text-foreground">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
            Perjalanan Kami
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-tech-blue via-tech-purple to-tech-blue lg:block" />
            
            <div className="space-y-8 lg:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center gap-4 lg:gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="inline-block rounded-xl bg-card/50 p-4 backdrop-blur lg:p-6">
                      <span className="text-sm font-bold text-tech-blue-light">{milestone.year}</span>
                      <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="absolute left-1/2 hidden size-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-tech-blue to-tech-purple shadow-lg lg:block" />
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
            Tim Kami
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group overflow-hidden rounded-2xl bg-card/50 backdrop-blur transition-all hover:shadow-lg"
              >
                {/* Image placeholder */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-tech-blue/20 to-tech-purple/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex size-24 items-center justify-center rounded-full bg-card/80">
                      <svg className="size-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-background/50 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-sm text-foreground">{member.description}</p>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-4 text-center">
                  <h4 className="font-semibold text-foreground">{member.name}</h4>
                  <p className="text-sm text-tech-blue-light">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Icon components
function QualityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  )
}

function InnovationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )
}

function TrustIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function ServiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}
