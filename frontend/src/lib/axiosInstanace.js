
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://home-sitting.onrender.com/api',
  withCredentials: true, // this allows cookies to be sent with requests
});