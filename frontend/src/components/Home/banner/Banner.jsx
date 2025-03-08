import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaShoppingBag, FaTruck, FaHeadset, FaShieldAlt } from 'react-icons/fa';
import './banner.css';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      image: "https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg",
      title: "Summer Sale",
      subtitle: "Up to 70% off on all products",
      description: "Shop the latest trends with amazing discounts",
      buttonText: "Shop Now",
      buttonLink: "/product-category",
      color: "bg-blue-500"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1000&auto=format&fit=crop",
      title: "New Arrivals",
      subtitle: "Check out our latest collection",
      description: "Discover the newest styles and trends",
      buttonText: "Explore",
      buttonLink: "/product-category",
      color: "bg-purple-500"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
      title: "Special Offers",
      subtitle: "Limited time deals",
      description: "Don't miss out on these amazing offers",
      buttonText: "View Deals",
      buttonLink: "/product-category",
      color: "bg-red-500"
    }
  ];

  const [imageError, setImageError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop";

  const handleImageError = () => {
    setImageError(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <FaTruck className="text-2xl" />,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      title: "24/7 Support",
      description: "Always here to help"
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Secure Payment",
      description: "100% secure checkout"
    },
    {
      icon: <FaShoppingBag className="text-2xl" />,
      title: "Easy Returns",
      description: "30-day return policy"
    }
  ];

  return (
    <div className="relative">
      {/* Main Banner Slider */}
      <div className="banner-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <img
                src={imageError ? fallbackImage : banners[currentSlide].image}
                alt={banners[currentSlide].title}
                className="banner-image"
                onError={handleImageError}
              />
              <div className="banner-overlay" />
              <div className="banner-content">
                <div className="banner-text">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="banner-title"
                  >
                    {banners[currentSlide].title}
                  </motion.h1>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="banner-subtitle"
                  >
                    {banners[currentSlide].subtitle}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="banner-description"
                  >
                    {banners[currentSlide].description}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link
                      to={banners[currentSlide].buttonLink}
                      className={`banner-button ${banners[currentSlide].color}`}
                    >
                      {banners[currentSlide].buttonText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="banner-navigation">
          <button
            onClick={prevSlide}
            className="banner-nav-button"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <button
            onClick={nextSlide}
            className="banner-nav-button"
          >
            <FaArrowRight className="text-xl" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="banner-indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`banner-indicator ${currentSlide === index ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>


    </div>
  );
};

export default Banner;
