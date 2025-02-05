import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import logo from '../../assets/images/logo.png'
import { FaHeart } from "react-icons/fa";

const Sidebar = () => {

  const path = useLocation()
  const { users } = useSelector(store => store.user)

  const pathName = path.pathname



  return (
    <>
      <nav className=" min-w-[260px] max-[1074px]:hidden py-6 px-4 font-[sans-serif] flex flex-col overflow-auto">

        <div className="flex flex-wrap flex-col justify-center items-center cursor-pointer">
          <p className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center font-bold text-black text-xl">
            <img src={users?.profilePic} alt="" />
          </p>

          <div className="text-center mt-2">
            <p className="text-base ">{users?.fullName}</p>
            <p className="text-xs  mt-0.5">{users?.email}</p>
          </div>
        </div>

        <hr className="my-6 border-gray-400" />

        <ul className="space-y-3 flex-1">
          <li>
            <Link to={'/dashboard'}
              className={`text-sm flex items-center hover:bg-[#d9f3ea] hover:text-black rounded px-4 py-3 transition-all
              ${pathName === '/dashboard' && 'bg-[#d9f3ea] text-green-700'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
                viewBox="0 0 512 512">
                <path
                  d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                  data-original="#000000" />
              </svg>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={'/dashboard/my-services'}
              className={`text-sm flex items-center hover:bg-[#d9f3ea] hover:text-black rounded px-4 py-3 transition-all
              ${pathName === '/dashboard/my-services' && 'bg-[#d9f3ea] text-green-700'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
                viewBox="0 0 512 512">
                <path
                  d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                  data-original="#000000" />
              </svg>
              <span>Mamage Services</span>
            </Link>
          </li>
          <li>
            <Link to={'/dashboard/my-orders'}
              className={`text-sm flex items-center hover:bg-[#d9f3ea] hover:text-black  rounded px-4 py-3 transition-all
              ${pathName === '/dashboard/my-orders' && 'bg-[#d9f3ea] text-green-700'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.23 8.77h1.54V7.23h-1.54zm0 4h1.54v-1.54h-1.54zm0 4h1.54v-1.54h-1.54zM2 20v-8.5l6-4.27l6 4.27V20H9.846v-5.077H6.154V20zm14 0v-9.5l-5.615-4.03V4H22v16z" /></svg>
              <span>My Orders</span>
            </Link>
          </li>
          <li>
            <Link to={'/dashboard/add-service'}
              className={`text-sm flex items-center hover:bg-[#d9f3ea] hover:text-black rounded px-4 py-3 transition-all
              ${pathName === '/dashboard/add-service' && 'bg-[#d9f3ea] text-green-700'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4" viewBox="0 0 24 24">
                <path
                  d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z"
                  data-original="#000000" />
                <path d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z" data-original="#000000" />
                <path d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z" data-original="#000000" />
              </svg>
              <span>Add A Service</span>
            </Link>
          </li>


          {users.role === 'admin' && <li>
            <Link to={'/dashboard/users-list'}
              className={`text-sm flex items-center hover:bg-[#d9f3ea] hover:text-black  rounded px-4 py-3 transition-all
              ${pathName === '/dashboard/users-list' && 'bg-[#d9f3ea] text-green-700'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
                viewBox="0 0 510 510">
                <g fillOpacity=".9">
                  <path
                    d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm0 459c-112.2 0-204-91.8-204-204S142.8 51 255 51s204 91.8 204 204-91.8 204-204 204z"
                    data-original="#000000" />
                  <path d="M267.75 127.5H229.5v153l132.6 81.6 20.4-33.15-114.75-68.85z" data-original="#000000" />
                </g>
              </svg>
              <span>Users List</span>
            </Link>
          </li>}


          <li>
            <Link to={'/dashboard/my-booking-services'}
              className={`text-sm flex items-center hover:bg-[#d9f3ea] hover:text-black  rounded px-4 py-3 transition-all
              ${pathName === '/dashboard/my-booking-services' && 'bg-[#d9f3ea] text-green-700'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.23 8.77h1.54V7.23h-1.54zm0 4h1.54v-1.54h-1.54zm0 4h1.54v-1.54h-1.54zM2 20v-8.5l6-4.27l6 4.27V20H9.846v-5.077H6.154V20zm14 0v-9.5l-5.615-4.03V4H22v16z" /></svg>
              <span>My Booking Services</span>
            </Link>
          </li>

          <li>
            <Link to={'/dashboard/wishlist'}
              className={`text-sm flex items-center hover:bg-[#d9f3ea] hover:text-black rounded px-4 py-3 transition-all
              ${pathName === '/dashboard/wishlist' && 'bg-[#d9f3ea] text-green-700'} `}>
              <FaHeart className="w-[18px] h-[18px] mr-4" />
              <span>Wishlist</span>
            </Link>
          </li>

        </ul>

        <div className="min-h-[180px] max-w-[228px] p-4 flex flex-col bg-[#d9f3ea] rounded-3xl mt-4">


          <div className="mt-2">
            <p className="text-sm text-gray-600 text-center font-semibold">Welcome, {users.fullName}</p>
            <img className="mt-3" src={logo} alt="" />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Sidebar