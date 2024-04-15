import { useMutation } from "@tanstack/react-query"
import api from "./config"
import { LoginContext } from "../context/LoginContext"
import { useContext } from "react"
import { useToast } from "react-native-toast-notifications"
import { SubmitFromData } from "../screens/SubmitForm"

export const useSubmitFrom = ()=>{
    const toast = useToast()
    const query = useMutation( {
        mutationFn : (data:FormData)=>{
            // console.log(data)
            return api.post("/form" , data ,{headers: {
                'Content-Type': 'multipart/form-data'}} )
        },
        onSuccess : (data )=>{
            toast.show(data.data?.message , {type : "success"})
        },
        onError : ( error , variables , context)=>{
            // console.log(error.message)
            toast.show("Invalid Value error occured" , {type : "danger"})
        },
    })

    return query
}