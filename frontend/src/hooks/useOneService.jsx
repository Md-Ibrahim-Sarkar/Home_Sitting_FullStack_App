import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInstanace";

const useOneService = (id) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axiosInstance.get(`/service/get/${id}`);
        setService(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  return { service, loading, error };
};

export default useOneService;
