/* eslint-disable react/prop-types */
import { HiHeart } from 'react-icons/hi2';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiOutlineAppstore,
  AiOutlineBars,
  AiOutlineProduct,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { IoMdGrid } from 'react-icons/io';
import ProductCart from './ProductCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { fetchProducts } from '../../redux/features/products/productSlice';

const RightSidebar = () => {
  const [gridCols, setGridCols] = useState(4);
  const [sortOption, setSortOption] = useState('default');
  const { filteredProducts, loading } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = location.pathname.split('/').pop();

  // Reset page when filtered products change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const handleBrowseAllProducts = useCallback(() => {
    dispatch(fetchProducts()); // Fetch all products without category
    navigate('/product-category');
  }, [dispatch, navigate]);

  const getSortedProducts = () => {
    if (!filteredProducts) return [];

    const sorted = [...filteredProducts];
    switch (sortOption) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sorted.sort((a, b) => {
          const priceA = a.price - (a.price * (a.discount || 0) / 100);
          const priceB = b.price - (b.price * (b.discount || 0) / 100);
          return priceA - priceB;
        });
      case 'price-desc':
        return sorted.sort((a, b) => {
          const priceA = a.price - (a.price * (a.discount || 0) / 100);
          const priceB = b.price - (b.price * (b.discount || 0) / 100);
          return priceB - priceA;
        });
      default:
        return sorted;
    }
  };

  // Pagination
  const itemsPerPage = gridCols === 4 ? 12 : 9;
  const sortedProducts = getSortedProducts();
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentItems = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGridChange = (cols) => {
    setGridCols(cols);
    setCurrentPage(1); // Reset to first page when changing grid
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page when changing sort
  };

  return (
    <div className="w-full">
      <div className="p-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          {/* Breadcrumb */}
          <div>
            <p className="text-gray-700 hidden md:flex items-center">
              <Link to={'/'} className='hover:text-gray-700'>Home</Link>
              <span className="mx-2">/</span>
              <span className="font-medium capitalize">
                {category === 'product-category' ? 'All Products' :
                  category === '' ? 'All Products' :
                    category.split('-').join(' ')}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                ({sortedProducts.length} items)
              </span>
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end">
            {/* Grid View */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => handleGridChange(2)}
                className={`p-2 rounded transition-all ${gridCols === 2 ? 'bg-teal-50 text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <AiOutlineBars className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleGridChange(3)}
                className={`p-2 rounded transition-all ${gridCols === 3 ? 'bg-teal-50 text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <AiOutlineAppstore className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleGridChange(4)}
                className={`p-2 rounded transition-all ${gridCols === 4 ? 'bg-teal-50 text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <IoMdGrid className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="default">Default sorting</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="relative">
              <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-teal-500"></div>
              <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
            </div>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <FaSearch className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              We couldn't find any products in this category. Try browsing other categories or check back later.
            </p>
            <button
              onClick={handleBrowseAllProducts}
              className="mt-6 px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer"
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <>
            <ProductCart gridCols={gridCols} currentItems={currentItems} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => changePage(page)}
                      className={`w-8 h-8 rounded-md text-sm ${currentPage === page
                        ? 'bg-teal-500 text-white'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
