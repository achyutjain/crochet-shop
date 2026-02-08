import { useProducts } from '../hooks/useProducts.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Products() {
  const { products } = useProducts()

  return (
    <div className="py-24 max-w-6xl mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-crochet-pink to-crochet-lavender bg-clip-text text-transparent mb-6">
          Crochet Collection
        </h1>
        <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
          Handmade with love, delivered with care
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
