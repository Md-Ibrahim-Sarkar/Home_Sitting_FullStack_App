import banner1 from '../../../assets/images/banner-1.jpg';
import banner2 from '../../../assets/images/banner-2.jpg';
import banner3 from '../../../assets/images/banner-3.jpg';
import banner4 from '../../../assets/images/banner-4.jpg';
import banner5 from '../../../assets/images/banner-5.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <>
      <div className='h-[330px] relative font-sans'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper'
        >
          {/* Add img tags to display the images */}
          <SwiperSlide>
            <img src={banner1} alt="Banner 1" className="banner-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner2} alt="Banner 2" className="banner-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner3} alt="Banner 3" className="banner-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner4} alt="Banner 4" className="banner-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner5} alt="Banner 5" className="banner-image" />
          </SwiperSlide>
        </Swiper>


        <div className="min-h-[350px] absolute inset-0 z-40 flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="sm:text-4xl text-2xl font-bold mb-6">Transform Your Home with Our Expert Services</h2>
          <p className="sm:text-lg text-base text-center text-gray-200">From repairs to renovations, we make your dream home a reality. Get started today!</p>

          <Link to={'/services'}
            type="button"
            className="mt-12 bg-transparent font-semibold cursor-pointer text-white text-base py-3 px-6 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300">
            Book a Service
          </Link>
        </div>

        {/* Background overlay */}
        <div className="before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10"></div>
      </div>

    </>
  );
}

export default Banner;
