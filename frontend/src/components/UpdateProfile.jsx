import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import UploadImage from "./uploadImage"; // Assuming UploadImage is a component to upload image
import { MdAddAPhoto } from "react-icons/md";
import { axiosInstance } from "../lib/axiosInstanace";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addUser } from '../features/users/userSlice'


const UpdateProfile = () => {
  const { users } = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cover, setCover] = useState(users?.profilePic ? users?.profilePic : null);
  const [progress, setProgress] = useState(0)



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value
    // update profile
    const updatedUser = {
      profilePic: cover,
      fullName: fullName
    };

    const res = await axiosInstance.put('/auth/update-profile', updatedUser);


    if (res.status === 200) {
      toast.success('Your profile has been updated')
      dispatch(addUser(res.data))
      navigate('/')
    }
  };

  return (

    <section className="py-10  bg-white dark:bg-gray-900  z-50 w-full h-full">
      <div className="flex gap-4 z-50">
        <div className="w-[88%] max-w-[800px] mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div className="text-center">
            <h1 className="text-3xl max-[640px]:text-xl font-serif font-extrabold mb-2 dark:text-white">
              Add Profile Image
            </h1>
            <h2 className="text-gray-500 text-sm mb-4 dark:text-gray-400">
              Update your profile picture
            </h2>
          </div>
          <div className="relative">

            <div className="absolute sm:left-[420px] bottom-[230px]  max-[640px]:left-14 min-[375px]:left-16 max-[768px]:left-0  bg-gray-400 w-9 h-9 flex justify-center items-center rounded-full z-30">
              <UploadImage setData={setCover} setCoverProgress={setProgress}>

                <MdAddAPhoto className="w-6 h-6" />
              </UploadImage>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Profile Image */}
              <div className="w-full flex justify-center mb-4 ">
                <div className="relative w-[141px] h-[141px] rounded-full overflow-hidden border ">
                  {!cover ? <img
                    src={users?.profilePic || cover} // Default avatar if no profile image exists
                    alt="Profile"
                    className="w-full h-full object-cover"
                  /> : <img
                    src={cover} // Default avatar if no profile image exists
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />}


                </div>
              </div>

              {progress > 0 && <div className='flex w-[200px] mx-auto items-center gap-2'>
                <div className="w-full transition-all bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 transition-all h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm  text-gray-600">{progress}%</p>
              </div>}

              {/* User Details */}
              <div className="mb-4">
                <label className="dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  defaultValue={users?.fullName}
                  className="w-full p-2 border rounded dark:bg-gray-800"
                />
              </div>
              <div className="mb-4">
                <label className="dark:text-gray-300">Email</label>
                <input
                  type="email"
                  disabled
                  defaultValue={users?.email}
                  className="w-full p-2 border rounded dark:bg-gray-800"
                />
              </div>

              <div className="flex justify-center">
                {/* Submit Button */}
                <button
                  type="submit"
                  className=" cursor-pointer py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
