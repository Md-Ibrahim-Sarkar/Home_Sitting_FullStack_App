import { useContext, useState } from "react"
import UploadImage from "../../uploadImage"
import { axiosInstance } from "../../../lib/axiosInstanace"
import { useDispatch, useSelector } from "react-redux"
import { IoIosCloseCircle } from "react-icons/io";
import { IndexContext } from "../../../context";
import { toast } from "react-toastify";
import { getServices } from "../../../features/services/serviceSlice";

const Edit_Service = () => {
  const { setIsEditOpen, isEditId } = useContext(IndexContext)
  const dispatch = useDispatch()
  const [cover, setCover] = useState(null)
  const { services } = useSelector(store => store.services)

  const currentService = services?.find(service => service._id === isEditId)


  const submitHandle = async (e, id) => {
    e.preventDefault()

    const formData = new FormData(e.target);
    const service = Object.fromEntries(formData)

    const newData = {
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category,
      image: cover || service.image,
    }



    const res = await axiosInstance.put(`/service/update-service/${id}`, newData)
      .then(res => {
        if (res.status === 200) {
          setIsEditOpen(false)
          dispatch(getServices())
          toast.success('Service updated successfully')
        }
      })

  }

  const categories = [
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Painting",
    "Pest Control",
    "Appliance Repair",
    "Gardening",
    "Home Security",
    "Moving & Packing",
  ];


  return (
    <>
      <div className=" relative mx-auto bg-white  dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <IoIosCloseCircle onClick={() => setIsEditOpen(false)} className="absolute -right-1 -top-1 w-7 h-7" />

        <form onSubmit={(e) => submitHandle(e, currentService._id)}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-xl font-semibold mb-4 md:mb-0">Update This Product</h1>
            <div className="flex space-x-4">

              <button type="submit" className="px-4 cursor-pointer hover:scale-110 py-2 bg-green-500  rounded-lg">Update Product</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className=" p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">General Information</h2>
              <div className="mb-4">
                <label className="block  mb-2">Service Name</label>
                <input defaultValue={currentService.name} type="text" name="name" placeholder="Puffer Jacket With Pocket Detail" className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block  mb-2">Service Description</label>
                <textarea defaultValue={currentService.description} name="description" placeholder="Write your porduct description" className="w-full p-2 border border-gray-300 rounded-lg" rows="4" >

                </textarea>
              </div>
              <div className="mb-4">
                <label className="block  mb-2">Price</label>
                <input defaultValue={currentService.price} type="number" name="price" placeholder="100.00" className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block  mb-2">Category</label>
                <select
                  className="w-full p-2 border rounded-lg "
                  name="category"
                  defaultValue={currentService.category}
                >
                  <option className="dark:bg-gray-900" value="">Choose a service...</option>
                  {categories?.map((category, index) => (
                    <option className="dark:bg-gray-900" key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <div className=" p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Upload Img</h2>
              <div className="mb-4">
                <img src={cover ? cover : currentService.image} alt="Puffer jacket" className="w-full h-64 object-cover rounded-lg" />
              </div>

            </div>
          </div>
        </form>

        <div className="absolute bottom-13 right-28">
          <UploadImage setData={setCover}>
            <div
              className="flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000" />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000" />
              </svg>
              Add Photo
            </div>
          </UploadImage>
        </div>

      </div>
    </>
  )
}

export default Edit_Service