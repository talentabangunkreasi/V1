'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, COMPANY_INFO, WHATSAPP_NUMBER, type ChatMessage } from '@/lib/store'

// Bot responses
const botResponses = {
  greeting: `Halo! Selamat datang di ${COMPANY_INFO.name}. Saya adalah asisten virtual yang siap membantu Anda. Ada yang bisa saya bantu hari ini?`,
  options: [
    'Informasi Produk',
    'Konsultasi Desain',
    'Tanya Harga',
    'Hubungi Tim',
  ],
  productInfo: 'Kami menyediakan berbagai produk furnitur berkualitas dan layanan konstruksi/renovasi. Silakan kunjungi halaman Pembelian untuk melihat katalog lengkap kami.',
  designConsult: 'Kami menyediakan layanan konsultasi desain gratis! Tim desainer kami siap membantu mewujudkan hunian impian Anda. Silakan hubungi kami melalui WhatsApp untuk jadwal konsultasi.',
  priceInquiry: 'Untuk informasi harga, silakan beritahu produk atau layanan yang Anda minati. Anda juga bisa langsung menghubungi tim kami melalui WhatsApp untuk penawaran terbaik.',
  contactTeam: `Anda bisa menghubungi tim kami melalui:\n\nWhatsApp: +62 ${WHATSAPP_NUMBER.slice(2)}\nEmail: ${COMPANY_INFO.email}\n\nAtau klik tombol di bawah untuk chat langsung dengan tim kami!`,
  default: 'Terima kasih atas pertanyaan Anda. Untuk informasi lebih lanjut, silakan hubungi tim kami langsung melalui WhatsApp.',
}

