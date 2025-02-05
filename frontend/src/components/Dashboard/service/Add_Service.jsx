import { useState } from "react"
import UploadImage from "../../uploadImage"
import { axiosInstance } from "../../../lib/axiosInstanace"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getServices } from "../../../features/services/serviceSlice"


const Add_Service = () => {
  const navigate = useNavigate()
  const [cover, setCover] = useState(null)
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0)


  const { users } = useSelector(store => store.user)


  const submitHandle = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target);
    const service = Object.fromEntries(formData)

    if (!cover) {
      toast.error('Please upload a cover image')
      return
    }

    if (!service.name || !service.description || !service.price || !service.category) {
      toast.error('Please Fill all fields')
      return
    }

    const newData = {
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category,
      image: cover,
      user: { user_id: users?._id, email: users?.email },
    }

    const response = await axiosInstance.post('/service/add', newData)
      .then(res => {
        if (res.status === 201) {
          navigate('/dashboard/my-services')
          toast.success('service added successfully')
          dispatch(getServices())
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
      <div className="max-w-4xl relative mx-auto  rounded-lg shadow-md">
        <form onSubmit={submitHandle}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 pt-4 px-2">
            <h1 className="text-xl font-semibold mb-4 md:mb-0">Add New Product</h1>
            <div className="flex space-x-4">

              <button type="submit" className="px-4 cursor-pointer hover:scale-110 py-2 bg-green-500  rounded-lg">Add Product</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className=" p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">General Information</h2>
              <div className="mb-4">
                <label className="block  mb-2">Service Name</label>
                <input type="text" name="name" placeholder="Puffer Jacket With Pocket Detail" className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block  mb-2">Service Description</label>
                <textarea name="description" placeholder="Write your porduct description" className="w-full p-2 border border-gray-300 rounded-lg" rows="4" >

                </textarea>
              </div>
              <div className="mb-4">
                <label className="block  mb-2">Price</label>
                <input type="number" name="price" placeholder="100.00" className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block  mb-2">Category</label>
                <select
                  className="w-full p-2 border rounded-lg "
                  name="category"
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
                <img src={cover ? cover : "https://placehold.co/300x300"} alt="Puffer jacket" className="w-full h-64 object-cover rounded-lg" />
              </div>

            </div>
          </div>
        </form>

        <div className="absolute bottom-13 right-28">
          {progress > 0 && <div className='flex w-[200px] mx-auto items-center gap-2'>
            <div className="w-full transition-all bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 transition-all h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm  text-gray-600">{progress}%</p>
          </div>}
          <UploadImage setData={setCover} setCoverProgress={setProgress}>
            <div
              className="flex bg-gray-800 mt-7 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
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

export default Add_Service