import React, { useContext, useState } from 'react'
import { allRecruterJobs } from '../Context/RecruterContext'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function ViewStudentJobs() {
    const{jobsposted,studentinfo,fetchAppliedJobs}=useContext(allRecruterJobs)
    
    const ApplyToJob=async(job)=>{
       
      if(job.mode==='apply')
        
      {
       
        
        const infoToSend={
            student_mailid:studentinfo.mailid?studentinfo.mailid:JSON.parse(localStorage.getItem("studentinfo")).mailid, 
            companyname:job.companyname,
            description:job.description,
             student_id:JSON.parse(localStorage.getItem("studentinfo")).id,
              id:job.id,
           jobtitle:job.jobtitle,

           location:job.location,
           postedBy:job.postedBy,
           postedOn:job.postedOn,
           skills:job.skills

           
        }
        console.log("the info to send",infoToSend)
        const info=await axios.post(import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}apply-to-job`:`${import.meta.env.VITE_BACKEND_URL}apply-to-job`,infoToSend);
       console.log(info)
       if(info.status==200)
       {
         toast.success("Sucessfully applied for job:)")
        fetchAppliedJobs()
       }
       console.log(job)
      }
      else{
        console.log("with draw mode",job)
        
        let mailid=studentinfo.mailid?studentinfo.mailid:JSON.parse(localStorage.getItem("studentinfo")).mailid
     
        const info=await axios.patch(import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}with-draw-application/${mailid}/${job.id}`:`${import.meta.env.VITE_BACKEND_URL}with-draw-application/${mailid}/${job.id}`)
         if(info.status===200)
         {
          toast.success("Sucessfully withdrawn the job:)")
         }
         fetchAppliedJobs()
      }
        
    }
  return (
    <div>
      <ToastContainer/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {jobsposted.map((job, index) => (
    <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.jobtitle}</h2>
        <p className="text-gray-600 text-sm mb-1"><span className="font-semibold">Company:</span> {job.companyname}</p>
        <p className="text-gray-600 text-sm mb-1"><span className="font-semibold">Location:</span> {job.location}</p>
    
        <p className="text-gray-700 mb-4">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              {skill}
            </span>
          ))}
        </div>

        <p className="text-gray-500 text-sm mb-2">Applied By: {job.appliedMembers.length
        } students</p>
        <span>status:{studentinfo.appliedjobs.findIndex((data)=>data.jobid===job.id)!==-1?<span className='text-green-500'>{studentinfo.appliedjobs[studentinfo.appliedjobs.findIndex((data)=>data.jobid===job.id)].status}</span>:<span className='text-red-500'>Not applied</span>}</span>
      </div>

      <button className={studentinfo.appliedjobs.some(data=>data.jobid===job.id)?"mt-4 bg-red-600 text-white rounded-xl py-2 hover:bg-red-700 transition-all cursor-pointer":"mt-4 bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-700 transition-all cursor-pointer"} onClick={()=>ApplyToJob(studentinfo.appliedjobs.some(data=>data.jobid===job.id)?{mode:'withdraw',companyname:job.companyname,
            description:job.description,  id:job.id,
            jobtitle:job.jobtitle,
 
            location:job.location,
            postedBy:job.postedBy,
            postedOn:job.postedOn,
            skills:job.skills}:{mode:'apply',id:job.id,status:"applied"})}>
        {studentinfo.appliedjobs.some(jobItem => jobItem.jobid === job.id)?"Withdraw":"Apply"}
      </button>
    </div>
  ))}
</div>

    </div>
  )
}

export default ViewStudentJobs
