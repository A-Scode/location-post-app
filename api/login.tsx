import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import { useToast } from "react-native-toast-notifications"
import { LoginContext } from "../context/LoginContext"
import api from "./config"
import { LoginData } from "../screens/Login"

export const useLogIn = ()=>{
    const toast = useToast()
    const loginContext = useContext(LoginContext)
    const query = useMutation( {
        mutationFn : (data:LoginData)=>{
            // console.log(data)
            return api.post("/auth/user/login" , data)
        },
        onSuccess : (data )=>{
            toast.show(data.data?.message , {type : "success"})
            loginContext.login({name : data.data?.name , token : data.data?.token})
            
        },
        onError : ( error , variables , context)=>{
            toast.show("Username already taken or error occured" , {type : "danger"})
        },
    })

    return query
}