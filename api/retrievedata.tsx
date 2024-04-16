import { useMutation, useQuery } from "@tanstack/react-query"
import api from "./config"
import { useContext } from "react"
import { LoginContext } from "../context/LoginContext"

export const useRetrieveData = ()=>{
    const login = useContext(LoginContext)
    const query = useQuery( {
        queryKey : ['data'],
        queryFn : ()=> api.get("/data" ,{
            method : 'GET',
            headers:{
                Authorization : login.token
            }
        } )
    })

    return query
}