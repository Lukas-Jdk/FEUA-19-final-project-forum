import axios from 'axios';
import { config } from '../config';

const instance = axios.create({
  baseURL: config.BASE_URL,
});

instance.interceptors.request.use((req) => {
  if(typeof window !=="undefined") {
    const token = localStorage.getItem("token");
    if(token && req.headers) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export default instance