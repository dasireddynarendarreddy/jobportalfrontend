import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Role = () => {
    const navigate = useNavigate();

    const navToStudent = () => {
        navigate("/student")
    };

    const navToAdmin = () => {
        navigate("/admin");
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
                Discover Your Path with Our Job Portal
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-12 text-center max-w-2xl">
                Unlock opportunities tailored for both <span className="font-semibold">Students</span> and <span className="font-semibold">Recruiters</span>. Whether you're seeking the perfect start to your career or scouting top talent, this platform empowers you to connect, grow, and succeed. Begin your journey with us today!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <button 
                    onClick={navToStudent}
                    className="bg-white text-indigo-600 hover:bg-indigo-100 font-semibold py-4 px-8 rounded-xl transition duration-300 cursor-pointer"
                >
                    Student
                </button>
                <button 
                    onClick={navToAdmin}
                    className="bg-white text-purple-600 hover:bg-purple-100 font-semibold py-4 px-8 rounded-xl transition duration-300 cursor-pointer"
                >
                    Recruiter
                </button>
            </div>
        </div>
    );
};

export default Role;
