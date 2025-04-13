
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const All_Services = () => {

  const { services } = useSelector(store => store.services)
  const [activeUser, setActiveUser] = useState(false)

  const { users } = useSelector(store => store.user)

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services?.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(services?.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!users) {
      e.preventDefault();
      Swal.fire({
        title: "Oops! You’re Not Logged In",
        showCancelButton: true,
        confirmButtonText: "Log In",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };


  return (
    <>

      <div className='   sm:p-10 md:p-3'>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentItems?.map(service =>
            <div key={service._id} className='service-card'>
              <div className="rounded overflow-hidden shadow-lg flex flex-col">
                <a href="#"></a>
                <Link to={`/services/details/${service._id}`} className="relative group">
                  <a href="#">
                    <img
                      className="w-full h-[200px] object-cover"
                      src={service.image}
                      alt="Sunset in the mountains"
                    />
                    <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                  </a>
                  <a href="#!">
                    <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 transition duration-500 ease-in-out">
                      {service.category}
                    </div>
                  </a>
                  {/* View Details টেক্সট */}
                  <div className="absolute inset-0 flex items-center cursor-pointer justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="bg-white text-gray-900 px-4 py-2 rounded-md shadow-md">View Details</span>
                  </div>
                </Link>

                <div className="px-6 py-4 mb-auto">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out  mb-2">{(service.name.slice(0, 22))} ...</span>
                    <span>${service.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {service.description}
                  </p>
                </div>
                <Link to={`/services/details/${service._id}`}
                  onClick={handleClick} className="px-6 py-3 mx-auto w-full border rounded justify-center flex flex-row items-center cursor-pointer hover:bg-cyan-500 hover:font-semibold ">
                  See The Details
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className=" mt-2.5  container flex justify-center mx-auto">
          <div className="flex flex-row mx-auto mt-6">
            <button onClick={prevPage} disabled={currentPage === 1} type="button" className="bg-gray-800 cursor-pointer text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3">
              <div className="flex flex-row align-middle">
                <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                </svg>
                <p className="ml-2">Prev</p>
              </div>
            </button>
            <span className="flex items-center mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages} type="button" className="bg-gray-800 cursor-pointer text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3">
              <div className="flex flex-row align-middle">
                <span className="mr-2">Next</span>
                <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div >
    </>
  )
}

export default All_Services