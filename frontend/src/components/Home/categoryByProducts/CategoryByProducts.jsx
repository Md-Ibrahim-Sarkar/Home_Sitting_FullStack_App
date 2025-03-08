import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '../../../lib/axiosInstanace';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { fetchProducts } from '../../../redux/features/products/productSlice';
import ProductCard from './productCard';

const CategoryByProducts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance('/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    dispatch(fetchProducts());
  }, [dispatch]);

  const categoryProducts = selectedCategory === 'all'
    ? products
    : products?.filter(
      (product) => product.category?.toLowerCase() === selectedCategory?.toLowerCase()
    );

  console.log('Selected Category:', selectedCategory);
  console.log('Category Products:', categoryProducts);

  return (
    <div className="py-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover our curated collection of products across various categories.
            Find exactly what you're looking for with our carefully selected items.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            All Products
          </motion.button>
          {categories.map((category, index) => (
            <motion.button
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category.category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.category
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {category.category}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts?.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            {categoryProducts?.length > 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className="text-center mt-8"
              >
                <Link
                  to={`/product-category/${selectedCategory === 'all' ? '' : selectedCategory}`}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  View All Products
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}

            {categoryProducts?.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className="text-center"
              >
                <div className=" flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <FaSearch className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    We couldn't find any products in this category. Try browsing other categories or check back later.
                  </p>
                  <Link to="/product-category"
                    className="mt-6 px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer"
                  >
                    Browse All Products
                  </Link>
                </div>
              </motion.div>
            )}

          </>
        )}
      </div>
    </div>
  );
};

export default CategoryByProducts;
