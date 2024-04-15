import { useMutation, useQuery } from "@tanstack/react-query"
import api from "./config"
import { LoginContext } from "../context/LoginContext"
import { useContext } from "react"
import { useToast } from "react-native-toast-notifications"
import { SubmitFromData } from "../screens/SubmitForm"

export const useRetrieveData = ()=>{
    const toast = useToast()
    const query = useQuery( {
        queryKey : ['data'],
        queryFn : ()=>{
            return api.get("/data").then(data=>{
                return data
            })
        }
    })

    return query
}