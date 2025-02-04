import { axiosInstance } from "../../lib/axiosInstanace";

export const fetchServices = async (searchValue = "") => {

  try {
    const response = await axiosInstance.get(`/service/get?search=${searchValue}`);
    return response.data
  } catch (error) {
    console.log(error);

  }
};