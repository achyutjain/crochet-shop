// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: String,
//   image: String,
//   category: String,
//   stock: { type: Number, default: 10 }
// }, { timestamps: true });

// export default mongoose.model('Product', productSchema);
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
