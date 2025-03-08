import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HiHeart } from "react-icons/hi2";
import { AiFillStar } from 'react-icons/ai';
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { IndexContext } from "../../context";

const ProductCart = ({ gridCols, currentItems }) => {
  const { setProductId } = useContext(IndexContext);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);


  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  if (!currentItems?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <img
          src="/no-results.svg"
          alt="No products found"
          className="w-64 h-64 mb-6"
        />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  const getGridClass = () => {
    switch (gridCols) {
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default:
        return 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className={`grid ${getGridClass()} gap-4 sm:gap-6`}>
      {currentItems.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <Link
              to={`/products/${product.name.replaceAll(" ", "-")}`}
              onClick={() => setProductId(product._id)}
              className="block"
            >
              <img
                src={product.image?.[0]}
                alt={product.name}
                className="w-full h-48 max-[640px]:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            {/* Quick Action Buttons */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col space-y-2">
              <button
                onClick={(e) => handleToggleWishlist(e, product)}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors active:scale-95"
              >
                <HiHeart
                  className={`w-5 h-5 ${isInWishlist(product._id) ? "text-red-500" : "text-gray-600"}`}
                />
              </button>
            </div>

            {/* Discount Badge */}
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{product.discount}% OFF
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4">
            <Link
              to={`/products/${product.name.replaceAll(" ", "-")}`}
              onClick={() => setProductId(product._id)}
            >
              <h3 className="text-[13px] sm:text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-teal-600 transition-colors">
                {product.name.length > 20 ? product.name.slice(0, 20) + "..." : product.name}
              </h3>
            </Link>

            {/* Price */}
            <div className="flex max-[640px]:flex-col items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <div className='flex items-center gap-2'>
                  <span className="text-lg sm:text-xl font-bold text-teal-600">
                    ৳{(product.price - (product.price * (product.discount || 0) / 100)).toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                      ৳{product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <span className={`text-xs sm:text-sm ${product.quantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCart;
