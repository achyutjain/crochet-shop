import { Link } from 'react-router-dom'
import { ShoppingCart, Menu } from 'lucide-react'
import { useCart } from '../hooks/useCart.jsx'

export default function Header() {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-xl border-b border-crochet-pink/30">
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
            <Menu className="w-8 h-8" />
          </div>
        </div>
      </div>
    </header>
  )
}
