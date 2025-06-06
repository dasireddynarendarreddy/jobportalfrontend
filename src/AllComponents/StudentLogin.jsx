import React,{useContext, useState} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allRecruterJobs } from '../Context/RecruterContext'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function StudentLogin() {
  const[logindata,setLoginData]=useState({mailid:'',password:''})
  const[stdLogin,setStdLogin]=useState(false)
    const navigate=useNavigate()
    const{setStudentInfo,studentinfo}=useContext(allRecruterJobs)
  const validateUser=async(e)=>{
    e.preventDefault()
    try{
      setStdLogin(true)
  
 const sendinfo=await axios.get( import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}verify-student?mail=${logindata.mailid}`:`${import.meta.env.VITE_BACKEND_URL}verify-student?mail=${logindata.mailid}`)
 console.log(sendinfo)
 if(sendinfo.status==200)
 {
  setStudentInfo(sendinfo.data)
  setStdLogin(false)
  localStorage.setItem("studentinfo",JSON.stringify(sendinfo.data))
  
      navigate("/viewstudentjobs")
 }
 
}
 catch(error)
 {
   setStdLogin(false)
      toast.error(error.response.data)
 }
   
  }
  return (
    
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <ToastContainer/>
  <form className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6 space-y-4" onSubmit={validateUser}>
    <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>

   
    <div>
      <label  htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        name="mailid"
        value={logindata.mailid}
        onChange={(e)=>setLoginData({...logindata,[e.target.name]:e.target.value})}
        required
        className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

   
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={logindata.password}
        onChange={(e)=>setLoginData({...logindata,[e.target.name]:e.target.value})}
        required
        className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    
    <button
      type="submit"
      className={stdLogin?"w-full bg-blue-200 text-white py-2 rounded-xl hover:bg-blue-700 transition cursor-not-allowed":"w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"}
     
    >
      {stdLogin?"Verifying...":"Login"}
    </button>
    <p className="text-sm text-center text-gray-500 mt-4">
      Don't have an account? 
      <NavLink to="/student"  className="text-indigo-600 hover:underline">Register</NavLink>
    </p>
  </form>
</div>

   
  )
}

export default StudentLogin
