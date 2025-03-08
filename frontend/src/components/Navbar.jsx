import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import avatar from '../assets/images/profileAvatar.png'

import { FaShoppingCart, FaHeart, FaUser, FaSearch, FaChevronDown, FaShoppingBag, FaEnvelope, FaCog, FaSignOutAlt, FaTachometerAlt, FaUserCircle, FaBell, FaQuestionCircle, FaShieldAlt } from "react-icons/fa";
import Menu from './menu-sidebar/Menu';
import LogIn from './auth/LogIn';
import { CartContext } from '../context/CartContext';
import SidebarCart from './shopping/SidebarCart';
import { AuthContext } from '../context/auth/AuthContext';
import Search from './Search';
import { axiosInstance } from '../lib/axiosInstanace';
import { useDispatch } from 'react-redux';
import { setCategoryFilter, setPriceFilter, clearFilters, fetchProducts } from '../redux/features/products/productSlice';
import { IndexContext } from '../context';

const Navbar = () => {
  const location = useLocation()
  const categorypath = location.pathname.split('/')[2]
  const subCategory = location.pathname.split('/')[3]
  const path = location.pathname
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const navigate = useNavigate()
  const [profileDrop, setProfileDrop] = useState(false);
  const [open, setOpen] = useState(false);
  const { isCartOpen, setIsCartOpen, cart, } = useContext(CartContext)
  const { logOut } = useContext(AuthContext)
  const { siteSettings } = useContext(IndexContext)
  const dispatch = useDispatch()


  const handleLogout = async () => {
    await logOut();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const { user, isLoading, } = useContext(AuthContext)

  // Profie dropDown menu setups
  const dropdownRef = useRef(null);

  const profileHandle = () => {
    setProfileDrop(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [categories, setCategories] = useState()

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axiosInstance('/category')
      setCategories(res.data);

    }
    fetchCategories();
  }, [])



  const handleCategoryClick = (category) => {
    // Apply the new category filter
    dispatch(fetchProducts(category));
  };

  return (
    <>
      <header className='font-[sans-serif] min-h-[55px] tracking-wide border-b border-gray-300 dark:border-gray-700 relative max-[640px]:max-h-[50px] z-50'>
        {/* frist section */}
        <div className=''>
          <section className=" min-h-[40px] max-w-[1300px] mx-auto lg:px-4  flex items-center justify-between max-[640px]:max-h-[50px]">
            <button onClick={toggleMenu} className='lg:hidden cursor-pointer ml-4'>
              <FiMenu className='w-7 h-7' />
            </button>
            <div>
              <Link to={'/'}>
                {siteSettings?.headerLogo ? (
                  <img
                    src={siteSettings?.headerLogo}
                    alt="logo"
                    className="w-16 sm:w-12"
                  />
                ) : (
                  <div className="w-16 sm:w-12 animate-pulse bg-gray-500"></div>
                )}
              </Link>
            </div>
            <Search />
            <div className="flex items-center justify-between gap-8 p-4">
              <div className="flex items-center space-x-4">
                <div className='flex items-center max-sm:ml-auto'>

                  <ul className="flex space-x-4 max-sm:space-x-0 items-center">

                    {/* profile icon */}
                    {
                      user ? <li className="relative  duration-300 px-1 ">

                        <img onClick={profileHandle} className={`w-12 h-12 hover:border-2 hover:border-cyan-500 max-sm:w-10 max-sm:h-10 object-cover border cursor-pointer rounded-full ${profileDrop && 'border-2 border-cyan-500'}`} src={`${user?.photoURL ? user?.photoURL : avatar}`} alt="" />

                        {/* Dropdown menu */}
                        {profileDrop &&

                          <ul
                            ref={dropdownRef}

                            className='max-[640px]:max-h-[400px] overflow-y-auto'
                          >
                            <div className="absolute z-[10000] right-0 max-[640px]:max-w-[250px] max-[640px]:max-h-[600px] overflow-y-auto duration-300 w-80 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
                              {/* User Info Section */}
                              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="relative">
                                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                                    <img
                                      src={user?.photoURL}
                                      alt={user?.displayName}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800"></div>
                                </div>
                                <div>
                                  <h6 className="font-semibold text-gray-900 dark:text-white text-lg">{user?.displayName}</h6>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{user?.Database?.email}</p>
                                </div>
                              </div>


                              {/* Main Menu */}
                              <div className="">
                                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Menu</h3>
                                <div className="space-y-1">
                                  {user?.Database?.role === "admin" && (
                                    <Link
                                      to="/admin-dashboard"
                                      onClick={profileHandle}
                                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${path === '/admin-dashboard'
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                      <FaTachometerAlt className="w-5 h-5" />
                                      <span className="font-medium">Dashboard</span>
                                    </Link>
                                  )}
                                  <Link
                                    to="/my-profile"
                                    onClick={profileHandle}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <FaUserCircle className="w-5 h-5 text-purple-500" />
                                    <span className="text-gray-700 dark:text-gray-300">My Profile</span>
                                  </Link>

                                </div>
                              </div>

                              {/* Support & Settings */}
                              <div className="">

                                <div className="space-y-1">
                                  <Link
                                    to="/contact-us"
                                    onClick={profileHandle}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <FaEnvelope className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700 dark:text-gray-300">Contact Us</span>
                                  </Link>

                                </div>
                              </div>

                              {/* Security &  */}
                              <div>
                                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Logout</h3>
                                <div className="space-y-1">

                                  <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                  >
                                    <FaSignOutAlt className="w-5 h-5" />
                                    <span className="font-medium">Log Out</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </ul>

                        }
                      </li> : <div
                        className="relative "
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                      >
                        {/* User Icon */}
                        <Link to={'/login'}>
                          <FaUser className="text-xl cursor-pointer max-[1024px]:hidden" />
                        </Link>

                        {/* Login Form with Framer Motion */}
                        <AnimatePresence>
                          {open && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className={`absolute top-full right-0 w-96 z-[1000] bg-white shadow-lg rounded-lg p-1 mt-2 ${location.pathname === '/login' && 'hidden'}`}
                            >
                              <LogIn />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    }
                  </ul>
                </div>

                <Link className='max-[1000px]:hidden' to={'/wishlist'}>
                  <FaHeart className="text-xl cursor-pointer" />
                </Link>
                <div className='flex items-center cursor-pointer' onClick={() => {
                  if (path !== '/shopping-cart') {
                    setIsCartOpen(!isCartOpen)
                  }
                }}>
                  <div className="relative ">
                    <FaShoppingCart className="text-xl" />
                    {cart.length > 0 && (
                      <div className='w-4 h-4 absolute -top-3 -right-3 bg-orange-500 text-white text-[9px] rounded-full flex justify-center items-center'>
                        <span className="">{cart.length}</span>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>


          </section>

        </div>

        {/* second section */}
        <hr className='text-gray-300 max-[640px]:hidden' />
        <div className='flex flex-wrap justify-center max-[1024px]:hidden max-w-[1300px] mx-auto items-center justify-between py-3 px-4 sm:px-10  lg:gap-y-4 gap-y-6 gap-x-4'>

          <div id="collapseMenu"
            className="max-lg:hidden lg:!flex lg:items-center lg:justify-center max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50 ">
            <div
              className='lg:!flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-[#151d20] max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto'>
              <div className="w-full">
                <nav className="flex justify-center space-x-6 ">
                  <Link to={'/'} className={` ${path === '/' && 'text-orange-500'} `}>
                    Home
                  </Link>
                  {categories?.map((category) => (
                    <div key={category._id} className="relative group">
                      <Link to={`/product-category/${category.category.split(" ").join("-")}`} className="text-black">
                        <div onClick={() => handleCategoryClick(category.category)} className={`hover:text-orange-700 flex items-center ${path === `/product-category/${category.category.split(" ").join("-")}` && 'text-orange-700'}`}>
                          {category.category}
                          {category.subcategories?.length > 0 && (
                            <FaChevronDown className="ml-1" />
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>


            </div>
          </div>


        </div>
        <hr className='text-gray-300 max-[640px]:hidden' />

        {/* menubar isOpen */}
        <Menu isOpen={isOpen} setIsOpen={setIsOpen} toggleMenu={toggleMenu} profileHandle={profileHandle} />
        <SidebarCart />
      </header>
    </>
  )
}

export default Navbar