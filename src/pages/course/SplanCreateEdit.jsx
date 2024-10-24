import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { CreateStudyplan, GetStudyplan, UpdateStudyplan } from '../../api/Routing';

export const SplanCreateEdit = () => {
  const { control, register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      activities: [{ task: '', taskDescription: '', videoUrl: '', pdfNote: null }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities'
  });

  const navigate = useNavigate();
  const { id, courseId } = useParams();
  const isEdit = Boolean(id);
  const [StudyplanId, setStudyplanId] = useState([]);

  const loadData = async () => {
    if (!isEdit) {
      setValue('courseId', courseId || '');
      const InstructorId = sessionStorage.getItem('InstructorId');
      setValue('instructor', InstructorId || '');
      return;
    }
    
    try {
      const res = await GetStudyplan(id);
      const formData = res.data;
      setStudyplanId(res.data._id);
      console.log("GetStudyplan", res.data);
      
      if (formData.activities) {
        reset({ activities: [] });
        formData.activities.forEach(activity => append(activity));
      }

      setValue('courseId', formData.courseId || '');
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
    const formData = new FormData();
    
    // Append form data
    formData.append('courseId', data.courseId);
    formData.append('instructor', data.instructor);
    
    data.activities.forEach((activity, index) => {
     // console.log(`Activity ${index}:`, activity); // Log activity to see its structure
      formData.append(`activities[${index}].task`, activity.task);
      formData.append(`activities[${index}].taskDescription`, activity.taskDescription);
     
    // Append videoUrl only if it is defined, otherwise append an empty string
    const videoUrl = activity.videoUrl && activity.videoUrl !== 'undefined' ? activity.videoUrl : '';
    formData.append(`activities[${index}].videoUrl`, videoUrl);
    const NoteUrl = activity.pdfNote && activity.pdfNote !== 'undefined' ? activity.pdfNote : '';
    formData.append(`activities[${index}].pdfNote`,NoteUrl);
     
    });

    try {
      if (isEdit) {
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }
        await UpdateStudyplan(StudyplanId, formData);
      } else {
        await CreateStudyplan(formData);
      }
      toast.success('Success');
      navigate(`/Instructor/Course/${courseId}`);
    } catch (error) {
      toast.error(error.message || 'Error saving study plan');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-5">
        <div className="bg-white p-5 shadow-lg rounded-lg">
          <h3 className="text-3xl font-bold text-center mb-8">
            {isEdit ? "Edit StudyPlan" : "Create StudyPlan"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex gap-6">
                <div>
                  <label className="block text-red-500 font-medium mb-1">Course Id</label>
                  <input type="text" {...register("courseId")} className="bg-white border border-gray-300 rounded p-2" />
                </div>

                <div>
                  <label className="block text-red-500 font-medium mb-1">Instructor</label>
                  <input type="text" {...register("instructor")} className="bg-white border border-gray-300 rounded p-2" />
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
                      {...field}
                      placeholder="Task (1,2,..)"
                      className="border p-2"
                    />
                  )}
                />
                <Controller
                  name={`activities[${index}].taskDescription`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Task Description"
                      className="border p-2"
                    />
                  )}
                />
                <Controller
                  name={`activities[${index}].videoUrl`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Video URL"
                      className="border p-2"
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value || ''); // Ensure it's not set to the string "undefined"
                    }}
                    />
                  )}
                />
                <Controller
                  name={`activities[${index}].pdfNote`}
                  control={control}
                  render={({ field }) => (         
                    <input
                    {...field}
                    placeholder="Note URL"
                    className="border p-2"
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value || ''); // Ensure it's not set to the string "undefined"
                  }}
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
              onClick={() => append({ task: '', taskDescription: '', videoUrl: '', pdfNote: '' })}
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
  );
};
