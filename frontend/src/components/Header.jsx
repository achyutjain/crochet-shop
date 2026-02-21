import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../hooks/useCart.jsx'

export default function Header() {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-crochet-pink/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-4xl font-bold bg-gradient-to-r from-crochet-pink via-crochet-lavender to-crochet-mint bg-clip-text text-transparent">
              🌸 CrochetBloom
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-crochet-pink font-semibold py-2">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-crochet-pink font-semibold py-2">Shop</Link>
              <Link to="/admin" className="text-gray-700 hover:text-crochet-lavender font-semibold py-2">Admin</Link>
              <Link to="/cart" className="relative p-3 bg-crochet-cream/50 hover:bg-crochet-pink/20 rounded-2xl group">
                <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-crochet-pink" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-crochet-pink text-white text-xs font-bold rounded-xl w-7 h-7 flex items-center justify-center shadow-lg">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            <div className="md:hidden">
              <button aria-label="Open menu" onClick={() => setIsOpen(true)}>
                <Menu className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile slide-in menu */}
      <div className={`lg:hidden fixed top-20 left-0 w-full h-screen bg-white z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-bold bg-gradient-to-r from-crochet-pink via-crochet-lavender to-crochet-mint bg-clip-text text-transparent">
              🌸 CrochetBloom
            </Link>
            <button aria-label="Close menu" onClick={() => setIsOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-800 text-lg font-semibold">Home</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="text-gray-800 text-lg font-semibold">Shop</Link>
            <Link to="/admin" onClick={() => setIsOpen(false)} className="text-gray-800 text-lg font-semibold">Admin</Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 text-gray-800 text-lg font-semibold mt-4">
              <ShoppingCart className="w-6 h-6" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="ml-2 bg-crochet-pink text-white text-xs font-bold rounded-xl w-6 h-6 flex items-center justify-center shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
