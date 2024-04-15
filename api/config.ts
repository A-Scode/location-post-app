import axios, { AxiosRequestConfig } from "axios";
import { BASE_URl } from "../config/constant";

const axiosConfig:AxiosRequestConfig = {
    baseURL : BASE_URl,
    timeout : 5000,
}

const api = axios.create(axiosConfig)

api.interceptors.request.use((config:AxiosRequestConfig)=>{
    
})

export default api