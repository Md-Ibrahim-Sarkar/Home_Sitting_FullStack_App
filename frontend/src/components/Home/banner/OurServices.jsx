import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getServices } from "../../../features/services/serviceSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const OurServices = () => {
  const dispatch = useDispatch()

  const { services } = useSelector(store => store.services)
  const { users } = useSelector(store => store.user)


  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])


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
      <div className="font-sans py-4 mx-auto lg:max-w-6xl md:max-w-4xl max-w-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold  inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-cyan-400 after:rounded-full">Popular Services</h2>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-4 px-1">

          {services ? services?.slice(0, 8).map(service => <Link to={`/services/details/${service._id}`} onClick={handleClick} key={service._id} className=" rounded-lg group overflow-hidden cursor-pointer relative z-20 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all ">
            <div className="w-full h-[170px]  overflow-hidden mx-auto">
              <img src={service.image} alt="product1"
                className="h-full w-full object-cover" />
            </div>

            <div className="absolute mx-auto left-0 right-0 bottom-2 lg:-bottom-80 lg:group-hover:bottom-2 bg-black/60 lg:bg-white w-11/12 p-2 lg:p-3 rounded-lg transition-all duration-300">
              <div className="text-center">
                <h3 className="text-sm lg:text-base font-bold text-white lg:text-gray-800">White Sun Glass</h3>
                <h4 className="text-sm lg:text-base text-blue-600 font-bold mt-2">${service.price}</h4>
              </div>

              <div className="flex justify-center space-x-1 mt-4 max-sm:hidden">
                <svg className="w-[14px] h-[14px] fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-[14px] h-[14px] fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-[14px] h-[14px] fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-[14px] h-[14px] fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-[14px] h-[14px] fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              </div>
            </div>
          </Link>) : <div><h1 className="text-4xl">Loading....</h1></div>}


        </div>
      </div>
    </>
  )
}

export default OurServices