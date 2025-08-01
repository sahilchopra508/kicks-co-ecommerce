const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Lifestyle', 'Jordan', 'Running', 'Basketball', 'American Football', 'Football', 'Training & Gym', 'Skateboarding', 'Golf', 'Tennis', 'Athletics', 'Walking']
  },
  gender: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Unisex']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  discount: {
    type: Number,
    min: 0,
    max: 100
  },
  colors: [{
    name: String,
    hex: String,
    available: Boolean
  }],
  sizes: [{
    size: String,
    available: Boolean
  }],
  images: [{
    url: String,
    alt: String
  }],
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true,
    default: 'Kicks & Co'
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isJustIn: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', category: 'text' });

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return `₹ ${this.price.toLocaleString('en-IN')}`;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.price < this.originalPrice) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

module.exports = mongoose.model('Product', productSchema); 