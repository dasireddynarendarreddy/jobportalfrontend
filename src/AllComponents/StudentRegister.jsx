import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from "react-router-dom";
import axios from "axios"
function StudentRegister() {
  const[reginfo,setRegInfo]=useState({name:'',age:'',mailid:'',password:''})
  const navigate=useNavigate()
  const studentLogin=async(e)=>{
    e.preventDefault()
    console.log(reginfo)
    try{
      
    const sendinfo=await axios.post('http://localhost:8080/studentporatl/portal/savestudent',reginfo)
   if(sendinfo.status==201)
   {

    navigate("/student/login")
   }
  }
  catch(error)
  {
    console.log(error)
  }
  }
  return (
    
             <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <form class="w-full max-w-md bg-white shadow-md rounded-2xl p-6 space-y-4" onSubmit={studentLogin}>
    <h2 class="text-2xl font-semibold text-center text-gray-700">User Form</h2>

    
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={reginfo.name}
        onChange={(e)=>setRegInfo({...reginfo,[e.target.name]:e.target.value})}
        required
        class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

 
    <div>
      <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
      <input
        type="text"
        id="age"
        name="age"
        value={reginfo.age}
        required
        onChange={(e)=>setRegInfo({...reginfo,[e.target.name]:e.target.value})}
        class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

   
    <div>
      <label for="mailid" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        id="mailid"
        name="mailid"
        required
        onChange={(e)=>setRegInfo({...reginfo,[e.target.name]:e.target.value})}
        value={reginfo.mailid}
        class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        onChange={(e)=>setRegInfo({...reginfo,[e.target.name]:e.target.value})}
        value={reginfo.password}
        class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
   
    <button
      type="submit"
      class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
    >
      Register
    </button>
  </form>
    <div>
        <button onClick={studentLogin}>Login</button>
    </div>
    <Outlet/>
</div>
 
      
    
  )
}

export default StudentRegister
