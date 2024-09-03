import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { CreateInstuctor, DetailsInstructor, UpdateInstuctor } from '../../api/Routing';

export const  InstructorSignup = ()=> {
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const loadData = async () => {
    if (!isEdit) return;
    try {
      const res = await DetailsInstructor(id);
      const formData = res.data;
      console.log(formData);
      Object.keys(formData).forEach(key => {
        setValue(key, formData[key]);
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to Load Product');
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
  }
    try {
      {isEdit ? await UpdateInstuctor(id, formData) : await CreateInstuctor(formData);}
      //console.log(response.data,"response.data");
      toast.success("Success");
      navigate('/instuctor/quizs');
    } catch (error) {
      console.log("Error adding product:", error.response.data);
      toast.error(error.response.data.error);
      //console.log(error.response.data.error,"error.response.data.error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
     
      <div className="container mx-auto p-5">
        <div className="bg-white p-5 shadow-lg rounded-lg">
          <h3 className="text-3xl font-bold text-center mb-8">
            {isEdit ? "Edit Profile" : "Sign Up"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-red-500 font-medium mb-1">Name</label>
                  <input type="text" {...register("name")} className="bg-white border border-gray-300 rounded p-2" />
                </div>
                <div>
                  <label className="block text-red-500 font-medium mb-1">E-mail</label>
                  <input type="text" {...register("email")} className="bg-white border border-gray-300 rounded p-2" />
                </div>
                <div>
                  <label className="block text-red-500 font-medium mb-1">Password</label>
                  <input type="text" {...register("password")} className="bg-white border border-gray-300 rounded p-2" />
                </div>
                
              </div>
              <div className="flex flex-col gap-4">
              <div>
                  <label className="block text-red-500 font-medium mb-1">Profilepic</label>
                  <input type="file" {...register("profilepic")} className="bg-white border border-gray-300 rounded w-48 p-1" />
                </div>
                <div>
                  <label className="block text-red-500 font-medium mb-3">Course</label>
                  <input type="text" {...register("course")} className="bg-white border border-gray-300 rounded p-2" />
                </div>               
                <div>
                  <label className="block text-red-500 font-medium mb-3">Role</label>
                  <input type="text" {...register("role")} className="bg-white border border-gray-300 rounded p-2" />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


