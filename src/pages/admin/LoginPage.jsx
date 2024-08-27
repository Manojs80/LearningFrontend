import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Learnerlogin } from '../../api/Routing';


export const LoginPage = () => {

  const { register, handleSubmit,reset } = useForm();

  const navigate = useNavigate();

  const onSubmit = async(data) => {

    try {
      console.log("data from login",data);
      const loginbackend = await Learnerlogin(data);
      console.log("loginbackend  Success",loginbackend);
      toast.success(loginbackend.message)
      navigate('/signup')
      
    } catch (error) {
      console.log("error loginbackend",error.response.data);
      toast.error(error.response.data.message)
      reset()
    } 
  };
  
  return (
    <div>
      <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-md bg-success p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
           <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email"
            />
           </div>
           <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
