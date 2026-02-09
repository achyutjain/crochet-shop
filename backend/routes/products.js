import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

// Seed Crochet Products (Run ONCE)
router.get('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const crochetProducts = [
      {
        name: "🌸 Pink Rose Garland (5ft)",
        price: 599,
        description: "Handmade crochet rose garland perfect for room decor",
        image: "https://images.unsplash.com/photo-1612216794897-755803412b4f?w=500&fit=crop&crop=entropy&auto=format",
        category: "Garlands",
        stock: 15
      },
      {
        name: "💜 Lavender Coaster Set (4pcs)",
        price: 399,
        description: "Premium crochet lavender flower coasters",
        image: "https://images.unsplash.com/photo-1587484216754-5c4a4d4d3f69?w=500&fit=crop",
        category: "Coasters",
        stock: 25
      },
      {
        name: "🧺 Cream Storage Basket (Large)",
        price: 1299,
        description: "Handcrafted crochet storage basket for home organization",
        image: "https://images.unsplash.com/photo-1581637685570-1a9a13f7780f?w=500&fit=crop",
        category: "Baskets",
        stock: 8
      },
      {
        name: "🌼 Daisy Wall Hanging (Medium)",
        price: 899,
        description: "Boho chic crochet daisy wall hanging",
        image: "https://images.unsplash.com/photo-1606693131753-17d3ab500d51?w=500&fit=crop",
        category: "Wall Decor",
        stock: 12
      },
      {
        name: "🌺 Flower Hair Clip (Mint)",
        price: 199,
        description: "Single crochet flower hair accessory",
        image: "https://images.unsplash.com/photo-1598045758737-b7b0d8a52199?w=500&fit=crop",
        category: "Accessories",
        stock: 30
      },
      {
        name: "🌷 Mixed Flower Doily (Large)",
        price: 749,
        description: "Elegant crochet doily for table centerpiece",
        image: "https://images.unsplash.com/photo-1574169208508-1ee6bb911b5e?w=500&fit=crop",
        category: "Tableware",
        stock: 10
      }
    ];

    await Product.insertMany(crochetProducts);
    res.json({ success: true, message: '🌸 6 Crochet products seeded!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
