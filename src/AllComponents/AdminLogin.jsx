import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { allRecruterJobs } from '../Context/RecruterContext'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function AdminLogin() {
    const[loginfo,setLogInfo]=useState({mail:'',password:''})
   const{recruterinfo,setRecruterInfo}=useContext(allRecruterJobs)
    const navigate=useNavigate()
    const recruterLogIn=async(e)=>{
        e.preventDefault()
        try{
        const sendinfo=await axios.get(`http://localhost:8080/studentporatl/portal/get-recruter?mail=${loginfo.mail}`)
        console.log("recruter info",sendinfo.data)
         localStorage.setItem("info",JSON.stringify(sendinfo.data))
         setRecruterInfo(sendinfo.data)
         navigate("/addjob")
        }
        catch(error)
        {
            toast.error("invalid credentails!")
        }


    }
    
    
  return (
    <div>
      <ToastContainer/>
        <div class="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
  <form class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm" onSubmit={recruterLogIn}>
    <h2 class="text-2xl font-bold text-center text-indigo-700 mb-6">Login</h2>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2">Email</label>
      <input type="email" placeholder="you@example.com"
           name="mail"
           value={loginfo.mail}
           onChange={(e)=>setLogInfo({...loginfo,[e.target.name]:e.target.value})}
             class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
    </div>

    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-medium mb-2">Password</label>
      <input type="password" placeholder="Enter your password"
      name="password"
      value={loginfo.password}
      onChange={(e)=>setLogInfo({...loginfo,[e.target.name]:e.target.value})}
             class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
    </div>

    <button type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-300">
      Sign In
    </button>

    <p class="text-sm text-center text-gray-500 mt-4">
      Don't have an account? 
      <NavLink to="/admin"  className="text-indigo-600 hover:underline">Register</NavLink>
    </p>
  </form>
</div>

      
    </div>
  )
}

export default AdminLogin
