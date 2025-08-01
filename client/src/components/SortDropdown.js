import React, { useState } from 'react';

const SortDropdown = ({ sortBy, sortOrder, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'createdAt', label: 'Newest First', order: 'desc' },
    { value: 'createdAt', label: 'Oldest First', order: 'asc' },
    { value: 'price', label: 'Price: Low to High', order: 'asc' },
    { value: 'price', label: 'Price: High to Low', order: 'desc' },
    { value: 'name', label: 'Name: A to Z', order: 'asc' },
    { value: 'name', label: 'Name: Z to A', order: 'desc' },
    { value: 'rating', label: 'Rating: High to Low', order: 'desc' },
    { value: 'rating', label: 'Rating: Low to High', order: 'asc' }
  ];

  const getCurrentLabel = () => {
    const current = sortOptions.find(option => 
      option.value === sortBy && option.order === sortOrder
    );
    return current ? current.label : 'Sort By';
  };

  const handleSortChange = (value, order) => {
    onSortChange(value, order);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span className="text-sm font-medium text-gray-700">{getCurrentLabel()}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="py-1">
            {sortOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSortChange(option.value, option.order)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  sortBy === option.value && sortOrder === option.order
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown; 