export function ContactSection() {
  const { chatMessages, addChatMessage, selectedProduct, setSelectedProduct } = useAppStore()
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  // Initialize chat with greeting
  useEffect(() => {
    if (!initialized.current && chatMessages.length === 0) {
      initialized.current = true
      
      // Check if there's a selected product
      if (selectedProduct) {
        addChatMessage({
          id: Date.now().toString(),
          sender: 'bot',
          message: `Halo! Saya lihat Anda tertarik dengan produk *${selectedProduct.name}*. Apakah Anda ingin melanjutkan pembelian atau ada pertanyaan tentang produk ini?`,
          timestamp: new Date(),
          productContext: selectedProduct,
        })
      } else {
        addChatMessage({
          id: Date.now().toString(),
          sender: 'bot',
          message: botResponses.greeting,
          timestamp: new Date(),
        })
      }
    }
  }, [chatMessages.length, addChatMessage, selectedProduct])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSend = (message: string) => {
    if (!message.trim()) return

    // Add user message
    addChatMessage({
      id: Date.now().toString(),
      sender: 'user',
      message: message.trim(),
      timestamp: new Date(),
    })
    setInputValue('')

    // Simulate bot typing
    setIsTyping(true)
    setTimeout(() => {
      let response = botResponses.default
      const lowerMessage = message.toLowerCase()

      if (lowerMessage.includes('produk') || lowerMessage.includes('katalog') || lowerMessage.includes('furniture')) {
        response = botResponses.productInfo
      } else if (lowerMessage.includes('desain') || lowerMessage.includes('konsultasi')) {
        response = botResponses.designConsult
      } else if (lowerMessage.includes('harga') || lowerMessage.includes('biaya') || lowerMessage.includes('price')) {
        response = botResponses.priceInquiry
      } else if (lowerMessage.includes('hubungi') || lowerMessage.includes('kontak') || lowerMessage.includes('wa') || lowerMessage.includes('whatsapp')) {
        response = botResponses.contactTeam
      }

      addChatMessage({
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: response,
        timestamp: new Date(),
      })
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickReply = (option: string) => {
    handleSend(option)
  }

  const openWhatsApp = (message?: string) => {
    const defaultMessage = selectedProduct
      ? `Halo, saya tertarik dengan produk ${selectedProduct.name}.`
      : 'Halo, saya ingin bertanya tentang produk/layanan PT Talenta Bangun Kreasi.'
    
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || defaultMessage)}`
    window.open(waUrl, '_blank')
  }

  return (
    <section id="contact" className="relative min-h-screen py-20 pb-32 lg:py-24 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-500">
            Hubungi Kami
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
            Ada Pertanyaan?{' '}
            <span className="bg-gradient-to-r from-tech-blue-light to-tech-purple-light bg-clip-text text-transparent">
              Kami Siap Membantu
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Chat dengan asisten virtual kami atau hubungi langsung tim customer service
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 lg:col-span-1"
          >
            {/* WhatsApp card */}
            <div className="group overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 p-6 backdrop-blur transition-all hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-green-500/20">
                <WhatsAppIcon className="size-6 text-green-500" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">WhatsApp</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Chat langsung dengan tim kami untuk respons cepat
              </p>
              <button
                onClick={() => openWhatsApp()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 font-semibold text-white transition-all hover:bg-green-600"
              >
                <WhatsAppIcon className="size-5" />
                Chat Sekarang
              </button>
            </div>

            {/* Email card */}
            <div className="rounded-2xl bg-card/50 p-6 backdrop-blur">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-tech-blue/20">
                <EmailIcon className="size-6 text-tech-blue-light" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Email</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                Kirim pertanyaan detail via email
              </p>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="text-sm font-medium text-tech-blue-light hover:underline"
              >
                {COMPANY_INFO.email}
              </a>
            </div>

            {/* Location card */}
            <div className="rounded-2xl bg-card/50 p-6 backdrop-blur">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-tech-purple/20">
                <LocationIcon className="size-6 text-tech-purple-light" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Lokasi</h3>
              <p className="text-sm text-muted-foreground">
                Jl. Halim Perdana Kusuma No.99, RT.004/RW.004, Batuceper, Kec. Benda, Kota Tangerang, Banten 15122
              </p>
            </div>

            {/* Social links */}
            <div className="rounded-2xl bg-card/50 p-6 backdrop-blur">
              <h3 className="mb-4 font-semibold text-foreground">Ikuti Kami</h3>
              <div className="flex gap-3">
                {[
                  { href: COMPANY_INFO.social.instagram, icon: InstagramIcon, label: 'Instagram' },
                  { href: COMPANY_INFO.social.facebook, icon: FacebookIcon, label: 'Facebook' },
                  { href: COMPANY_INFO.social.tiktok, icon: TikTokIcon, label: 'TikTok' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  >
                    <social.icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chat interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col overflow-hidden rounded-2xl bg-card/50 backdrop-blur lg:col-span-2"
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-border bg-card/80 p-4">
              <div className="relative">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-tech-blue to-tech-purple">
                  <span className="text-sm font-bold text-white">TBK</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground"> Hans Asisten Virtual TBK </h3>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: '400px', minHeight: '300px' }}>
              <AnimatePresence>
                {chatMessages.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} />
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-tech-blue to-tech-purple">
                    <span className="text-xs font-bold text-white">TBK</span>
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                    <div className="flex gap-1">
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '0ms' }} />
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '150ms' }} />
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {chatMessages.length <= 2 && (
              <div className="flex flex-wrap gap-2 border-t border-border bg-card/50 p-3">
                {botResponses.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuickReply(option)}
                    className="rounded-full bg-tech-blue/10 px-4 py-2 text-sm font-medium text-tech-blue-light transition-all hover:bg-tech-blue/20"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Chat input */}
            <div className="border-t border-border bg-card/80 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend(inputValue)
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ketik pesan Anda..."
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-tech-blue focus:outline-none focus:ring-2 focus:ring-tech-blue/20"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-r from-tech-blue to-tech-purple text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
                >
                  <SendIcon className="size-5" />
                </button>
              </form>
              
              {/* WhatsApp CTA */}
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Ingin respons lebih cepat?</span>
                <button
                  onClick={() => openWhatsApp()}
                  className="flex items-center gap-1 font-medium text-green-500 hover:underline"
                >
                  <WhatsAppIcon className="size-4" />
                  Chat WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Chat bubble component
function ChatBubble({ message }: { message: ChatMessage }) {
  const isBot = message.sender === 'bot'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-2 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {isBot && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-tech-blue to-tech-purple">
          <span className="text-xs font-bold text-white">TBK</span>
        </div>
      )}
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-3
          ${isBot
            ? 'rounded-bl-md bg-muted text-foreground'
            : 'rounded-br-md bg-gradient-to-r from-tech-blue to-tech-purple text-white'
          }
        `}
      >
        <p className="whitespace-pre-line text-sm">{message.message}</p>
        
        {/* Product context */}
        {message.productContext && (
          <div className="mt-2 rounded-lg bg-card/50 p-2">
            <p className="text-xs font-medium">{message.productContext.name}</p>
            <p className="text-xs opacity-70">
              Rp {message.productContext.price.toLocaleString('id-ID')}
            </p>
          </div>
        )}
        
        <span className="mt-1 block text-right text-[10px] opacity-60">
          {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  )
}

// Icons
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}

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
