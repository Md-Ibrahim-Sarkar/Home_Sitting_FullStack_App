import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { IndexContext } from "../../context";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../features/services/serviceSlice";
import { axiosInstance } from "../../lib/axiosInstanace";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const BookingService = () => {
  const dispatch = useDispatch()
  const { setIsBookingPageOpen, isBookingId } = useContext(IndexContext)
  const { services } = useSelector(store => store.services)
  const { users } = useSelector(store => store.user)
  const findCurrentService = services?.find(service => service._id === isBookingId)
  const navigate = useNavigate()
  console.log(findCurrentService);

  const submitHandle = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const formData = Object.fromEntries(form)
    const { name, email, area, city, state, needs, zipCode } = formData

    const address = {
      area: area,
      city: city,
      state: state,
      zipCode: zipCode
    }

    const serviceData = {
      name: findCurrentService?.name,
      price: findCurrentService?.price,
      image: findCurrentService?.image,
      description: findCurrentService?.description,
    }

    console.log(serviceData);



    const bookingData = {
      user: users?._id,
      serviceId: isBookingId,
      date: new Date(),
      status: 'pending',
      serviceOwnerEmail: findCurrentService.user.email,
      needs: needs,
      serviceData: serviceData,
      AddressDetails: address,
      competedAt: ''

    }

    const res = await axiosInstance.post('/booking/add', bookingData)

    if (res.status === 201) {
      navigate('/dashboard/my-booking-services')
      setIsBookingPageOpen(false)
      Swal.fire('Booking Request Submitted', 'Your booking request has been submitted successfully', 'success')
    } else {
      alert('Failed to submit booking request.')
    }


  }

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])



  return (
    <div onClick={() => setIsBookingPageOpen(false)} className="fixed inset-0 top-10 p-4 flex flex-wrap justify-center items-center w-full  h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div onClick={(e) => e.stopPropagation()} className="flex z-50 justify-center ">
        <div className="mx-auto w-full  max-w-[800px] bg-white">
          <form onSubmit={submitHandle} className="p-5">
            <div className="flex gap-2 w-full">
              <div className="mb-3 w-full ">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                  Full Name
                </label>
                <input type="text" defaultValue={users?.fullName} name="name" id="name" placeholder="Full Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
              </div>
              <div className="mb-3 w-full">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                  Email Address
                </label>
                <input type="email" readOnly defaultValue={users?.email} name="email" id="email" placeholder="Enter your email"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
              </div>
            </div>



            <div className="mb-3 pt-3">
              <label className="mb-3 block text-base font-semibold text-[#07074D] sm:text-xl">
                Address Details
              </label>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-3">
                    <input type="text" name="area" id="area" placeholder="Enter area"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-3">
                    <input type="text" name="city" id="city" placeholder="Enter city"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-3">
                    <input type="text" name="state" id="state" placeholder="Enter state"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-3">
                    <input type="text" name="zipCode" id="post-code" placeholder="Post Code"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="Needs">Your Needs</label>
                <textarea name="needs" className="w-full h-20 mt-1 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
              </div>
            </div>

            <div>
              <button
                className="hover:shadow-form cursor-pointer w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Book Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default BookingService;
