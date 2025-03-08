import React, { useState, useEffect, useRef, useContext } from 'react'
import { FaSearch, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, clearSearch } from '../features/products/searchSlice'
import { useNavigate } from 'react-router-dom'
import { IndexContext } from '../context'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const dropdownRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { searchProducts, isLoading, isError, error } = useSelector((state) => state.search)
  const { setProductId } = useContext(IndexContext)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
        setSelectedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        dispatch(getProducts(searchTerm))
        setShowDropdown(true)
        setSelectedIndex(-1)
      } else {
        dispatch(clearSearch())
        setShowDropdown(false)
        setSelectedIndex(-1)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, dispatch])

  const handleKeyDown = (e) => {
    if (!showDropdown || !searchProducts?.length) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev < searchProducts.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : searchProducts.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleProductClick(searchProducts[selectedIndex])
        } else if (searchProducts.length > 0) {
          handleProductClick(searchProducts[0])
        }
        break
      case 'Escape':
        setShowDropdown(false)
        setSelectedIndex(-1)
        break
      default:
        break
    }
  }

  const handleProductClick = (product) => {
    setProductId(product._id)
    setShowDropdown(false)
    setSelectedIndex(-1)
    navigate(`/products/${product._id}`)
  }

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      if (searchProducts?.length > 0) {
        handleProductClick(searchProducts[0])
      } else {
        navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
        setShowDropdown(false)
      }
    }
  }

  const formatPrice = (price) => {
    return price.toLocaleString('en-BD')
  }

  return (
    <div className="relative w-[60%] max-w-2xl max-[1024px]:hidden mx-auto" ref={dropdownRef}>
      {/* Enhanced Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for backpack, laptop bag and more..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-orange-500 dark:focus:border-orange-500 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-2 hover:text-orange-500 text-gray-400 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={handleSearchClick}
            className="flex items-center justify-center px-6 py-2 mr-1 h-[calc(100%-8px)] my-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-200 font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      {showDropdown && searchProducts && searchProducts.length > 0 && (
        <div className="absolute z-[1000] top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-200 ease-out">
          <div className="divide-y grid grid-cols-2 divide-gray-100 dark:divide-gray-700">
            {searchProducts.slice(0, 6).map((product, index) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex items-center p-4 cursor-pointer transition-all duration-200 ${index === selectedIndex
                  ? 'bg-orange-50 dark:bg-orange-900/10'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
              >
                {/* Product Image */}
                <div className="w-16 h-16 flex-shrink-0 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="ml-4 flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-orange-500">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Category: {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      {product.discount > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}৳
                        </p>
                      )}
                      <p className="text-base font-medium text-orange-500">
                        {formatPrice(product.price)}৳
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced View All Results */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => (navigate(`/product-category`), setShowDropdown(false))}
              className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm flex items-center justify-center gap-2"
            >
              <span>VIEW ALL RESULTS</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Loading State */}
      {isLoading && (
        <div className="absolute z-[1000] top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-3 border-orange-500 border-t-transparent"></div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">Searching products...</p>
          </div>
        </div>
      )}

      {/* Enhanced Error State */}
      {isError && !isLoading && (
        <div className="absolute z-[1000] top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-3 text-red-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">{error || 'Error searching products'}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search