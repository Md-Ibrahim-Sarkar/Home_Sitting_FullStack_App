import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../../../lib/axiosInstanace";
import { toast } from "react-toastify";
import { getServices } from "../../../features/services/serviceSlice";
import Edit_Service from "./Edit_Service";
import { useContext, useEffect } from "react";
import { IndexContext } from "../../../context";
import SeeDetails from "./SeeDetails";
import Swal from 'sweetalert2'


const My_Services = () => {
  const { isEditOpen, setIsEditOpen, setIsEditId, isViewOpen, setIsViewOpen, setIsViewId } = useContext(IndexContext)
  const { services } = useSelector(store => store.services)
  const { users } = useSelector(store => store.user)
  const dispatch = useDispatch()

  const filteredServices = services?.filter(service =>
    service.user?.email === users.email
  );

  const deleteHandle = async (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {



      if (result.isConfirmed) {
        const res = await axiosInstance.delete(`/service/${id}`)
        dispatch(getServices());
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }

    });

  }

  const editHandle = (id) => {
    setIsEditId(id)
    setIsEditOpen(true)
  }

  const viewHandle = (id) => {
    setIsViewId(id)
    setIsViewOpen(true)
  }


  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])


  return (
    <>
      <div className="font-sans p-4 mx-auto lg:max-w-7xl md:max-w-4xl max-w-xl min-h-[750px]">
        <h2 className="text-2xl sm:text-3xl font-bold  text-center mb-2 sm:mb-3">My Services</h2>
        {filteredServices?.length > 0 ?
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredServices?.map(service => <div key={service._id} className="bg-gray-100 p-2 overflow-hidden cursor-pointer">
              <div className="bg-white flex flex-col h-full">
                <div className="w-full">
                  <img src={service.image} alt="food1"
                    className="aspect-[139/90] w-full object-cover" />
                </div>

                <div className="p-4 text-center flex-1">
                  <h4 className="text-sm sm:text-base font-bold text-gray-800">{service.name}</h4>
                  <button onClick={() => viewHandle(service._id)} className="bg-cyan-500 font-semibold rounded hover:bg-cyan-700 text-white text-sm px-2 py-2  mt-1.5 cursor-pointer">View Detail</button>
                </div>
                <div className="flex gap-1.5 items-center justify-around">
                  <button onClick={() => deleteHandle(service._id)} type="button" className="bg-rose-500 font-semibold rounded hover:bg-gray-800 text-white text-sm px-2 py-2 cursor-pointer w-full">Delete</button>
                  <button onClick={() => editHandle(service._id)} type="button" className="bg-gray-700 font-semibold rounded hover:bg-gray-800 text-white text-sm px-2 py-2 cursor-pointer  w-full">Edit</button>
                </div>
              </div>

            </div>)}

          </div> : <p className="text-center mt-10">No Data Found!</p>}
        {
          isEditOpen && <div onClick={() => setIsEditOpen(false)} className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full  h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div onClick={(e) => (e.stopPropagation())}>
              <Edit_Service />

            </div>
          </div>
        }
        {
          isViewOpen && <SeeDetails />
        }
      </div>
    </>
  )
}

export default My_Services