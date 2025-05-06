import { useParams } from "react-router-dom";
import { useContext } from "react";
import { allRecruterJobs } from "../Context/RecruterContext";
import axios from 'axios'
const AppliedMembers = () => {
  const { id } = useParams();
  const { jobsposted } = useContext(allRecruterJobs);

  if (!jobsposted || jobsposted.length === 0) {
    return <div className="text-center mt-10 text-gray-500">Loading jobs...</div>;
  }

  const job = jobsposted.find((job) => job.id == id);
  console.log(job)

  if (!job || !job.appliedMembers) {
    return <div className="text-center mt-10 text-red-500">No applied members found for this job.</div>;
  }
  const updateStatus=async(data,stat)=>{
    const{id,student_id}=data;
    console.log(data,stat)
    console.log(id,student_id)
    const update=await axios.patch("http://localhost:8080/studentporatl/student/update-status",{id,student_id,status:stat})
    console.log(update.data)
    
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Applied Members for Job ID: {id}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Student ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {job.appliedMembers.map((member, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{member.student_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{member.student_mailid}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <div className="flex justify-center gap-3">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm" onClick={()=>updateStatus(member,"shortlist")}>
                      Shortlist
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm" onClick={()=>updateStatus(member,"reject")}>
                      Reject
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                      Message
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedMembers;
