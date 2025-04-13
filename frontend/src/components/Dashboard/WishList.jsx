import { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../features/favorites/favoriteSlice";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../lib/axiosInstanace";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getServices } from "../../features/services/serviceSlice";

const WishList = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((store) => store.favorites);
  const { services } = useSelector((store) => store.services);
  const { users } = useSelector((store) => store.user);

  const userFavorites = favorites?.filter((fav) => fav.userId === users?._id);

  const filterServices = services?.filter((service) =>
    userFavorites?.some((fav) => fav.serviceId === service._id)
  );



  const deleteHandle = (id) => {
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
        try {
          const res = await axiosInstance.delete(`/favorite/delete/${id}`);
          console.log(res);
          if (res.status === 200) {
            // Dispatch action to refresh the list after deletion
            dispatch(getFavorites());
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          } else {
            toast.error("Failed to delete service");
          }
        } catch (error) {
          console.error("Error deleting service:", error);
          toast.error("An error occurred while deleting the service");
        }
      }
    });
  }
  useEffect(() => {
    dispatch(getFavorites())
    dispatch(getServices())
  }, [dispatch])

  return (
    <>
      <div className="">
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-2 lg:px-2">
          <h1 className="text-3xl font-bold">Your Wishlist Items</h1>
          <p className="mt-2">There are {filterServices?.length > 0 ? filterServices?.length : 0} products in this list</p>

          {filterServices?.length > 0 ? (
            <div className="mt-6 shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium">Product</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Price</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Stock Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Action</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {filterServices?.map(service => (
                    <tr key={service._id} className="border-t">
                      <td className="py-4 px-4 flex items-center">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-12 h-12 mr-4"
                        />
                        <div>
                          <p className="font-semibold">{service.name}</p>
                          <p className="text-sm">{service.description || "No description available"}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold">${service.price}</td>
                      <td className="py-4 px-4">
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          In Stock
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Link
                          to={`/services/details/${service._id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          See Details
                        </Link>
                      </td>
                      <td className="py-4 px-4">
                        <MdDeleteForever
                          onClick={() => deleteHandle(service._id)}
                          className="w-7 h-7 cursor-pointer text-red-600"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="py-10 text-center text-lg font-semibold">No Data Found!</p>
          )}
        </div>
      </div>
    </>
  )
}

export default WishList