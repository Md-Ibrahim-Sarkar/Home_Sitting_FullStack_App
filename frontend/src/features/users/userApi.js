import { useDispatch } from "react-redux";
import { axiosInstance } from "../../lib/axiosInstanace";
import { addUser, setError, setLoading } from "./userSlice";

export const useUserCheckApi = () => {
  const dispatch = useDispatch();

  const checkApi = async () => {
    dispatch(setLoading(true))
    try {

      const res = await axiosInstance.get("/auth/check");


      if (res.status === 200) {
        dispatch(addUser(res.data));

      }
    } catch (error) {
      console.error("API Error:", error);
      dispatch(setError(error.message));
    }
  };

  return checkApi;
};



export const useUserlogoutApi = () => {
  const dispatch = useDispatch();

  const checkApi = async () => {

    try {
      const res = await axiosInstance.post("/auth/logout");

      if (res.status === 200) {  // Change to 200 as success status
        console.log("Check API Successful:", res.data);
        // dispatch(addUser(res.data));
      }

    } catch (error) {
      console.error("API Error:", error);
      dispatch(setError(error.message));
    }

  };

  return checkApi;
};




export const useUserLogInApi = (formData) => {
  const dispatch = useDispatch();

  const checkApi = async () => {
    try {
      const res = await axiosInstance.post("/auth/login", formData);

      if (res.status === 200) {  // Change to 200 as success status
        console.log("Check API Successful:", res.data);
        dispatch(addUser(res.data));
      }

    } catch (error) {
      console.error("API Error:", error);
      dispatch(setError(error.message));
    }
  };

  return checkApi;
};



