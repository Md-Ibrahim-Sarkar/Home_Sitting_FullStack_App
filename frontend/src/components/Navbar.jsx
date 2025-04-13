import { Link, useLocation, useNavigate } from 'react-router-dom'
import lightLogo from '../assets/images/logo.png'
import darkLogo from '../assets/images/dark-logo.png'
import { FiMenu } from "react-icons/fi";
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useDispatch, useSelector } from 'react-redux';
import { useUserlogoutApi } from '../features/users/userApi';
import { toast } from 'react-toastify';
import avatar from '../assets/images/profileAvatar.png'
import { addUser } from '../features/users/userSlice';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { IoCloseSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { TbLogin2 } from "react-icons/tb";

const Navbar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const path = location.pathname
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const logout = useUserlogoutApi()
  const navigate = useNavigate()
  const [profileDrop, setProfileDrop] = useState(false);
  const [menuDrop, setMenuDrop] = useState(false);



  // Logout setups for user
  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/login');
    dispatch(addUser(null));
    toast.success('Logged out successfully');
  };
  const { users } = useSelector((store) => store.user);

  //  dark mode setups
  const getTheme = () =>
    document.documentElement.classList.contains("dark") ? darkLogo : lightLogo;

  const [logo, setLogo] = useState(getTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setLogo(getTheme());
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["className"] });

    return () => observer.disconnect();
  }, []);




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

  return (
    <>
      <header className='font-[sans-serif] min-h-[60px] tracking-wide border-b border-gray-300 dark:border-gray-700 relative z-50'>
        <div className='bg-cyan-500'>
          <section className=" min-h-[40px] max-w-[1300px] mx-auto px-4 py-2 sm:px-10 flex items-center justify-between ">
            <button type="button" className=" text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#fff" className="mr-3 inline-block"
                viewBox="0 0 482.6 482.6">
                <path
                  d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7zm-72.6-216.6c1.2-13.3 6.3-24.4 15.9-34l37.2-37.2c5.8-5.6 12.2-8.5 18.4-8.5 6.1 0 12.3 2.9 18 8.7 6.7 6.2 13 12.7 19.8 19.6 3.4 3.5 6.9 7 10.4 10.6l29.8 29.8c6.2 6.2 9.4 12.5 9.4 18.7s-3.2 12.5-9.4 18.7c-3.1 3.1-6.2 6.3-9.3 9.4-9.3 9.4-18 18.3-27.6 26.8l-.5.5c-8.3 8.3-7 16.2-5 22.2.1.3.2.5.3.8 7.7 18.5 18.4 36.1 35.1 57.1 30 37 61.6 65.7 96.4 87.8 4.3 2.8 8.9 5 13.2 7.2 4 2 7.7 3.9 11 6 .4.2.7.4 1.1.6 3.3 1.7 6.5 2.5 9.7 2.5 8 0 13.2-5.1 14.9-6.8l37.4-37.4c5.8-5.8 12.1-8.9 18.3-8.9 7.6 0 13.8 4.7 17.7 8.9l60.3 60.2c12 12 11.9 25-.3 37.7-4.2 4.5-8.6 8.8-13.3 13.3-7 6.8-14.3 13.8-20.9 21.7-11.5 12.4-25.2 18.2-42.9 18.2-1.7 0-3.5-.1-5.2-.2-32.8-2.1-63.3-14.9-86.2-25.8-62.2-30.1-116.8-72.8-162.1-127-37.3-44.9-62.4-86.7-79-131.5-10.3-27.5-14.2-49.6-12.6-69.7z"
                  data-original="#000000">
                </path>
              </svg>
              +180-548-2588
            </button>
            <span className="border-l h-3 mx-6 max-sm:hidden"></span>
            <button type="button" className=" text-sm max-sm:my-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#fff" className="mr-3 inline-block"
                viewBox="0 0 479.058 479.058">
                <path
                  d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                  data-original="#000000"></path>
              </svg>
              info@example.com
            </button>

            <div className="sm:ml-auto max-sm:hidden ">
              {users ? <button onClick={handleLogout} className=" cursor-pointer text-sm mr-1">Log Out</button> : <div className='flex justify-center '>
                <Link to={'/login'} className=" text-sm mr-1">Log In</Link>
                /
                <Link to={'/register'} className=" text-sm ml-1">Sign Up</Link>
              </div>}



            </div>
          </section>

        </div>
        <div className='flex flex-wrap  max-w-[1300px] mx-auto items-center justify-between py-3 px-4 sm:px-10  lg:gap-y-4 gap-y-6 gap-x-4'>
          <Link to={'/'}>
            <img src={logo} alt="logo" className='sm:w-[140px] w-[80px] max-[640px]:w-[120px]' />
          </Link>

          <div id="collapseMenu"
            className="max-lg:hidden lg:!flex lg:items-center max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50">
            <button id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border'>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"></path>
              </svg>
            </button>

            <ul
              className='lg:!flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-[#151d20] max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
              <li className='mb-6 hidden max-lg:block'>
                <Link to={'/'}><img src={logo} alt="logo"
                  className='w-36' />
                </Link>
              </li>
              <li
                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute  ${path === '/' && 'lg:after:bg-cyan-500'} lg:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}>
                <Link to={'/'} className={` font-semibold block text-[15px]  ${path === '/' && 'text-blue-500'} `}>Home</Link>
              </li>
              <li
                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute  ${path === '/services' && 'lg:after:bg-cyan-500'} lg:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}>
                <Link to={'/services'} className={` font-semibold block text-[15px]  ${path === '/services' && 'text-blue-500'} `}>Services</Link>
              </li>
              {
                users && <li
                  className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute  ${path === '/dashboard' && 'lg:after:bg-cyan-500'} lg:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}>
                  <Link to={'/dashboard'} className={` font-semibold block text-[15px]  ${path === '/dashboard' && 'text-blue-500'} `}>Dashboard</Link>
                </li>
              }


            </ul>
          </div>

          <div className='flex items-center max-sm:ml-auto'>

            <ul className="flex space-x-4 max-sm:space-x-0 items-center">

              {/* profile icon */}
              {
                users && <li className="relative  duration-300 px-1 ">

                  <img onClick={profileHandle} className={`w-12 h-12 hover:border-2 hover:border-cyan-500 max-sm:w-10 max-sm:h-10 object-cover border cursor-pointer rounded-full ${profileDrop && 'border-2 border-cyan-500'}`} src={`${users?.profilePic ? users?.profilePic : avatar}`} alt="" />

                  {/* Dropdown menu */}
                  {profileDrop &&

                    <ul
                      ref={dropdownRef}
                    >
                      <div className="absolute right-0 max-[640px]:max-w-[200px]  duration-300  w-80 p-4 bg-white dark:bg-gray-900 border border-gray-400  rounded-md shadow-md "
                      >
                        <h6 className="font-semibold  text-[15px]">Welcome</h6>
                        <p className="text-sm  dark: mt-1">{users?.fullName}</p>

                        <hr className="border-b-0 my-4" />
                        <ul className="space-y-1.5">
                          <li onClick={profileHandle}><Link to={'/dashboard/my-orders'} className="text-sm  dark: hover:text-cyan-500">Order</Link></li>
                          <li onClick={profileHandle}><Link to={'/dashboard/wishlist'} className="text-sm  dark: hover:text-cyan-500">Wishlist</Link></li>
                        </ul>
                        <hr className="border-b-0 my-4" />
                        <ul className="space-y-1.5">

                          <li onClick={profileHandle}><Link to={'/contact-us'} className="text-sm  dark: hover:text-cyan-500">Contact Us</Link></li>
                          <li onClick={profileHandle}><Link to={'/update-profile'} className="text-sm  dark: hover:text-cyan-500">Update Profile</Link></li>
                        </ul>
                      </div>
                    </ul>

                  }
                </li>
              }



              {/* Toggle button */}
              <li
                className="relative max-sm:ms-2  lg:hover:after:absolute lg:after:bg-white lg:after:w-0 lg:hover:after:w-full  lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300 border rounded-full">
                <ThemeToggle />
              </li>
            </ul>
            <button onClick={toggleMenu} className='lg:hidden cursor-pointer ml-6'>
              <FiMenu className='w-7 h-7' />
            </button>


            <div
              className={`fixed min-lg:hidden   top-0  left-0 z-50  max-md:w-[70%] min-md:w-[40%]  h-screen bg-white dark:bg-gray-900  shadow-lg transform transition-transform  duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
              <div>
                <img src={logo} alt=" " className='w-[350px]' />
              </div>
              <div onClick={toggleMenu} className='absolute cursor-pointer top-2 right-2'>
                <IoCloseSharp className='w-8 h-8 ' />
              </div>
              <div className='px-4 mt-7'>
                <ul className="space-y-2 ">
                  <li onClick={toggleMenu}><Link to={'/'} className="text-xl dark:hover:text-cyan-500">Home</Link></li>
                  < li onClick={toggleMenu}><Link to={'/services'} className="text-xl dark:hover:text-cyan-500">Services</Link></li>
                  {
                    users ? <li><Link to={'/dashboard'} className="text-xl  dark:hover:text-cyan-500">
                      <div onClick={() => setMenuDrop(!menuDrop)} className='flex justify-between'>
                        <span>Dashboard</span>
                        <span><RiArrowDropRightLine className={`me-6 w-8 h-8 ${menuDrop && 'rotate-90'}`} /></span>
                      </div>

                    </Link>
                      {menuDrop && <ul className='border-s mt-auto ps-4'>
                        <li onClick={toggleMenu}><Link to={'/dashboard/add-service'} className="text-sm  dark: hover:text-cyan-500">Add A Service</Link></li>
                        <li onClick={toggleMenu}><Link to={'/dashboard/my-booking-services'} className="text-sm  dark: hover:text-cyan-500">My Booking Services</Link></li>

                        <li onClick={toggleMenu}><Link to={'/dashboard/wishlist'} className="text-sm  dark: hover:text-cyan-500">Wishlist</Link></li>
                        <li onClick={(profileHandle, toggleMenu)}><Link to={'/update-profile'} className="text-sm  dark: hover:text-cyan-500">Update Profile</Link></li>
                      </ul>}
                      <button
                        onClick={(handleLogout)}
                        className="p-16-semibold flex size-full gap-4 p-4 ps-0 group font-semibold rounded-full bg-cover  transition-all ease-linear"
                      >
                        <IoIosLogOut className='w-7 h-7' />
                        Logout
                      </button>

                    </li> : <Link to={'/login'}
                      onClick={toggleMenu}
                      className="p-16-semibold flex size-full gap-4 p-4 ps-0 group font-semibold rounded-full bg-cover  transition-all ease-linear"
                    >
                      <TbLogin2 className='w-7 h-7' />
                      Log In
                    </Link>

                  }
                </ul>
              </div>
            </div>
            {isOpen && <div onClick={toggleMenu} className={`fixed min-lg:hidden   top-0  left-0 z-40  w-full  h-screen bg-[#00000041]  shadow-lg transform transition-transform   `}>

            </div>}

          </div>
        </div>

      </header>
    </>
  )
}

export default Navbar