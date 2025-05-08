import React,{useState,useContext}from 'react'
import axios from 'axios'
import { NavLink,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allRecruterJobs } from '../Context/RecruterContext';
function JobInfo() {
    const [formData, setFormData] = useState({
        companyname: "",
        jobtitle: "",
        description: "",
        location: "",
        skills: [], // store as an array of strings
        postedBy:JSON.parse(localStorage.getItem("info")).id,
        postedOn:new Date().toDateString()
      });
      const[addingjob,setAddingJob]=useState(false)
      const navigate=useNavigate()
      const{setJobsPosted,fetchJobsPosted}=useContext(allRecruterJobs)
      const addJob=async(e)=>{
        e.preventDefault()
        console.log(formData)
        setAddingJob(true)
      
        const sendinfo=await axios.post(import.meta.env.MODE==="production"?`${import.meta.env.VITE_BACKEND_URL_PROD}post-job`:`${import.meta.env.VITE_BACKEND_URL}post-job`,formData)
        console.log(sendinfo)
        if(sendinfo.status==201)
        {
          toast.success("Job Added Sucessfully!")
          fetchJobsPosted();
          setAddingJob(false)
          setFormData({
            companyname: "",
        jobtitle: "",
        description: "",
        location: "",
        skills: [], // store as an array of strings
        postedBy:JSON.parse(localStorage.getItem("info")).id,
        postedOn:new Date().toDateString()
          })
        }
        

      }
      
      
      
  return (
    <div>
    <div>
      <form class="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6" onSubmit={addJob}>
 
  <div>
    <label for="companyname" class="block text-sm font-medium text-gray-700">Company Name</label>
    <input
      type="text"
      id="companyname"
      name="companyname"
      required
      value={formData.companyname}
      onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
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
      value={formData.jobtitle}
      onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
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
      value={formData.description}
      onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
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
      value={formData.location}
      onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
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
      value={formData.skills}
      onChange={(e) => {
        const value = e.target.value.split(',').map(skill => skill.trim());
        setFormData({ ...formData, [e.target.name]: value });
      }}
      
      placeholder="Java, Spring, SQL"
      class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
    />
  </div>

  
  <div class="pt-4">
    <button
      type="submit"
      class={addingjob?"w-full bg-blue-200 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-not-allowed":"w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer"}
    >
      {addingjob?"Addingjob":"addjob"}
    </button>
  </div>
</form>

    <ToastContainer/>
    </div>
    <button
      type="submit"
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      onClick={()=>navigate("/addedJobs")}
    >
      <NavLink to="/addedJobs">viewalljobs</NavLink>
    </button>
    </div>
  )
}

export default JobInfo
