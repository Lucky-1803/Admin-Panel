import { useState } from "react";

export default function AddUser({open ,setOpen , onSave}){
    const [form , setForm] = useState({
        name : "",
        email : "",
        password :"",
        status : "active"
    })
    if(!open) return null

    return(
        <div className="border w-[80%]">
                <h2 className="text-xl font-bold ">Add User</h2>
            <div className=" w-[100%] flex justify-center items-center gap-10">
                <input onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="Name"  className="border"/>
                <input onChange={(e)=>{setForm({...form,email:e.target.value})}} placeholder="Email"  className="border"/>
                <input onChange={(e)=>{setForm({...form, password:e.target.value})}} type="password" placeholder="Password"  className="border"/>
                <select onChange={(e)=>{setForm({...form, status:e.target.value})}} className="border">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <div className="gap-10 flex">
                    <button onClick={()=>onSave(form)} className="bg-blue-500 px-2 py-1 rounded">Save</button>
                    <button onClick={()=>setOpen(false)} className="bg-red-500 px-2 py-1 rounded">Cancel</button>
                </div>
            </div>
            </div>
    )
}