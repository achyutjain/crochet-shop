import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Admin from './pages/Admin.jsx'
import InstagramButton from './components/InstagramButton.jsx'
import { CartProvider } from './hooks/useCart.jsx'

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-crochet-cream/50 via-white to-crochet-mint/20 relative overflow-hidden">
        {/* Floating Background Decor */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-crochet-pink/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-crochet-lavender/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <Header />
        
        {/* <main className="pt-24 pb-24 relative z-10"> */}
        <main className="pt-28 pb-32 lg:pt-24 lg:pb-24 relative z-10">  {/* ↑ Extra mobile padding */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* WhatsApp Floating Button */}
        <InstagramButton />

        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--crochet-cream)',
              color: '#1f2937',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
      </div>
    </CartProvider>
  )
}
