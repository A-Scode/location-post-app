import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { BASE_URl } from "../config/constant";
import { storage } from "../App";
import { Toast } from "react-native-toast-notifications";

const axiosConfig:AxiosRequestConfig = {
    baseURL : BASE_URl,
    timeout : 5000,
}

const api = axios.create(axiosConfig)

api.interceptors.request.use((config:AxiosRequestConfig<any>)=>{
    let  newConfig:AxiosRequestConfig<any> = config ;
    storage.getItem("token").then((value)=>{
        
        // @ts-ignore
        let headers:AxiosRequestHeaders ={
            ...config.headers,
            Authorization : `${value}`,
        }
        
        if (value){
            // console.warn('token : ' ,value);
            newConfig = {...config , headers}
        }
        else newConfig = config;
    })
    return newConfig
})

api.interceptors.response.use((response:AxiosResponse)=>{
    // console.log("response" , response)
    if (response.status !== 200) {
        Toast.show(response.data.message ,{type : "danger" , animationType:"slide-in"  , duration:5000})
    }
    return response
})

export default api