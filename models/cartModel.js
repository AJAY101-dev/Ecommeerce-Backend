const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  
      required: true,  
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',  
      required: true,  
    },
    quantity: {
      type: Number,
      required: true,  
      min: [1, 'Quantity must be at least 1'], 
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

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;


