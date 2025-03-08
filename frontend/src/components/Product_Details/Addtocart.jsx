import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import {
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaMinus,
  FaPlus,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axiosInstanace";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productSlice";
import './styles.css'
import { IndexContext } from "../../context";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/auth/AuthContext";
import { toast } from "react-toastify";
import { WishlistContext } from "../../context/WishlistContext";
import { HiHeart } from "react-icons/hi2";
import useLocalStorage from "../../hooks/useLocalStorage";

function Addtocart() {

  const { products, isLoading } = useSelector(store => store.products)
  const dispatch = useDispatch()
  const { productId, siteSettings } = useContext(IndexContext)
  const { addToCart, addToCartBuyNow } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate()
  const [isCartOpen, setIsCartOpen] = useLocalStorage('isCartOpen', false)

  console.log(siteSettings);


  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch, productId])

  const oneProduct = products?.find((product) => product._id === productId);
  const productImages = oneProduct?.image || [];

  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    oneProduct?.variants?.[0]?.color || "Black"
  );
  const [selectedSize, setSelectedSize] = useState(
    oneProduct?.variants?.[0]?.size || "Default"
  );

  useEffect(() => {
    const variant = oneProduct?.variants?.find(v => v.color === selectedColor);
    if (variant) {
      setSelectedSize(variant.size);
    }
  }, [selectedColor, oneProduct?.variants]);

  if (isLoading) {
    return <div className='h-screen'> <div className="relative w-full h-screen flex justify-center items-center">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
    </div>
    </div>
  }

  const handleBuyNow = () => {
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    if (oneProduct) {
      const productToAdd = {
        ...oneProduct,
        selectedColor,
        selectedSize,
        quantity,
      };

      try {
        addToCartBuyNow(productToAdd, quantity);
        navigate('/checkout');
      } catch (error) {
        console.error('Error processing buy now:', error);
        toast.error('Failed to process. Please try again.');
      }
    }
  };

  const handleAddToCart = () => {
    if (oneProduct) {
      const productToAdd = {
        ...oneProduct,
        selectedColor,
        selectedSize,
        quantity,
      };

      addToCart(productToAdd, quantity);
      setIsCartOpen(true);
      toast.success('Added to cart successfully!');
    }
  };


  const handleToggleWishlist = () => {
    if (oneProduct) {
      toggleWishlist(oneProduct);
    }
  };

  return (
    <>
      <div className="max-w-[1300px] mx-auto mt-2 md:p-6 px-2 flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <div className="relative group">
            <img
              src={selectedImage ? selectedImage : productImages[0]}
              alt={oneProduct?.name}
              className="w-full h-[400px] lg:h-[600px] max-[640px]:h-[200px] object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            {oneProduct?.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {oneProduct.discount}% OFF
              </div>
            )}
          </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="mt-4"
            breakpoints={{
              320: {
                slidesPerView: 3,
              },
              480: {
                slidesPerView: 4,
              },
            }}
          >
            {productImages?.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={oneProduct?.name}
                  className={`w-full h-20 object-cover rounded cursor-pointer border-2 transition-all duration-300 ${selectedImage === img
                    ? 'border-orange-500 scale-105'
                    : 'border-gray-200 hover:border-gray-400'
                    }`}
                  onClick={() => setSelectedImage(img)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 space-y-6 max-[640px]:space-y-2 p-4">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-800">{oneProduct?.name}</h1>
            <button
              onClick={handleToggleWishlist}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            >
              <HiHeart
                className={`w-6 h-6 transition-colors duration-300 ${isInWishlist(oneProduct?._id) ? 'text-red-500' : 'text-gray-400'
                  }`}
              />
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-teal-600">
                ৳{(oneProduct?.price - (oneProduct?.price * (oneProduct?.discount || 0) / 100)).toFixed(2)}
              </span>
              {oneProduct?.discount > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  ৳{oneProduct?.price?.toFixed(2)}
                </span>
              )}
            </div>
            {oneProduct?.quantity > 0 ? (
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Color Selection */}
          {oneProduct?.variants?.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-semibold text-lg">Color:</span>
              <div className="flex gap-3 mt-2">
                {oneProduct?.variants?.map((variant, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 border rounded-md transition-all duration-300 ${selectedColor === variant.color
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white hover:bg-gray-50"
                      }`}
                    onClick={() => setSelectedColor(variant.color)}
                  >
                    {variant.color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {oneProduct?.variants?.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-semibold text-lg">Size:</span>
              <div className="flex gap-3 mt-2">
                {oneProduct?.variants
                  ?.filter(variant => variant.color === selectedColor)
                  .map((variant, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 border rounded-lg transition-all duration-300 ${selectedSize === variant.size
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white hover:bg-gray-100"
                        }`}
                      onClick={() => setSelectedSize(variant.size)}
                    >
                      {variant.size}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="flex items-center gap-4 mt-4">
            <span className="font-semibold text-lg">Quantity:</span>
            <div className="flex items-center border px-4 py-2 rounded-lg bg-white">
              <button
                className="text-lg text-gray-700 hover:text-red-500 transition-colors duration-300"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                <FaMinus />
              </button>
              <span className="px-6 text-lg">{quantity}</span>
              <button
                className="text-lg text-gray-700 hover:text-green-500 transition-colors duration-300"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            <button
              onClick={handleBuyNow}
              className="w-full sm:w-auto bg-orange-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300 font-semibold"
            >
              BUY NOW
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-300 font-semibold"
            >
              ADD TO CART
            </button>
          </div>

          <div className="flex items-center gap-4 mt-14 text-gray-600">
            <span className="font-bold">Follow us:</span>
            {siteSettings?.socialMedia?.facebook && (
              <a href={siteSettings?.socialMedia?.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl cursor-pointer hover:text-blue-600 transition-colors duration-300" />
              </a>
            )}
            {siteSettings?.socialMedia?.youtube && (
              <a href={siteSettings?.socialMedia?.youtube} target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-2xl cursor-pointer hover:text-red-600 transition-colors duration-300" />
              </a>
            )}
            {siteSettings?.socialMedia?.instagram && (
              <a href={siteSettings?.socialMedia?.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl cursor-pointer hover:text-pink-500 transition-colors duration-300" />
              </a>
            )}
            {siteSettings?.socialMedia?.twitter && (
              <a href={siteSettings?.socialMedia?.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600 transition-colors duration-300" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Addtocart;
