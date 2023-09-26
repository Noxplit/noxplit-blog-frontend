import axios from "axios";
import { REACT_APP_BACKEND_URL } from "./utils/constanst";

const instance = axios.create({
  baseURL:REACT_APP_BACKEND_URL
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})
export default instance