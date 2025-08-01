import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    gender: '',
    minPrice: '',
    maxPrice: '',
    isNew: false,
    isJustIn: false
  });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });
  const [showFilters, setShowFilters] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...filters,
        sortBy,
        sortOrder,
        page: pagination.currentPage,
        limit: 12
      });

      const response = await axios.get(`/api/products?${params}`);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, sortBy, sortOrder, pagination.currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchProducts}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleFilters}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            <SearchBar 
              value={filters.search}
              onChange={(search) => handleFilterChange({ search })}
            />
          </div>
          <SortDropdown 
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          {showFilters && (
            <div className="lg:w-64 flex-shrink-0">
              <FilterSidebar 
                filters={filters}
                onFilterChange={handleFilterChange}
                totalProducts={pagination.totalProducts}
              />
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid 
              products={products}
              loading={loading}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 