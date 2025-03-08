import React, { useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../features/products/productSlice';
import { Link } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import { IndexContext } from '../../context';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

function RelatedData() {
  const { setProductId } = useContext(IndexContext)
  const { products, isLoading } = useSelector(store => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className='h-screen'>
        <div className="relative w-full h-screen flex justify-center items-center">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
          <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl max-[640px]:text-lg font-bold text-gray-900 dark:text-white">
          Related Products
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Discover more items you might like
        </p>
      </div>

      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        navigation={true}
        scrollbar={{ draggable: true }}
        modules={[Navigation, Scrollbar, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerGroup={1}
        className="mySwiper py-3"
      >
        {products?.slice(3, 10).map(product => (
          <SwiperSlide key={product._id}>
            <div onClick={() => setProductId(product._id)}>
              <Link to={`/products/${product.name.replaceAll(" ", "-")}`}>
                <div className="group border-2  border-gray-200 relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative h-32 w-full  overflow-hidden aspect-square">
                    <img
                      className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      src={product.image[0]}
                      alt={product.name}
                    />


                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {product.category}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ৳{(product.price - (product.price * (product.discount || 0) / 100)).toFixed(2)}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ৳{product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400">4.5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default RelatedData;


