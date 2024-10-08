import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { CreateAssignment, DetailsCourse, GetAssignment, UpdateAssignment } from '../../api/Routing';

export const Assignment = () => {
    const { control, register, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
          activities: [{ task: '', description: '', dueDate: '' }]
        }
      });
    
      const { fields, append, remove } = useFieldArray({
        control,
        name: 'activities'
      });
    
      const [Course, setCourse] = useState([]);
      const navigate = useNavigate();
      const { id ,courseId} = useParams();
      const isEdit = Boolean(id);
      console.log("Assignment",id);
      console.log("Assignment courseId",courseId);
      const loadData = async () => {
        
        if (isEdit){
          setValue('course', id || '');
          const InstructorId = sessionStorage.getItem('InstructorId');
          setValue('instructor',InstructorId || '');
          return;
        }
        try {
          const res = await GetAssignment(courseId);
          console.log("Assignment res",res);
          const state = await DetailsCourse(courseId)
          setCourse(state)
          console.log("Assignment course",state.data);
          const formData = res.data[0];
    
          if (formData.activities) {
            reset({ activities: [] });
            formData.activities.forEach(activity => append(activity));
          }
    
          setValue('course', formData.course || id);
          setValue('instructor', formData.instructor || '');
        } catch (error) {
          console.log(error);
          toast.error('Failed to Load Study Plan');
        }
      };
    
      useEffect(() => {
        loadData();
      }, [id]);
    
      const onSubmit = async (data) => {
        try {
          console.log("frontend",data);
          const Response = sessionStorage.getItem('Role');
           console.log("UpdateAssignment Response",Response);
          if (courseId) {
           await UpdateAssignment(courseId,data);
           console.log("UpdateAssignment",courseId);
           if (!Response) {
            navigate(`/Instructor/Course/AssignmentList/${courseId}`);
           } else {
            navigate(`/Admin/Assignments/${courseId}`);
           }
          
           
          } else {
            await CreateAssignment(data);
           console.log(" CreateAssignment");
           if (!Response) {
            navigate(`/Instructor/Course/AssignmentList/${id}`);
           } else {
            navigate(`/Admin/Assignments/${id}`);
           }        
          }
          toast.success('Success');
          
        } catch (error) {
          toast.error(error.message || 'Error saving study plan');
        }
      };
    
  return (
    <div className="min-h-screen bg-gray-100">
    <div className="container mx-auto p-5">
      <div className="bg-white p-5 shadow-lg rounded-lg">
        <h3 className="text-3xl font-bold text-center mb-8">
        Assignment
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex gap-6">
              <div>
                <label className="block text-red-500 font-medium mb-1">Course</label>
                <input type="string" {...register("course")} className="bg-white border border-gray-300 rounded p-2" />
              </div>

              <div>
                <label className="block text-red-500 font-medium mb-1">Instructor</label>
                <input type="string" {...register("instructor")} className="bg-white border border-gray-300 rounded p-2" />
              </div>
            </div>
          </div>

          <label className="block text-red-500 font-medium mb-1">Activities</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col space-y-2 mb-4">
              <Controller
                name={`activities[${index}].task`}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"  // Changed to text to match the data type
                    {...field}
                    placeholder="Task"
                    className="border p-2"
                  />
                )}
              />
              <Controller
                name={`activities[${index}].description`}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    placeholder="Task Description"
                    className="border p-2"
                  />
                )}
              />
              <Controller
                name={`activities[${index}].dueDate`}
                control={control}
                render={({ field }) => (
                  <input
                    type="string"
                    {...field}
                   placeholder="Due Date:MM/DD/YY"
                    className="mr-2"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ task: '', description: '', dueDate: '' })}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Activity
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}
