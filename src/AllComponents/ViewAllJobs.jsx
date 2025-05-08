import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { allRecruterJobs } from '../Context/RecruterContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
function ViewAllJobs() {
    const{jobsposted,setJobsPosted,recruterinfo,setRecruterInfo,fetchJobsPosted,setEditJob,recruterjobs}=useContext(allRecruterJobs)
    const navigate=useNavigate()
    const DeleteJob=async(id,rid)=>{
      console.log(id,rid)
      
      const removejob=await axios.delete(import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}removejob?id=${id}&rid=${rid}`:`${import.meta.env.VITE_BACKEND_URL}removejob?id=${id}&rid=${rid}`)
      console.log(removejob)
      if(removejob.status==200)
      {
        fetchJobsPosted(recruterinfo.id)
          toast.success("Job Deleted Sucessfully!")
         
      }
      

    }
    const EditJob=(job)=>{
           navigate("/editJob")
      setEditJob(job)
      


    }
    
    
  return (
    
        
     
 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {recruterjobs.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-gray-800">{job.companyname}</h2>
                  <h3 className="text-lg font-semibold text-blue-600">{job.jobtitle}</h3>
                  <p className="text-sm text-gray-500">{job.location} • {job.postedOn}</p>
          
                  <p className="text-gray-700 text-sm mt-2">{job.description}</p>
          
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
          
                <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                  <p>Posted By: {job.postedBy}</p>
                  <p>{job.appliedMembers.length>0?<NavLink to={`/appliedmembers/${job.id}`}>{job.appliedMembers.length}Applied</NavLink>:""}</p>
                </div>
                    <div className='flex'>
                      <div>
                        <button className="bg-red-500 rounded-lg p-2 cursor-pointer" onClick={()=>DeleteJob(job.id,recruterinfo.id)}>Delete</button>
                      </div>
                      <div>
                        <button className="bg-blue-300 rounded-lg p-2 cursor-pointer" onClick={()=>EditJob(job)}>Edit</button>
                      </div>
                    </div>
              </div>
              
            ))}
            <ToastContainer/>
          </div>
          
       
  )
}

export default ViewAllJobs
