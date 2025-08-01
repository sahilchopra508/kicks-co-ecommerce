import React, { useState } from 'react';

const FilterSidebar = ({ filters, onFilterChange, totalProducts }) => {
  const [expandedSections, setExpandedSections] = useState({
    gender: true,
    price: true
  });

  const categories = [
    'Lifestyle',
    'Jordan',
    'Running',
    'Basketball',
    'American Football',
    'Football',
    'Training & Gym',
    'Skateboarding',
    'Golf',
    'Tennis',
    'Athletics',
    'Walking'
  ];

  const genders = ['Men', 'Women', 'Unisex'];

  const priceRanges = [
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹15,000', min: 10000, max: 15000 },
    { label: '₹15,000 - ₹20,000', min: 15000, max: 20000 },
    { label: 'Over ₹20,000', min: 20000, max: null }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category) => {
    onFilterChange({ category: filters.category === category ? '' : category });
  };

  const handleGenderChange = (gender) => {
    onFilterChange({ gender: filters.gender === gender ? '' : gender });
  };

  const handlePriceRangeChange = (min, max) => {
    onFilterChange({ 
      minPrice: min || '', 
      maxPrice: max || '' 
    });
  };

  const handleNewFilter = (type) => {
    if (type === 'new') {
      onFilterChange({ isNew: !filters.isNew });
    } else if (type === 'justIn') {
      onFilterChange({ isJustIn: !filters.isJustIn });
    }
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: '',
      gender: '',
      minPrice: '',
      maxPrice: '',
      isNew: false,
      isJustIn: false
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      {/* Product Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Product Categories</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category === category}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('gender')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-sm font-medium text-gray-900">
            Gender ({filters.gender ? '1' : '0'})
          </h3>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              expandedSections.gender ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.gender && (
          <div className="mt-3 space-y-2">
            {genders.map((gender) => (
              <label key={gender} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  checked={filters.gender === gender}
                  onChange={() => handleGenderChange(gender)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{gender}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-sm font-medium text-gray-900">Shop By Price</h3>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              expandedSections.price ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.price && (
          <div className="mt-3 space-y-2">
            {priceRanges.map((range, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    filters.minPrice === (range.min || '') && 
                    filters.maxPrice === (range.max || '')
                  }
                  onChange={() => handlePriceRangeChange(range.min, range.max)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* New Arrivals Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">New Arrivals</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.isNew}
              onChange={() => handleNewFilter('new')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">New</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.isJustIn}
              onChange={() => handleNewFilter('justIn')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Just In</span>
          </label>
        </div>
      </div>

      {/* Results Count */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {totalProducts} products found
        </p>
      </div>
    </div>
  );
};

export default FilterSidebar; 