/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineStar,
  AiOutlineTags,
} from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { RiArrowRightSFill } from "react-icons/ri";
import { axiosInstance } from '../../lib/axiosInstanace';
import { IndexContext } from '../../context';
import { toast } from 'react-toastify';
import { setCategoryFilter, setPriceFilter, clearFilters, fetchProducts } from '../../redux/features/products/productSlice';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { setProductId } = useContext(IndexContext);
  const { products, loading, activeFilters } = useSelector(store => store.products);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const categoryLocation = location.pathname.split("/")[2];


  useEffect(() => {
    if (products?.length > 0) {
      const maxPrice = Math.max(...products.map(product => {
        const discountedPrice = product.price - (product.price * (product.discount || 0) / 100);
        return discountedPrice;
      }));
      setPriceRange([0, Math.ceil(maxPrice)]);
    }
  }, [products]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance('/category')
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handlePriceFilter = () => {
    if (!products?.length) {
      toast.error('No products available to filter');
      return;
    }

    // Apply price filter
    dispatch(setPriceFilter(priceRange));

    // Show success message with count
    const filteredCount = products.filter(product => {
      const discountedPrice = product.price - (product.price * (product.discount || 0) / 100);
      return discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];
    }).length;

    if (filteredCount === 0) {
      toast.info('No products found in this price range');
    } else {
      toast.success(`Found ${filteredCount} products in price range ৳${priceRange[0]} - ৳${priceRange[1]}`);
    }
  };

  const clearPriceFilter = () => {
    if (products?.length) {
      const maxPrice = Math.max(...products.map(product => {
        const discountedPrice = product.price - (product.price * (product.discount || 0) / 100);
        return discountedPrice;
      }));
      setPriceRange([0, Math.ceil(maxPrice)]);
      dispatch(clearFilters());
      toast.success('Filters cleared');
    }
  };

  const handleCategoryClick = (category) => {
    dispatch(fetchProducts(category));


  };

  return (
    <>
      <div className="max-lg:hidden">
        <div className="static md:w-auto z-50 bg-white transform transition-transform duration-300 ease-in-out md:translate-x-0 md:col-span-4 text-white text-center">
          <div className="max-w-sm min-w-[300px] p-6 bg-white rounded-lg shadow-md h-screen md:h-auto overflow-y-auto">
            {/* Price Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                  <AiOutlineTags className="text-teal-500" />
                  Filter by Price
                </h3>
                <button
                  onClick={clearPriceFilter}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  Reset All
                </button>
              </div>
              <div className="px-2">
                <Slider
                  range
                  min={0}
                  max={10000}
                  value={priceRange}
                  onChange={handlePriceChange}
                  trackStyle={[{ backgroundColor: '#14b8a6' }]}
                  handleStyle={[
                    { backgroundColor: '#14b8a6', borderColor: '#14b8a6' },
                    { backgroundColor: '#14b8a6', borderColor: '#14b8a6' }
                  ]}
                  railStyle={{ backgroundColor: '#e2e8f0' }}
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm font-medium text-gray-700">
                  Range: <span className="text-teal-500">৳{priceRange[0]}</span> - <span className="text-teal-500">৳{priceRange[1]}</span>
                </div>
                <button
                  onClick={handlePriceFilter}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600 transition-colors duration-200"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Categories Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <AiOutlineShoppingCart className="text-teal-500" />
                Categories
              </h3>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-8 bg-gray-200 rounded-md"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {categories?.map((category, index) => (
                    <Link to={`/product-category/${category.category.split(" ").join("-")}`} key={index} className="border-b border-gray-100 last:border-0">
                      <button
                        onClick={() => {
                          setIsCategoriesOpen(prev => prev === index ? null : index);
                          handleCategoryClick(category.category);
                        }}
                        className={`flex items-center justify-between w-full py-2 px-3 hover:bg-gray-50 rounded-md transition-colors duration-200  ${categoryLocation === category.category ? 'bg-teal-50 text-teal-600' : ''
                          }`}
                      >
                        <span className={`${categoryLocation === category.category ? 'text-teal-500' : 'text-gray-700'} hover:text-teal-500 font-medium`}>
                          {category.category}
                        </span>

                      </button>

                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Trending Products Section */}
            <div className="mt-10">
              <p className="text-black text-start text-xl md:hidden lg:block sm:hidden">
                Trending Products
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4 mt-8 md:hidden lg:block">
              {products?.slice(3, 7).map(product => (
                <div onClick={() => setProductId(product._id)} key={product._id}>
                  <Link
                    to={`/products/${product.name.replaceAll(" ", "-")}`}
                    className="flex items-center cursor-pointer active:scale-90 duration-300 border rounded-md p-3 shadow-sm bg-white"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h2 className="text-sm font-semibold text-start text-gray-800">
                        {product.name}
                      </h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-400 line-through">
                          ৳{product.price - product.discount}
                        </span>
                        <span className="text-sm text-red-500 font-bold">
                          ৳{product.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
