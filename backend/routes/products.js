import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

// Seed Crochet Products (Run ONCE)
// router.get('/seed', async (req, res) => {
//   try {
//     await Product.deleteMany({});
//     const crochetProducts = [
//       {
//         name: "🌸 Pink Rose Garland (5ft)",
//         price: 599,
//         description: "Handmade crochet rose garland perfect for room decor",
//         image: "https://plus.unsplash.com/premium_photo-1675799745780-87b6fe5c5822?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         category: "Garlands",
//         stock: 15
//       },
//       {
//         name: "💜 Lavender Coaster Set (4pcs)",
//         price: 399,
//         description: "Premium crochet lavender flower coasters",
//         image: "mohadese-marvi-fxGgqbIGQlg-unsplash.jpg",
//         category: "Coasters",
//         stock: 25
//       },
//       {
//         name: "🧺 Cream Storage Basket (Large)",
//         price: 1299,
//         description: "Handcrafted crochet storage basket for home organization",
//         image: "https://images.unsplash.com/photo-1581637685570-1a9a13f7780f?w=500&fit=crop",
//         category: "Baskets",
//         stock: 8
//       },
//       {
//         name: "🌼 Daisy Wall Hanging (Medium)",
//         price: 899,
//         description: "Boho chic crochet daisy wall hanging",
//         image: "https://images.unsplash.com/photo-1606693131753-17d3ab500d51?w=500&fit=crop",
//         category: "Wall Decor",
//         stock: 12
//       },
//       {
//         name: "🌺 Flower Hair Clip (Mint)",
//         price: 199,
//         description: "Single crochet flower hair accessory",
//         image: "https://images.unsplash.com/photo-1598045758737-b7b0d8a52199?w=500&fit=crop",
//         category: "Accessories",
//         stock: 30
//       },
//       {
//         name: "🌷 Mixed Flower Doily (Large)",
//         price: 749,
//         description: "Elegant crochet doily for table centerpiece",
//         image: "https://images.unsplash.com/photo-1574169208508-1ee6bb911b5e?w=500&fit=crop",
//         category: "Tableware",
//         stock: 10
//       }
//     ];

//     await Product.insertMany(crochetProducts);
//     res.json({ success: true, message: '🌸 6 Crochet products seeded!' });
// router.get('/seed', async (req, res) => {
//   try {
//     await Product.deleteMany({});
    
//     const products = [
//       {
//         name: 'Pink Rose Garland',
//         price: 599,
//         image: 'https://picsum.photos/400/500?random=1',  // ✅ 100% WORKING
//         category: 'Garlands'
//       },
//       {
//         name: 'Purple Coasters',
//         price: 399,
//         image: 'https://picsum.photos/400/500?random=2',  // ✅ 100% WORKING
//         category: 'Coasters'
//       },
//       {
//         name: 'White Daisies',
//         price: 499,
//         image: 'https://picsum.photos/400/500?random=3',  // ✅ 100% WORKING
//         category: 'Wall Decor'
//       },
//       {
//         name: 'Golden Sunflower',
//         price: 699,
//         image: 'https://picsum.photos/400/500?random=4',  // ✅ 100% WORKING
//         category: 'Wall Art'
//       }
//     ];
    
//     await Product.insertMany(products);
//     res.json({ message: '✅ IMAGES FIXED - Picsum photos seeded!' });
router.get('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    
    const products = [
      {
        name: 'Pink Rose Garland',
        price: 599,
        image: 'https://images.pexels.com/photos/1094774/pexels-photo-1094774.jpeg?w=500',
        category: 'Garlands'
      },
      {
        name: 'Purple Coasters',
        price: 399,
        image: 'https://images.pexels.com/photos/1094776/pexels-photo-1094776.jpeg?w=500',
        category: 'Coasters'
      },
      {
        name: 'White Daisies',
        price: 499,
        image: 'https://i0.wp.com/helloyellowyarn.com/wp-content/uploads/2016/04/5-petal-flower-hyy.jpg?ssl=1',
        category: 'Wall Decor'
      }
    ];
    
    await Product.insertMany(products);
    res.json({ message: '✅ PEXELS images seeded - NO CORS issues!' });
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
