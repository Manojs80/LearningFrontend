import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CreateInstructor, CreateLearner } from '../api/Routing';
import { useNavigate } from 'react-router-dom';

const roleColors = {
  learner: 'bg-emerald-500',
  instructor: 'bg-sky-600',
};

export const SignUpPage = () => {
  const [role, setRole] = useState('learner');
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Combine form data with role
     const form = { ...data, role };
     const formData = new FormData();
     Object.keys(form).forEach(key => {
       formData.append(key, form[key]);
     } )
   
    const fileInput = document.getElementById("image") ;
    if(fileInput && fileInput.files[0]) {
      formData.append("image" , fileInput.files[0])
    }
    try {
      // Simulate form submission logic
      let response
      console.log(formData);
      
      if (role === 'learner') {
        response = await CreateLearner(formData);  
      } else if (role === 'instructor') {
        response = await CreateInstructor(formData);   
      }
      toast.success('Form submitted successfully.. please.. login');  
      navigate("/login");
    } catch (error) {
      // Notify error
      console.error('Error occurred:', error);
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <div className={`flex items-center justify-center h-screen`}>
      <div className={` p-8 rounded-lg shadow-md ${roleColors[role]}`}>
        <h1 className="text-4xl font-bold text-center text-pink-700 mb-6">Sign Up</h1>
        
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-row gap-6"  >
          <div className="mb-4">
            <label className="block text-zinc-950 font-bold">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="bg-white text-zinc-950 border border-gray-300  rounded p-2 w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-zinc-950 font-bold">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          
          </div>
          <div className="flex flex-row gap-6"  >
          <div className="mb-4 ">
            <label className="block text-zinc-950 font-bold">Mobile No</label>
            <input
              type="text"
              {...register('mobile', { required: 'Mobile number is required' })}
              className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
          </div>

          <div className="mb-4 ">
            <label className="block text-zinc-950 font-bold">Profile Picture</label>
            <input
              type="file"
              name="image"
               id="image"
              {...register('image')}
              className="bg-white text-red-500 border border-gray-300 rounded p-2 max-w-48 "
            />
          </div>

          </div>
          <div className="flex flex-row gap-6"  >

          <div className="mb-4">
            <label className="block text-zinc-950 font-bold">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-zinc-950 font-bold">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword', {
                validate: value =>
                  value === watch('password') || 'Passwords do not match'
              })}
              className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          </div>
         
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};
