import React from 'react'
import { useNavigate } from 'react-router-dom'
function Role() {
    const navigate=useNavigate()
    
    const navToStudent=()=>{
        navigate("/student")

    }
    const navToAdmin=()=>{
        navigate("/admin")
    }
  return (
    <div>
        <button onClick={()=>navToStudent()}>student</button>
        <button onClick={()=>navToAdmin()}>admin</button>
    </div>
  )
}

export default Role
