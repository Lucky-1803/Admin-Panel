import { createContext, useContext, useState } from "react";

const authContext = createContext()

export const AuthProvider = ({children})=>{

    const [token , setToken] = useState(localStorage.getItem('token'))

    const logIn = (token)=>{
        localStorage.setItem('token' , token)
        setToken(token)
    }

    const logOut = ()=>{
        localStorage.removeItem("token")
        setToken(null)
    }
return(
    <authContext.Provider value={{token , logIn ,logOut}}>
        {children}
    </authContext.Provider>
)
}

export const useAuth =()=> useContext(authContext)