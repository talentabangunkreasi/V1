import { create } from 'zustand'

interface AppState {
  // Theme
  isDarkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (value: boolean) => void
  
  // Intro
  introComplete: boolean
  setIntroComplete: (value: boolean) => void
  
  // Navigation
  activeSection: string
  setActiveSection: (section: string) => void
  
  // Mobile menu
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (value: boolean) => void
  
  // Cart / Purchase
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  
  // Chat
  chatMessages: ChatMessage[]
  addChatMessage: (message: ChatMessage) => void
  clearChat: () => void
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'furniture' | 'custom-furniture' | 'custom-house'
  images: string[]
  specs?: string[]
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  message: string
  timestamp: Date
  productContext?: Product
}

export const useAppStore = create<AppState>((set) => ({
  // Theme - default to dark mode for tech aesthetic
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setDarkMode: (value) => set({ isDarkMode: value }),
  
  // Intro
  introComplete: false,
  setIntroComplete: (value) => set({ introComplete: value }),
  
  // Navigation
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
  
  // Mobile menu
  isMobileMenuOpen: false,
  setMobileMenuOpen: (value) => set({ isMobileMenuOpen: value }),
  
  // Cart / Purchase
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  
  // Chat
  chatMessages: [],
  addChatMessage: (message) => set((state) => ({ 
    chatMessages: [...state.chatMessages, message] 
  })),
  clearChat: () => set({ chatMessages: [] }),
}))

// WhatsApp number
export const WHATSAPP_NUMBER = '62881012362310'

// Company info
export const COMPANY_INFO = {
  name: 'PT Talenta Bangun Kreasi',
  tagline: 'Membangun Kreasi, Mewujudkan Impian',
  description: 'PT Talenta Bangun Kreasi adalah perusahaan yang bergerak di bidang furnitur dan konstruksi dengan fokus pada desain modern dan kualitas premium. Kami menghadirkan solusi lengkap untuk kebutuhan furnitur custom, interior design, dan pembangunan rumah impian Anda.',
  email: 'talentabangukreasi.gps@gmail.com',
  whatsapp: WHATSAPP_NUMBER,
  social: {
    instagram: 'https://www.instagram.com/talentabangunkreasi?igsh=eGE5ZjVwZTBncHA5',
    facebook: 'https://facebook.com/talentabangunkreasi',
    tiktok: 'https://tiktok.com/@talentabangunkreasi'
  }
}

// Navigation items
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'shop', label: 'Pembelian', href: '#shop' },
  { id: 'about', label: 'Tentang Kami', href: '#about' },
  { id: 'testimonial', label: 'Testimoni', href: '#testimonial' },
  { id: 'contact', label: 'Kontak', href: '#contact' },
]

// Dummy products
export const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Visual 3D',
    description: 'Interior gambar vs eksekusi',
    price: 9.9,
    category: 'furniture',
    images: ['/satu.jpg'],
    specs: ['Ukuran: - cm', 'Bahan: Fabric Premium', 'Warna: - ', 'Garansi: 2 Tahun']
  },
  {
    id: '2',
    name: 'Dark ston',
    description: 'Set ruangan makan lengkap, desain elegan dengan material premium.',
    price: 7.7,
    category: 'furniture',
    images: ['dua.jpg'],
    specs: ['Ukuran Meja: - cm', 'Bahan: Premium', 'Dengan gaya dark', 'Garansi: 3 Tahun']
  },
  {
    id: '3',
    name: 'Lemari Pakaian Custom',
    description: 'Lemari pakaian dengan desain custom sesuai kebutuhan dan ukuran ruangan Anda.',
    price: ,
    category: 'custom-furniture',
    images: ['/products/wardrobe-1.jpg'],
    specs: ['Ukuran: Sesuai Pesanan', 'Bahan: Multiplek + HPL', 'Finishing: Duco/HPL', 'Waktu Pengerjaan: 2-3 Minggu']
  },
  {
    id: '4',
    name: 'Modern private residence',
    description: 'Ruangan set dengan desain modern, dilengkapi storage optimal.',
    price:,
    category: 'custom-furniture',
    images: ['/tiga.jpg'],
    specs: ['Ukuran: Sesuai Ruangan', 'Bahan: Multiplek + Granite', 'Fitur: Soft Close', 'Waktu Pengerjaan: 3-4 Minggu']
  },
  {
    id: '5',
    name: 'Renovasi Kamar Mandi',
    description: 'Paket renovasi kamar mandi lengkap dengan desain modern dan material berkualitas.',
    price: 35000000,
    category: 'custom-house',
    images: ['/products/bathroom-1.jpg'],
    specs: ['Luas: Up to 6 m²', 'Termasuk: Material + Jasa', 'Desain: 3D Render', 'Waktu Pengerjaan: 2-3 Minggu']
  },
  {
    id: '6',
    name: 'Konstruksi Rumah Type 45',
    description: 'Paket pembangunan rumah type 45 dengan desain modern minimalis.',
    price: 350000000,
    category: 'custom-house',
    images: ['/products/house-1.jpg'],
    specs: ['Luas Bangunan: 45 m²', 'Lantai: 1 Lantai', '2 Kamar Tidur', 'Waktu Pengerjaan: 4-6 Bulan']
  },
]
