import { PropsWithChildren, createContext, useCallback, useEffect, useState } from "react";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "../App";

export type LoginContextType = {
    name : string,
    token : string,
    login : Function,
}

export const LoginContext = createContext({
    name : "",
    token : "",
    login : (details:Omit<LoginContextType , "login">)=>{}
})

const LoginContextProvider= ({children} : PropsWithChildren)=>{

    const [token , setToken ] = useMMKVStorage<string|null>("token" , storage , null)

    const [loginDetails , setLoginDetails] = useState<Omit<LoginContextType , "login">>({
        name : "",
        token : ""
    })

    useEffect(()=>{
    //     console.info(loginDetails)
    } , [loginDetails])

    
    const updateLoginDetails = useCallback((details:Omit<LoginContextType , "login">)=>{
        setLoginDetails(details)
        setToken(details.token)
    } , [loginDetails])
    return(
        <LoginContext.Provider value={{
            name : loginDetails.name,
            token : loginDetails.token,
            login : updateLoginDetails
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider