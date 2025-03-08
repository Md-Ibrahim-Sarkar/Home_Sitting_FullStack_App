import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { IndexContext } from '../../../context';
import { HiHeart } from 'react-icons/hi2';
import { WishlistContext } from '../../../context/WishlistContext';
import { CartContext } from '../../../context/CartContext';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { setProductId } = useContext(IndexContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  if (!product) {
    return null;
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };


  const discountedPrice = product.price - (product.price * (product.discount || 0) / 100);


  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link
      to={`/products/${product.name.replaceAll(" ", "-")}`}
      onClick={() => setProductId(product._id)}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={product.image?.[0] || product.image}
            alt={product.name}
            className="h-48 max-[640px]:h-32 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

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
          <div className="absolute max-[640px]:top-1 max-[640px]:left-1 max-[640px]:text-[13px] top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg max-[640px]:text-[13px] font-semibold text-gray-900 mb-2 ">
          {product.name.length > 20 ? product.name.slice(0, 16) + "..." : product.name}
        </h3>



        {/* Price */}
        <div className="flex max-[640px]:flex-col items-center justify-between">
          <div className="flex max-[640px]:flex-col items-center gap-2">
            <div className='flex items-center gap-2'>
              <span className="text-xl max-[640px]:text-[13px] font-bold text-teal-600">
                ৳{(product.price - (product.price * (product.discount || 0) / 100)).toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="text-sm max-[640px]:text-[13px] text-gray-400 line-through">
                  ৳{product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <span className={`text-sm max-[640px]:text-[13px] ${product.quantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;