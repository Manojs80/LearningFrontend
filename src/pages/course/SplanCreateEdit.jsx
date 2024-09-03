
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { CreateStudyplan, GetStudyplan, UpdateStudyplan } from '../../api/Routing';

export const SplanCreateEdit = () => {
  const { control, register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      activities: [{ task: '', taskDescription: '', completed: false }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities'
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const loadData = async () => {
    if (!isEdit) return;
    try {
      const res = await GetStudyplan(id);
      const formData = res.data;

      if (formData.activities) {
        reset({ activities: [] });
        formData.activities.forEach(activity => append(activity));
      }

      setValue('course', formData.course || '');
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
      if (isEdit) {
        await UpdateStudyplan(id, data);
      } else {
        await CreateStudyplan(data);
      }
      toast.success('Success');
      navigate('/Instructor/Home');
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
                  <label className="block text-red-500 font-medium mb-1">Course</label>
                  <input type="text" {...register("course")} className="bg-white border border-gray-300 rounded p-2" />
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
                      type="text"  // Changed to text to match the data type
                      {...field}
                      placeholder="Task"
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
                  name={`activities[${index}].completed`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      {...field}
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
              onClick={() => append({ task: '', taskDescription: '', completed: false })}
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



