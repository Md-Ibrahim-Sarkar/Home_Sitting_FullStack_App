import { axiosInstance } from "../../lib/axiosInstanace";

export const fetchfavorites = async () => {

  try {
    const response = await axiosInstance.get(`/favorite/get`);
    return response.data
  } catch (error) {
    console.log(error);

  }
};