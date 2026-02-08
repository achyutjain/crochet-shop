import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id)
      if (existing) {
        return prev.map(item => 
          item._id === product._id ? {...item, quantity: item.quantity + 1} : item
        )
      }
      return [...prev, {...product, quantity: 1}]
    })
  }

  const updateQuantity = (id, quantity) => {
    setCart(prev => prev.map(item => 
      item._id === id ? {...item, quantity} : item
    ).filter(item => item.quantity > 0))
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{cart, addToCart, updateQuantity, removeFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
