import { axiosInstance } from "../../lib/axiosInstanace";


export const fetchBookingServices = async () => {
  try {
    const response = await axiosInstance('/booking/get');
    return response.data;
  } catch (error) {
    console.log(error.message);

  }
}