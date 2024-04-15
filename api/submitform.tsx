import { useMutation } from "@tanstack/react-query"
import api from "./config"
import { LoginContext } from "../context/LoginContext"
import { useContext } from "react"
import { useToast } from "react-native-toast-notifications"

export const useSubmitFrom = ()=>{
    const toast = useToast()
    const query = useMutation( {
        mutationFn : (data)=>{
            console.log(data)
            return api.post("/form" , data)
        },
        onSuccess : (data )=>{
            toast.show(data.data?.message , {type : "success"})
        },
        onError : ( error , variables , context)=>{
            toast.show("Invalid Value error occured" , {type : "danger"})
        },
    })

    return query
}