import { useMutation } from "@tanstack/react-query"
import api from "./config"
import { LoginContext } from "../context/LoginContext"
import { useContext } from "react"
import { useToast } from "react-native-toast-notifications"
import { SubmitFromData } from "../screens/SubmitForm"

export const useSubmitFrom = ()=>{
    const toast = useToast()
    const login = useContext(LoginContext)
    const query = useMutation( {
        mutationFn : (data:FormData)=>{
            // console.log(data)
            return fetch("https://test.webyaparsolutions.com/form" ,{ 
                method : 'POST',
                headers: {
                    Authorization : login.token,

                    "Content-Type": "multipart/form-data",
                },
                body:data,
        } )
        },
        onSuccess : async (data:any )=>{
            let json = await data.json();
            // console.log("success" , data.status , json)
            toast.show("successfully submitted" , {type : "success"})
        },
        onError : ( error , variables , context)=>{
            // console.log(error.message)
            toast.show("Invalid Value error occured" , {type : "danger"})
        },
    })

    return query
}