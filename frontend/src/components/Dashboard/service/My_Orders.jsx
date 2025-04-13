import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getBookingServices } from "../../../features/bookingServices/bookingSlice";
import { axiosInstance } from "../../../lib/axiosInstanace";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";


const My_Orders = () => {
  const dispatch = useDispatch()
  const { bookingServices } = useSelector(store => store.bookingServices);
  const { users } = useSelector(store => store.user);

  const findOrderedServices = bookingServices?.filter(service => service.serviceOwnerEmail === users?.email && service.status !== 'cancel' && service.status !== 'Completed')
  const findCancelOrders = bookingServices?.filter(service => service.serviceOwnerEmail === users?.email && service.status === 'cancel')
  const findCompletedOrders = bookingServices?.filter(service => service.serviceOwnerEmail === users?.email && service.status === 'Completed')

  console.log(findOrderedServices);
  console.log(users);


  useEffect(() => {
    dispatch(getBookingServices())
  }, [dispatch])



  const cancelOrderHandle = (id) => {
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
          const res = await axiosInstance.put(`/booking/update/${id}`, { status: 'cancel' });
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
  };



  const approveHandle = (id) => {
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
          const res = await axiosInstance.put(`/booking/update/${id}`, { status: 'Working' });

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

  const completeHandle = (id) => {
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
          const res = await axiosInstance.put(`/booking/update/${id}`, { status: 'Completed' });

          if (res.status === 200) {
            dispatch(getBookingServices())
            Swal.fire({
              title: "Completed Your Service!",
              text: "Your service has been Completed.",
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
          const res = await axiosInstance.delete(`/booking/delete/${id}`);
          console.log(res);

          if (res.status === 200) {
            // Dispatch action to refresh the list after deletion
            dispatch(getBookingServices());
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
  };




  useEffect(() => {
    dispatch(getBookingServices())
  }, [dispatch])



  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center justify-center">
              <h2 className="text-xl text-center font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>


            </div>

            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {findOrderedServices?.length > 0 ?
                  findOrderedServices?.map(service =>
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
                        <dd className="me-2 mt-1.5 inline-flex capitalize items-center rounded bg-primary-100 py-0.5 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">

                          {service.status}
                        </dd>
                      </dl>

                      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                        <button disabled={service.status === 'Working'} onClick={() => cancelOrderHandle(service._id)} type="button" className={`w-full  rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto 
                           ${service.status === 'Working' ? 'cursor-not-allowed' : 'cursor-pointer'}
                          `}>Cancel order</button>
                        <button
                          onClick={() => {
                            if (service.status === 'pending') {
                              approveHandle(service._id);
                            } else if (service.status === 'Working') {
                              completeHandle(service._id);
                            }
                          }}
                          className="w-full inline-flex cursor-pointer justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                        >
                          {service.status === 'pending' && 'Approve Order'}
                          {service.status === 'Working' && 'Complete Order'}
                        </button>

                      </div>
                    </div>) : <p className="text-center"> our order list is empty. </p>}
              </div>
            </div>


          </div>
        </div>
        {findCancelOrders?.length > 0 &&

          <div >
            <hr className="my-5" />
            <h2 className="text-center text-2xl">Cancel Orders</h2>

            <div className="mt-10">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">

                {findCancelOrders?.map(service =>
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
                      <dd className="me-2 mt-1.5 inline-flex text-red-500 capitalize items-center rounded bg-primary-100 py-0.5 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">

                        {service.status}
                      </dd>
                    </dl>

                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                      <button disabled type="button" className="w-full  rounded-lg border cursor-not-allowed border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Canceled</button>
                      <button onClick={() => deleteHandle(service._id)} className="w-full inline-flex cursor-pointer justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">
                        Delete
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>


        }

        {findCompletedOrders?.length > 0 &&
          <div >
            <hr className="my-5" />
            <h2 className="text-center  text-2xl">Completed Orders</h2>

            <div className="mt-10">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">

                {findCompletedOrders?.map(service =>
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
                      <dd className="me-2 mt-1.5 inline-flex text-red-500 capitalize items-center rounded bg-primary-100 py-0.5 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">

                        {service.status}
                      </dd>
                    </dl>

                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                      {service.status === 'Completed' && (
                        <span className="completed-status me-auto">Completed on: <br /> {new Date(service.updatedAt).toISOString().split("T")[0]}</span>
                      )}
                      <button onClick={() => deleteHandle(service._id)} className="w-full inline-flex cursor-pointer justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">
                        Delete
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        }
      </section>
    </>
  )
}

export default My_Orders