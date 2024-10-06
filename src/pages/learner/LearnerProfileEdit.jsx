import React, { useEffect } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import {  DetailsLearner, UpdateLearner } from '../../api/Routing';

export const LearnerProfileEdit = () => {
  const { register, handleSubmit,  setValue, formState: { errors }, watch, control } = useForm({
    defaultValues: {
      courses: []  // Default value for courses array (empty array)
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'courses'
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const loadData = async () => {
    if (!isEdit) return;
    try {
      console.log("formdata");
      const res = await DetailsLearner(id);
      const formData = res.data;
        console.log("formdata",formData);
        
      // Set form values with loaded data
      Object.keys(formData).forEach(key => {
        if (key === 'courses') {
          // Handle courses field separately
          const courseIds = formData[key]; // Assuming it is an array of IDs
          courseIds.forEach(id => {
            append({ id }); // Append each course ID to the form
          });
        } else {
          setValue(key, formData[key]);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to Load Learner Data');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    const Response = sessionStorage.getItem('Role');
    console.log("edit Response",Response);
    // Append normal fields
    Object.keys(data).forEach(key => {
      if (key === 'courses') {
        data[key].forEach((course, index) => {
          formData.append(`courses[${index}]`, course.id);
        });
      } else {
        if (key === 'profilepic'){
            const fileInput = document.getElementById("profilepic");
           if (fileInput && fileInput.files[0]) {
             formData.append("profilepic", fileInput.files[0]);
             }
        } else {
            formData.append(key, data[key]);
        }
        
      
    } });
   
    console.log("formdata",formData);
    for (let [key, value] of formData.entries()) 
               {
             console.log(key, value);
              }
    try {
      await UpdateLearner(id, formData);
      toast.success("Learner updated successfully");
      if (!Response) {
        navigate(`/Learner/${id}`);
       } else {
        navigate(`/Admin/Learners/${id}`);
       } 
    
    } catch (error) {
      console.log("Error in editing Learner:", error.response?.data || error);
      toast.error(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-5">
        <div className="bg-white p-5 shadow-lg rounded-lg">
          <h3 className="text-3xl font-bold text-center text-zinc-950 mb-8">
             Edit Profile
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-row gap-6">
              <div className="mb-4 flex-1">
                <label className="block text-zinc-950 font-bold">Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="mb-4 flex-1">
                <label className="block text-zinc-950 font-bold">Email</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>
            <div className="flex flex-row gap-6">
              <div className="mb-4 flex-1">
                <label className="block text-zinc-950 font-bold">Role</label>
                <input
                  type="text"
                  {...register('role', { required: 'Role is required' })}
                  className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
                />
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
              </div>

              <div className="mb-4 flex-1">
                <label className="block text-zinc-950 font-bold">Mobile No</label>
                <input
                  type="text"
                  {...register('mobile', { required: 'Mobile number is required' })}
                  className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
              </div>
            </div>

            <div className="flex flex-row gap-6">
             <div className="mb-4 flex-1">
              <label className="block text-zinc-950 font-bold">Courses</label>
              <div className="flex-1 gap-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2 bg-white text-zinc-950 border border-gray-300 rounded p-2">
                    <Controller
                      control={control}
                      name={`courses[${index}].id`}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="bg-white w-3/4 text-zinc-950 border border-gray-300 rounded p-2"
                          disabled
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
              </div>
              {errors.courses && <p className="text-red-500 text-sm">{errors.courses.message}</p>}
            </div>
            </div>
            <div className="flex flex-row gap-6">
            <div className="mb-4 w-full">
              <label className="block text-zinc-950 font-bold">Profile Picture</label>
              <input
                type="file"
                name="profilepic"
                id="profilepic"
                className="bg-white w-fll text-zinc-950 border border-gray-300 rounded p-2 "
              />
            </div>
            </div>

            <div className="flex flex-row gap-6">
              <div className="mb-4 flex-1">
                <label className="block text-zinc-950 font-bold">Password</label>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <div className="mb-4 flex-1">
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


