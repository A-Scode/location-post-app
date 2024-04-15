import { PropsWithChildren, createContext, useCallback, useState } from "react";

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
    const [loginDetails , setLoginDetails] = useState<Omit<LoginContextType , "login">>({
        name : "",
        token : ""
    })
    
    const updateLoginDetails = useCallback((details:Omit<LoginContextType , "login">)=>{
        setLoginDetails(details)
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