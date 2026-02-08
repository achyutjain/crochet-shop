// const express = require('express');
// const Product = require('../models/Product');
// const router = express.Router();

// // Add new product
// router.post('/products', async (req, res) => {
//   try {
//     const { name, price, description, image, category } = req.body;
    
//     // Validate required fields
//     if (!name || !price) {
//       return res.status(400).json({ error: 'Name and price are required' });
//     }

//     const product = new Product({
//       name,
//       price: parseFloat(price),
//       description: description || '',
//       image: image || 'https://images.unsplash.com/photo-1612216794897-755803412b4f?w=400',
//       category: category || 'Uncategorized'
//     });

//     await product.save();
//     res.json({ 
//       message: '✅ Product added successfully!', 
//       product 
//     });
//   } catch (error) {
//     console.error('Add product error:', error);
//     res.status(500).json({ error: 'Failed to add product' });
//   }
// });

// // Delete product
// router.delete('/products/:id', async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: '✅ Product deleted successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete product' });
//   }
// });

// // Get orders (for admin)
// router.get('/orders', async (req, res) => {
//   try {
//     const orders = await require('../models/Order').find().sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

// module.exports = router;
const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const router = express.Router();

// 👇 ADD NEW PRODUCT - FIXED
router.post('/products', async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;
    
    // Validate
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    // ✅ FIXED: Correct Product constructor
    // const product = new Product({
    //   name,
    //   price: parseFloat(price),
    //   description: description || '',
    //   image: image || 'https://images.unsplash.com/photo-1612216794897-755803412b4f?w=400',
    //   category: category || 'Uncategorized'
    // });
    const product = new Product({
  name,
  price: parseFloat(price),
  description: description || '',
  image: image || 'https://images.pexels.com/photos/1094774/pexels-photo-1094774.jpeg?w=500',  // ✅ DEFAULT
  category: category || 'Uncategorized'
});


    await product.save();
    res.json({ 
      message: '✅ Product added successfully!', 
      product 
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// 👇 DELETE PRODUCT
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: '✅ Product deleted successfully!' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// 👇 GET ORDERS FOR ADMIN
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    console.error('Orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
