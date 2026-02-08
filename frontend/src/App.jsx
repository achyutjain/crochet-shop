import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Admin from './pages/Admin.jsx'
import { CartProvider } from './hooks/useCart.jsx'

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-crochet-cream via-crochet-pink/20 to-crochet-mint/20">
        <Header />
        <main className="pt-24 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </CartProvider>
  )
}
