import React, { useContext, useState } from 'react'
import {allRecruterJobs} from "../Context/RecruterContext"
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function EditJob() {
     const{fetchJobsPosted,editjob,setEditJob}=useContext(allRecruterJobs)
     const[updatingjob,setUpdatingJob]=useState(false)
     const navigate=useNavigate()
     console.log(editjob)
     const updateJob=async(e)=>{

        e.preventDefault();
        try{

        
        setUpdatingJob(true)
        const edit=await axios.put(import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}update-job`:`${import.meta.env.VITE_BACKEND_URL}update-job`,editjob)
        console.log(edit)
        if(edit.status===200)
        {
          setUpdatingJob(false)
          toast.success("job was updated sucessfully!")
          fetchJobsPosted()
        }
      }
      catch(error)
      {
        toast.error(error.response.data)
      }
        
        
       

     }
  return (
    <div>
      <div>
      <form class="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6" onSubmit={updateJob}>
 
  <div>
    <label for="companyname" class="block text-sm font-medium text-gray-700">Company Name</label>
    <input
      type="text"
      id="companyname"
      name="companyname"
      required
      value={editjob.companyname}
      onChange={(e)=>setEditJob({...editjob,[e.target.name]:e.target.value})}
      class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
    />
  </div>

 
  <div>
    <label for="jobtitle" class="block text-sm font-medium text-gray-700">Job Title</label>
    <input
      type="text"
      id="jobtitle"
      name="jobtitle"
      required
      value={editjob.jobtitle}
      onChange={(e)=>setEditJob({...editjob,[e.target.name]:e.target.value})}
      class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
    />
  </div>

  
  <div>
    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
    <textarea
      id="description"
      name="description"
      rows="4"
      required
      value={editjob.description}
      onChange={(e)=>setEditJob({...editjob,[e.target.name]:e.target.value})}
      class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
    ></textarea>
  </div>


  <div>
    <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
    <input
      type="text"
      id="location"
      name="location"
      required
      value={editjob.location}
      onChange={(e)=>setEditJob({...editjob,[e.target.name]:e.target.value})}
      class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
    />
  </div>

 
  <div>
    <label for="skills" class="block text-sm font-medium text-gray-700">Skills <span class="text-xs text-gray-500">(comma separated)</span></label>
    <input
      type="text"
      id="skills"
      name="skills"
      required
      value={editjob.skills}
      onChange={(e) => {
        const value = e.target.value.split(',').map(skill => skill.trim());
        setEditJob({ ...editjob, [e.target.name]: value });
      }}
      
      placeholder="Java, Spring, SQL"
      class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
    />
  </div>

  
  <div class="pt-4">
    <button
      type="submit"
      class={updatingjob?"w-full bg-blue-200 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-not-allowed":"w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer"}
      onClick={updateJob}
    >
      {updatingjob?"updating...":"update"}
    </button>
  </div>
</form>

    <ToastContainer/>
    </div>
    <div>
    <button
      type="submit"
      class="w-fit bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      onClick={()=>navigate("/addedJobs")}
    >
      <NavLink to="/addedJobs">viewalljobs</NavLink>
    </button>
    </div>
    </div>
   
  )
}

export default EditJob
