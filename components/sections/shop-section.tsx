'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, DUMMY_PRODUCTS, WHATSAPP_NUMBER, type Product } from '@/lib/store'
import Image from 'next/image'

type Category = 'all' | 'furniture' | 'custom-furniture' | 'custom-house'

const categories: { id: Category; label: string; description: string }[] = [
  { id: 'all', label: 'Semua', description: 'Lihat semua produk' },
  { id: 'furniture', label: 'Furnitur', description: 'Furnitur siap pakai' },
  { id: 'custom-furniture', label: 'Custom Furnitur', description: 'Furnitur sesuai pesanan' },
  { id: 'custom-house', label: 'Custom Rumah', description: 'Konstruksi & renovasi' },
]

export function ShopSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showOrderForm, setShowOrderForm] = useState(false)

  const filteredProducts = activeCategory === 'all' 
    ? DUMMY_PRODUCTS 
    : DUMMY_PRODUCTS.filter(p => p.category === activeCategory)

  const handleBuy = (product: Product) => {
    setSelectedProduct(product)
    setShowOrderForm(true)
  }

  return (
    <section id="shop" className="relative min-h-screen py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-tech-blue/10 px-4 py-2 text-sm text-tech-blue-light">
            Katalog Produk
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
            Temukan{' '}
            <span className="bg-gradient-to-r from-tech-blue-light to-tech-purple-light bg-clip-text text-transparent">
              Produk Terbaik
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Pilih dari berbagai koleksi furnitur berkualitas atau pesan custom sesuai kebutuhan Anda
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                rounded-xl px-4 py-2.5 text-sm font-medium transition-all
                ${activeCategory === cat.id
                  ? 'bg-gradient-to-r from-tech-blue to-tech-purple text-white shadow-lg shadow-tech-blue/25'
                  : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Products grid */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onBuy={() => handleBuy(product)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom order CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-tech-blue/20 via-tech-purple/20 to-tech-blue/20 p-8 text-center lg:p-12"
        >
          <h3 className="mb-4 text-2xl font-bold text-foreground">
            Butuh Desain Custom?
          </h3>
          <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
            Kami siap membantu mewujudkan furnitur atau rumah impian Anda dengan desain yang sesuai keinginan
          </p>
          <button
            onClick={() => {
              setSelectedProduct(null)
              setShowOrderForm(true)
            }}
            className="rounded-xl bg-gradient-to-r from-tech-blue to-tech-purple px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
          >
            Konsultasi Gratis
          </button>
        </motion.div>
      </div>

      {/* Order form modal */}
      <AnimatePresence>
        {showOrderForm && (
          <OrderFormModal
            product={selectedProduct}
            onClose={() => {
              setShowOrderForm(false)
              setSelectedProduct(null)
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// Product card component
function ProductCard({ 
  product, 
  index, 
  onBuy 
}: { 
  product: Product
  index: number
  onBuy: () => void 
}) {
  const [isHovered, setIsHovered] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const categoryLabel = {
    'furniture': 'Furnitur',
    'custom-furniture': 'Custom',
    'custom-house': 'Konstruksi',
  }[product.category]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur transition-all hover:shadow-xl hover:shadow-tech-blue/10"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-tech-blue/20 to-tech-purple/20">
        
        {/* Menampilkan gambar asli dari array images store */}
        {product.images && product.images.length > 0 && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Category badge */}
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-full bg-card/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            {categoryLabel}
          </span>
        </div>

        {/* Hover overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <button
            onClick={onBuy}
            className="rounded-xl bg-gradient-to-r from-tech-blue to-tech-purple px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            Pesan Sekarang
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 font-semibold text-foreground line-clamp-1">
          {product.name}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        
        {/* Specs preview */}
        {product.specs && (
          <div className="mb-3 flex flex-wrap gap-1">
            {product.specs.slice(0, 2).map((spec, i) => (
              <span key={i} className="rounded-md bg-muted/50 px-2 py-0.5 text-[10px] text-muted-foreground">
                {spec}
              </span>
            ))}
          </div>
        )}

        {/* Price and action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">Mulai dari</span>
            <p className="text-lg font-bold text-tech-blue-light">
              {formatPrice(product.price)}
            </p>
          </div>
          <button
            onClick={onBuy}
            className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-sm font-medium text-green-500 transition-colors hover:bg-green-500/20"
          >
            <WhatsAppIcon className="size-4" />
            <span className="hidden sm:inline">Chat</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Order form modal
function OrderFormModal({ 
  product, 
  onClose 
}: { 
  product: Product | null
  onClose: () => void 
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: '',
  })
  const { setActiveSection } = useAppStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create WhatsApp message
    const message = product
      ? `Halo, saya tertarik dengan produk:\n\n*${product.name}*\nHarga: Rp ${product.price.toLocaleString('id-ID')}\n\nNama: ${formData.name}\nNo. HP: ${formData.phone}\nCatatan: ${formData.notes || '-'}`
      : `Halo, saya ingin konsultasi custom order.\n\nNama: ${formData.name}\nNo. HP: ${formData.phone}\nCatatan: ${formData.notes || '-'}`
    
    // Open WhatsApp
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(waUrl, '_blank')
    
    // Navigate to contact section
    setActiveSection('contact')
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-2xl"
      >
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-tech-blue/10 to-tech-purple/10 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {product ? 'Konfirmasi Pesanan' : 'Konsultasi Custom'}
              </h3>
              {product && (
                <p className="mt-1 text-sm text-muted-foreground">{product.name}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-tech-blue focus:outline-none focus:ring-2 focus:ring-tech-blue/20"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-tech-blue focus:outline-none focus:ring-2 focus:ring-tech-blue/20"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Catatan (Opsional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-tech-blue focus:outline-none focus:ring-2 focus:ring-tech-blue/20"
                placeholder="Tambahkan catatan atau request khusus..."
              />
            </div>
          </div>

          {/* Product summary */}
          {product && (
            <div className="mt-4 rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Produk</span>
                <span className="font-medium text-foreground">{product.name}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-muted-foreground">Harga</span>
                <span className="font-bold text-tech-blue-light">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl"
          >
            <WhatsAppIcon className="size-5" />
            Lanjutkan ke WhatsApp
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Anda akan diarahkan ke WhatsApp untuk melanjutkan pembelian
          </p>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Product icon based on category
function ProductIcon({ category }: { category: string }) {
  if (category === 'furniture') {
    return (
      <svg className="size-8 text-tech-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }
  if (category === 'custom-furniture') {
    return (
      <svg className="size-8 text-tech-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  }
  return (
    <svg className="size-8 text-tech-blue-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

// WhatsApp icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
