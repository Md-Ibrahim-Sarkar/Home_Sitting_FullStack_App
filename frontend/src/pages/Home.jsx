import React, { useEffect, useState } from 'react';
import Banner from "../components/Home/banner/Banner"
import CategoryByProducts from "../components/Home/categoryByProducts/CategoryByProducts"
import FeaturesCard from "../components/other-section/FeaturesCard"
import FeatureSection from "../components/other-section/FeatureSection"
import Future_of_Home_Services from "../components/other-section/Future_of_Home_Services"
import { motion } from 'framer-motion';
import { FaTruck, FaHeadset, FaShieldAlt, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axiosInstanace';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/features/products/productSlice';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    const formattedCategory = category.toLowerCase().split(" ").join("-");
    dispatch(fetchProducts(category));
    navigate(`/product-category/${formattedCategory}`);
  };

  const features = [
    {
      icon: <FaTruck className="text-4xl text-blue-500" />,
      title: "Shipping Policy",
      description: "Standard shipping fees apply"
    },
    {
      icon: <FaHeadset className="text-4xl text-blue-500" />,
      title: "24/7 Support",
      description: "Always here to help"
    },
    {
      icon: <FaShieldAlt className="text-4xl text-blue-500" />,
      title: "Secure Payment",
      description: "100% secure checkout"
    },
    {
      icon: <FaShoppingBag className="text-4xl text-blue-500" />,
      title: "Cash on Delivery",
      description: "Enjoy the convenience of Cash on Delivery"
    }
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Banner */}
      <Banner />

      {/* Category Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold capitalize text-gray-900 dark:text-white mb-2">Categories</h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => handleCategoryClick(category.category)}
                >
                  <div>
                    <div className="relative h-48 sm:h-56">
                      <img
                        src={category.image || '/images/placeholder.jpg'}
                        alt={category.category}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {category.category}
                      </h3>
                      <span className="text-white/80 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        Shop Now →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Products Section */}
      <CategoryByProducts />

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide the best shopping experience with our premium services and quality products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-white dark:bg-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;