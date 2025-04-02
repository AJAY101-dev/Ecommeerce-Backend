const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    totalPrice: {
      type: Number,
      
    },
    status: {
      type: String,
      required: true,
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                
            }
        }
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
