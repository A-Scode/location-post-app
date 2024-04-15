import { useMutation, useQuery } from "@tanstack/react-query"
import api from "./config"
import { SignupData } from "../screens/Signup"
import { useToast } from "react-native-toast-notifications"

export const useSignUp = ()=>{
    const toast = useToast()
    const query = useMutation( {
        mutationFn : (data:SignupData)=>{
            // console.log(data)
            return api.post("/auth/user/signup" , data)
        },
        onSuccess : (data )=>{
            toast.show(data.data?.message , {type : "success"})
        },
        onError : ( error , variables , context)=>{
            toast.show("Username already taken or error occured" , {type : "danger"})
        },
    })

    return query
}
