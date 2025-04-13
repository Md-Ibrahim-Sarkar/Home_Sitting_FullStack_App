import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useParams } from "react-router-dom"
import { getServices } from "../../features/services/serviceSlice"


const CategoryByServices = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { services } = useSelector(store => store.services)

  const filteredServices = services?.filter(service => service.category === params.category)


  useEffect(() => {
    dispatch(getServices)
  }, [dispatch])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredServices && filteredServices?.map(service => (
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
                <a href="#"
                  className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out  mb-2">{service.name}</a>
                <p className="text-gray-500 text-sm">
                  {service.description}
                </p>
              </div>
              <button className="px-6 py-3 mx-auto w-full justify-center flex flex-row items-center cursor-pointer hover:bg-cyan-500 hover:font-semibold border">
                See The Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CategoryByServices