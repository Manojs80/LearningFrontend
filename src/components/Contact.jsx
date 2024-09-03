import React from 'react'
import { useForm } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom';
import { CreateContact } from '../api/Routing';
import { toast } from 'react-toastify';

export const Contact = () => {
    const { register, handleSubmit,reset } = useForm();

    const navigate = useNavigate();
    const onSubmit = async(data) => {
        try {
            console.log(data);
            await CreateContact(data);
            toast.success("success");
            navigate('/home'); 
            
        } catch (error) {
            toast.error("Failed Please send again");
           reset();
        }
    }
  
  return (
    <div>
      <div className="flex justify-center items-center h-screen ">
      <div className=" p-8 rounded-lg shadow-md bg-emerald-500 w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold text-center text-pink-700 mb-6">Contact Form </h2>
        
       
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
            <label htmlFor="name" className="block  text-zinc-950 font-bold">Name</label>
            <input
              id="name"
              type="Text"
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full px-3 py-2 bg-white text-zinc-950 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Name"
            />
           </div>
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
           <label className="block text-zinc-950 font-bold">Mobile No</label>
            <input
              type="text"
              {...register('mobile')}
              className="mt-1 block w-full px-3 py-2 bg-white text-zinc-950 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
               placeholder="Mobile No"
            />
             </div>
           <div>
            <label htmlFor="message" className="block  text-zinc-950 font-bold">Message</label>
            <textarea
              id="message"
              type="text"
              {...register('message')}
              className="mt-1 block w-full px-3 py-2 bg-white text-zinc-950 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="message"
            />
           </div>
           <div className="flex justify-center items-center">
           <button
            type="submit"
            className="w-1/3  bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Send
           </button>
           </div>
        </form>
      </div>
    </div>
    </div>
  )
}

