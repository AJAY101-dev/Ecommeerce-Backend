const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  
    },
    price: {
      type: Number,
      required: true,  
      min: [0, 'Price must be a positive number'],  
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',  
      required: true,  
    },
    productImage: {
      type: String, 
      default: null,  
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
  },

  {
    versionKey: false,  
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
