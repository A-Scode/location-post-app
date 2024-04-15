import axios, { AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { BASE_URl } from "../config/constant";
import { storage } from "../App";

const axiosConfig:AxiosRequestConfig = {
    baseURL : BASE_URl,
    timeout : 5000,
}

const api = axios.create(axiosConfig)

api.interceptors.request.use((config:InternalAxiosRequestConfig<any>)=>{
    let  newConfig:InternalAxiosRequestConfig<any> = config ;
    storage.getItem("token").then(value=>{
        console.warn('token : ' ,value);

        // @ts-ignore
        let headers:AxiosRequestHeaders ={
            ...config.headers,
            Authorization : `Bearer ${value}`,
        }

        if (value){
            newConfig = {...config , headers}
        }
        else newConfig = config;
    })
    return newConfig
})

export default api