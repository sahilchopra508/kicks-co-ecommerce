import React from 'react';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return `₹ ${price.toLocaleString('en-IN')}`;
  };

  const getDiscountPercentage = () => {
    if (product.originalPrice && product.price < product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  return (
    <div className="product-card group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/400x400?text=No+Image'}
          alt={product.images[0]?.alt || product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          {getDiscountPercentage() > 0 && (
            <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-orange-600 rounded">
              {getDiscountPercentage()}% OFF
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Category */}
        <p className="text-xs text-gray-500 mb-2">
          {product.gender}'s {product.category}
        </p>
        
        {/* Color Info */}
        <p className="text-xs text-gray-500 mb-3">
          {product.colors.length} Colour{product.colors.length !== 1 ? 's' : ''}
        </p>
        
        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">
            MRP: {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.price < product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>



        {/* Stock Status */}
        {!product.inStock && (
          <div className="mt-2">
            <span className="text-xs text-red-600 font-medium">Out of Stock</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 