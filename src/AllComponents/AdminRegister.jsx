import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function AdminRegister() {
    const[reginfo,setRegInfo]=useState({name:'',mail:'',phonenumber:'',companyname:'',password:''})
    const navigate=useNavigate()
    const AdminLogin=()=>{
        navigate("/admin/login")

    }
    const  createRecruter=async(e)=>{
        e.preventDefault()
        try{

          
        const sendinfo=await axios.post(import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}saverecruter`:`${import.meta.env.VITE_BACKEND_URL}saverecruter`,reginfo)
        if(sendinfo.status==201)
        {
            navigate("/admin/login")
        }
        }
        catch(error)
        {
            console.log(error)
        }

        console.log(reginfo)

    }
  return (
    <div>
        <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
  <form class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md" onSubmit={createRecruter}>
    <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Contact Form</h2>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2">Name</label>
      <input type="text" placeholder="Enter your name"
      name="name"
      required
      value={reginfo.name}
       onChange={(e)=>setRegInfo({...reginfo,[e.target.name]:e.target.value})}
             class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2">Email</label>
      <input type="email" placeholder="Enter your email"
      name="mail"
      value={reginfo.mail}
      required
      onChange={(e)=>setRegInfo({...reginfo,[e.target.name]:e.target.value})}
             class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
      <input type="tel" placeholder="Enter your phone number"
      name="phonenumber"
      value={reginfo.phonenumber}
      required
      onChange={(e)=>setRegInfo({...reginfo,[e.target.name]:e.target.value})}
             class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2">Company Name</label>
      <input type="text" placeholder="Enter your company name"
      name="companyname"
      value={reginfo.companyname}
      required
      onChange={(e)=>setRegInfo({...reginfo,[e.target.name]:e.target.value})}
             class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
    </div>

    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-medium mb-2">Password</label>
      <input type="password" placeholder="Enter your password"
      name="password"
      value={reginfo.password}
      required
      onChange={(e)=>setRegInfo({...reginfo,[e.target.name]:e.target.value})}
             class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
    </div>

    <button type="submit"
            class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">
      Register
    </button>
  </form>
  <div>
    <button onClick={AdminLogin}>Login</button>
  </div>
</div>

      
    </div>
  )
}

export default AdminRegister
