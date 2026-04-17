import { useState } from "react"
import { useAuth } from "../Context/authContext"
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login(){
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const {logIn} = useAuth()
    const navigate = useNavigate()

    const handleLogin= async()=>{
        try {
            const res = await API.post("/auth/loginUser",{email,password})
            logIn(res.data.token)
            navigate("/dashboard")
        } catch  {             
            alert("Login Failed")            
        }              
    }

    return(
        <div className="flex flex-col w-100 h-90 justify-center items-center border p-20 gap-10">
            <h2 className="font-bold text-4xl">Admin Login</h2>
            <input className="border w-80 h-10 rounded" placeholder="Email - admin@gmail.com" onChange={(e)=> setEmail(e.target.value)} />
            <input className="border w-80 h-10 rounded" placeholder="Password - 123456" type="Password" onChange={(e)=>{setPassword(e.target.value)}} />
            <button className="border p-3 w-40 bg-blue-500 rounded-2xl" onClick={handleLogin}>Login</button>
        </div>
    )
}