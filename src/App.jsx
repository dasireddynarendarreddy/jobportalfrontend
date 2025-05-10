import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import {Routes,Route} from "react-router-dom"
import StudentRegister from './AllComponents/StudentRegister'
import StudentLogin from './AllComponents/StudentLogin'
import AdminRegister from './AllComponents/AdminRegister'
import AdminLogin from './AllComponents/AdminLogin'
import Role from './AllComponents/Role'
import JobInfo from './AllComponents/JobInfo'
import ViewAllJobs from './AllComponents/ViewAllJobs'
import EditJob from './AllComponents/EditJob'
import ViewStudentJobs from './AllComponents/ViewStudentJobs'
import { useNavigate } from 'react-router-dom'
import { allRecruterJobs } from "./Context/RecruterContext";
import AppliedMembers from "./AllComponents/AppliedMembers"
function App() {

  const[recruterinfo,setRecruterInfo]=useState(localStorage.getItem("info")?JSON.parse(localStorage.getItem("info")):null)
  const[jobsposted,setJobsPosted]=useState([])
  const[editjob,setEditJob]=useState({})
  const[recruterjobs,setRecruterPostedJobs]=useState([]);
  const[studentinfo,setStudentInfo]=useState(localStorage.getItem("studentinfo")?JSON.parse(localStorage.getItem("studentinfo")):null)
  const navigate=useNavigate()
    //import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}/get-recruter?mail=${loginfo.mail}`:`${import.meta.env.VITE_BACKEND_URL}/get-recruter?mail=${loginfo.mail}`)
  const fetchAllJobsHave=async()=>{
    const getalljobs=await axios.get(import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}getAllJobs`:`${import.meta.env.VITE_BACKEND_URL}getAllJobs`)
    console.log("all jobs are",getalljobs)
    setJobsPosted(getalljobs.data)
  }
  const fetchJobsPosted=async(id)=>{
    const postedjobs=await axios.get(import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}alljobs?recruterid=${id}`:`${import.meta.env.VITE_BACKEND_URL}alljobs?recruterid=${id}`)
    console.log("the jobs posted by recruter are",postedjobs)
    setRecruterPostedJobs(postedjobs.data)
  }
  const fetchAppliedJobs=async()=>{
    const sendinfo=await axios.get(import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}verify-student?mail=${studentinfo.mailid}`:`${import.meta.env.VITE_BACKEND_URL_PROD}verify-student?mail=${studentinfo.mailid}`)
 console.log(sendinfo)
 if(sendinfo.status==200)
  {
   setStudentInfo(sendinfo.data)
   localStorage.setItem("studentinfo",JSON.stringify(sendinfo.data))
   
       navigate("/viewstudentjobs")
  }

  }
  useEffect(()=>{

    fetchAllJobsHave()
           const savedinfo=localStorage.getItem("info")
         if(savedinfo)
         {
          const data=JSON.parse(savedinfo)
                   fetchJobsPosted(data.id)
         }
                
    
    if(localStorage.getItem("studentinfo"))
    {
      fetchAppliedJobs();
    }
    useEffect(() => {
      fetch(import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}`:`${import.meta.env.VITE_BACKEND_URL}`)
        .then(response => console.log("Server is awake"+response))
        .catch(error => console.error("Failed to wake server", error));
    }, []);
    

  },[])

  return (
    <>
    <allRecruterJobs.Provider value={{jobsposted,setJobsPosted,recruterinfo,setRecruterInfo,fetchJobsPosted,editjob,setEditJob,setStudentInfo,studentinfo,fetchAppliedJobs,recruterjobs}}>
       <Routes>
           <Route path="/"  element={<Role/>}/>
           <Route path="/student" element={<StudentRegister/>}/>
              <Route path="/student/login" element={<StudentLogin/>}/>
              <Route path="/viewstudentjobs" element={<ViewStudentJobs/>}/>
           
           <Route path="/admin" element={<AdminRegister/>}/>
              <Route path="/admin/login" element={<AdminLogin/>}/>
           
                <Route path="/addjob" element={<JobInfo/>}/>
                <Route path="/addedJobs" element={<ViewAllJobs/>}/>
                <Route path="/editJob" element={<EditJob/>}/>
                <Route path="/appliedmembers/:id" element={<AppliedMembers />} />
       </Routes>
       </allRecruterJobs.Provider>
    </>
  )
}

export default App
