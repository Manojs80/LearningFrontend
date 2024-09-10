import React, { useEffect } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailsInstructor, UpdateInstructor } from '../../api/Routing';

export const InstructorProfileEdit = () => {
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
      const res = await DetailsInstructor(id);
      const formData = res.data;

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
      toast.error('Failed to Load Instructor Data');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();

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
      await UpdateInstructor(id, formData);
      toast.success("Instructor updated successfully");
      navigate(`/Instructor/${id}`);
    } catch (error) {
      console.log("Error in editing Instructor:", error.response?.data || error);
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
                <button
                  type="button"
                  onClick={() => append({ id: '' })}
                  className="mt-2 bg-blue-500 text-white p-2 rounded"
                >
                  Add Course
                </button>
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


// import React, { useEffect } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { useNavigate, useParams } from 'react-router-dom';

// import { DetailsInstructor, UpdateInstructor} from '../../api/Routing';

// export const  InstructorProfileEdit = ()=> {
//   const { register, handleSubmit, reset, setValue ,formState: { errors }, watch ,control } = useForm({
//     defaultValues: {
//       courses: [{ name: '' }]  // Default value for courses array
//     }
//   });
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'courses'
//   });
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEdit = Boolean(id);
//    console.log("id Instructor",id);
   
//   const loadData = async () => {
//     if (!isEdit) return;
//     try {
//       const res = await DetailsInstructor(id);
//       const formData = res.data;
//       console.log(formData);
//       Object.keys(formData).forEach(key => {
//         setValue(key, formData[key]);
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error('Failed to Load Product');
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [id]);

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     Object.keys(data).forEach(key => {
//       formData.append(key, data[key]);
//     });
//     for (let [key, value] of formData.entries()) 
//       {
//       console.log(key, value);
//       }
//       const fileInput = document.getElementById("image") ;
//       if(fileInput && fileInput.files[0]) {
//         formData.append("image" , fileInput.files[0])
//       }
//     try {
//       await UpdateInstructor(id, formData)
//       //console.log(response.data,"response.data");
//       toast.success("Success");
//       navigate('/Instructor/id');
//     } catch (error) {
//       console.log("Error in editing Instructor:", error.response.data);
//       toast.error(error.response.data.error);
//       //console.log(error.response.data.error,"error.response.data.error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
     
//       <div className="container mx-auto p-5">
//         <div className="bg-white p-5 shadow-lg rounded-lg">
//           <h3 className="text-3xl font-bold text-center text-zinc-950 mb-8">
//             {isEdit ? "Edit Profile" : "Sign Up"}
//           </h3>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="flex flex-row gap-6"  >
//           <div className="mb-4">
//             <label className="block text-zinc-950 font-bold">Name</label>
//             <input
//               type="text"
//               {...register('name', { required: 'Name is required' })}
//               className="bg-white text-zinc-950 border border-gray-300  rounded p-2 w-full"
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//           </div>

//           <div className="mb-4">
//             <label className="block text-zinc-950 font-bold">Email</label>
//             <input
//               type="email"
//               {...register('email', { required: 'Email is required' })}
//               className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//           </div>
//           </div>
//           <div  className="flex flex-row gap-6" >
//           <label className="block text-zinc-950 font-bold">Courses</label>
        
//            <div className="flex flex-row gap-2">
//           {fields.map((field, index) => (
//             <div key={field.id} className="flex items-center space-x-2 bg-white text-zinc-950 border border-gray-300 rounded p-2">
//               <Controller
//                 control={control}
//                 name={`courses[${index}].name`}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     className="bg-white text-zinc-950 border border-gray-300 rounded p-2"
//                   />
//                 )}
//               />
//               <button
//                 type="button"
//                 onClick={() => remove(index)}
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
           
        
//            <button
//           type="button"
//           onClick={() => append({ name: '' })}
//           className="mt-2 bg-blue-500 text-white p-2 rounded"
//         >
//           Add Course
//            </button>
        
//            {errors.courses && <p className="text-red-500 text-sm">{errors.courses.message}</p>}
//            </div>
//            </div>
//             <div className="mb-4">
//             <label className="block text-zinc-950 font-bold">Role</label>
//             <input
//               type="text"
//               {...register('role', { required: 'Role is required' })}
//               className="bg-white text-zinc-950 border border-gray-300  rounded p-2 w-full"
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//             </div>
//           </div>
         

//           <div className="flex flex-row gap-6"  >
//           <div className="mb-4 ">
//             <label className="block text-zinc-950 font-bold">Mobile No</label>
//             <input
//               type="text"
//               {...register('mobile', { required: 'Mobile number is required' })}
//               className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
//             />
//             {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
//           </div>

//           <div className="mb-4 ">
//             <label className="block text-zinc-950 font-bold">Profile Picture</label>
//             <input
//               type="file"
//               name="image"
//                id="image"
//               {...register('image')}
//               className="bg-white text-red-500 border border-gray-300 rounded p-2 max-w-48 "
//             />
//           </div>

//           </div>
//           <div className="flex flex-row gap-6"  >

//           <div className="mb-4">
//             <label className="block text-zinc-950 font-bold">Password</label>
//             <input
//               type="password"
//               {...register('password', { required: 'Password is required' })}
//               className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//           </div>

//           <div className="mb-4">
//             <label className="block text-zinc-950 font-bold">Confirm Password</label>
//             <input
//               type="password"
//               {...register('confirmPassword', {
//                 validate: value =>
//                   value === watch('password') || 'Passwords do not match'
//               })}
//               className="bg-white text-zinc-950 border border-gray-300 rounded p-2 w-full"
//             />
//             {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
//           </div>
          
//           </div>
         
//           <div className="flex items-center justify-center">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//         </div>
//       </div>
//     </div>
//   );
// }


