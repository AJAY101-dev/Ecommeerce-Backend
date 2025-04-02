const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  
      unique: true, 
    },
    createdAt: {
      type: Date,
      default: Date.now,  
    },
  },
  
  {
    versionKey: false,  
    strict :false,
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
