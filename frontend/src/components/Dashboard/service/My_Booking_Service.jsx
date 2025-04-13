import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBookingServices } from "../../../features/bookingServices/bookingSlice"
import Swal from "sweetalert2"
import { axiosInstance } from "../../../lib/axiosInstanace"


const My_Booking_Service = () => {
  const { users } = useSelector(store => store.user)
  const dispatch = useDispatch()
  const { bookingServices } = useSelector(store => store.bookingServices)

  const filteredMyBookings = bookingServices?.filter(service => service.user === users?._id && service.status !== 'cancel')

  const cancelHandle = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel order!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosInstance.delete(`/booking/delete/${id}`);
          if (res.status === 200) {
            dispatch(getBookingServices())
            Swal.fire({
              title: "Canceled Your Order!",
              text: "Your file has been Candeled.",
              icon: "success"
            });
          } else {
            console.log("Failed to cancel order:", res);
          }
        }
      });
    } catch (error) {
      console.error("Error canceling order:", error.response?.data || error.message);
    }
  }


  const deleteService = (id) => {
    try {

      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add to order!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosInstance.delete(`/booking/delete/${id}`);
          console.log(res);

          if (res.status === 200) {
            dispatch(getBookingServices())
            Swal.fire({
              title: "Reordered Your Service!",
              text: "Your service has been re-ordered.",
              icon: "success"
            });
          } else {
            console.log("Failed to cancel order:", res);
          }
        }
      });

    } catch (error) {
      console.error("Error reordering service:", error.response?.data || error.message);
    }
  }



  useEffect(() => {
    dispatch(getBookingServices())
  }, [dispatch])


  return (
    <>

      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Your Booked Services</h2>
            </div>

            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredMyBookings?.length > 0 ? filteredMyBookings?.map(service =>

                  <div key={service._id} className="flex flex-wrap items-center gap-y-4 py-6">
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        <a href="#" className="hover:underline">#{(service._id.slice(0, 10))}...</a>
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{new Date(service.createdAt).toISOString().split("T")[0]}</dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">${service.serviceData.price}</dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                      <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100  py-0.5 text-sm capitalize font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                        {service.status}
                      </dd>
                    </dl>

                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                      <button onClick={() => cancelHandle(service._id)} type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Cancel order</button>
                      <a href="#" className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</a>
                    </div>
                  </div>
                ) : <p className="text-center">No Data found!</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default My_Booking_Service