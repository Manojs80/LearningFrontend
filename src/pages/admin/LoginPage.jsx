import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Adminlogin, Instructorlogin, Learnerlogin } from '../../api/Routing';

const roleColors = {
  learner: 'bg-emerald-500',
  instructor: 'bg-sky-600',
  admin:'bg-blue-400',
};


export const LoginPage = () => {
  const [role, setRole] = useState('learner');
  const { register, handleSubmit,reset } = useForm();

  const navigate = useNavigate();

  const onSubmit = async(data) => {

    try {
      let loginbackend;
      if (role === 'learner') {
          loginbackend = await Learnerlogin(data);
      } else if (role === 'instructor') {
          loginbackend = await Instructorlogin(data);
      } else if (role === 'admin') {
          loginbackend = await Adminlogin(data);
      }
      
      // Debug: Check the loginbackend structure
      console.log("loginbackend:", loginbackend.data);
      
      if (loginbackend && loginbackend.message) {
          toast.success(loginbackend.message);
      } else {
          toast.error('Unexpected response structure.');
      }
      
      sessionStorage.setItem('loginId',loginbackend.data._id);
    
      
      if (role === 'learner') {
        console.log("role(learner)",role);
        
        navigate(`/learner/${loginbackend.data._id}`); 
     } else if (role === 'instructor') {
      console.log("role2",role);
      navigate(`/instructor/${loginbackend.data._id}`);
     } else if (role === 'admin') {
      console.log("role user",`/admin/${loginbackend.data._id}`);
      navigate(`/admin/${loginbackend.data._id}`);
     }
      
      
  } catch (error) {
      // Debug: Check the error structure
      console.log("error:", error);
      
      // Ensure that error.response.data exists before accessing
      if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
      } else {
          toast.error('An unexpected error occurred.');
      }
      reset();
  }
};
  
  return (
    <div>
      <div className="flex justify-center items-center h-screen ">
      <div className={` p-8 rounded-lg shadow-md ${roleColors[role]}`}>
        <h2 className="text-2xl font-bold text-center text-pink-700 mb-6">Login</h2>
        
        <div className="flex justify-center mb-6 ">
          {Object.keys(roleColors).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={` w-32 p-2 mx-1 rounded ${role === r ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
           <div>
            <label htmlFor="email" className="block  text-zinc-950 font-bold">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full px-3 py-2 bg-white text-zinc-950 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email"
            />
           </div>
           <div>
            <label htmlFor="password" className="block  text-zinc-950 font-bold">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full px-3 py-2 bg-white text-zinc-950 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
            
            <label className="label text-warning">
               <Link to={"/signup"}>New User ?</Link>
            </label>

           </div>
           <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Login
           </button>
        </form>
      </div>
    </div>
    </div>
  )
}
