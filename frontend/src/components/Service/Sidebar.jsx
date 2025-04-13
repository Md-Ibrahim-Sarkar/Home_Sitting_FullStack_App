import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getServices } from "../../features/services/serviceSlice";
import { Link, useLocation } from "react-router-dom";
import { IndexContext } from "../../context";
import { UseSearchValue } from "../../hooks/useSearchValue";


const Sidebar = () => {
  const { setSearchValue, isSidebarOpen, setIsSidebarOpen } = useContext(IndexContext)
  const dispatch = useDispatch()
  const location = useLocation()
  const searchvalue = UseSearchValue()

  const pathname = decodeURIComponent(location.pathname).replace('/', '')


  const { services } = useSelector(store => store.services)

  const uniqueCategories = [...new Set(services?.map(item => item.category))];

  const toggleDropdown = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(getServices(searchvalue))
  }, [dispatch, searchvalue])




  return (
    <>
      <nav className=" min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto">
        <ul>
          <li onClick={toggleDropdown}>
            <Link to={'/services'}
              className={` hover:text-blue-600 text-[15px] block hover:bg-blue-50 dark:hover:text-black rounded px-4 py-2.5 transition-all ${pathname === 'services' && 'bg-blue-50 dark:text-black'}`}>
              All Services
            </Link>
          </li>
        </ul>

        <div className={`relative border border-gray-500 px-4 py-3 rounded-md my-8`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 mr-3 inline fill-gray-300" viewBox="0 0 118.783 118.783">
            <path
              d="M115.97 101.597 88.661 74.286a47.75 47.75 0 0 0 7.333-25.488c0-26.509-21.49-47.996-47.998-47.996S0 22.289 0 48.798c0 26.51 21.487 47.995 47.996 47.995a47.776 47.776 0 0 0 27.414-8.605l26.984 26.986a9.574 9.574 0 0 0 6.788 2.806 9.58 9.58 0 0 0 6.791-2.806 9.602 9.602 0 0 0-.003-13.577zM47.996 81.243c-17.917 0-32.443-14.525-32.443-32.443s14.526-32.444 32.443-32.444c17.918 0 32.443 14.526 32.443 32.444S65.914 81.243 47.996 81.243z"
              data-original="#000000" />
          </svg>
          <input onChange={(e) => setSearchValue(e.target.value)} className="text-sm  outline-none bg-transparent px-1 max-w-[130px]" placeholder="Search..." />
        </div>

        <div className="mt-4">
          <h6 className="text-blue-600 text-sm font-bold px-4">Categories</h6>
          <ul className="mt-2">

            {uniqueCategories ? uniqueCategories.map((category, index) => <li key={index}>
              <Link onClick={toggleDropdown} to={`/services/${category}`}
                className={` hover:text-blue-600 my-0.5 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all ${pathname === `services/${category}` && 'bg-blue-50 dark:text-black'}`}>
                {category}
              </Link>
            </li>) : <div> </div>}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Sidebar