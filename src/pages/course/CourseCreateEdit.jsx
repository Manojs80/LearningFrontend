import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { CreateCourse, DetailsCourse, UpdateCourse } from '../../api/Routing';

export const CourseCreateEdit = () => {
  const { control, register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      objectives: [{ objective: '' }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'objectives'
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const loadData = async () => {
    if (!isEdit) return;
    try {
      const res = await DetailsCourse(id);
      const formData = res.data;

      if (formData.objectives) {
        reset({ objectives: [] });
        formData.objectives.forEach(objective => append({ objective }));
      }

      setValue('_id', formData._id || '');
      setValue('title', formData.title || '');
      setValue('description', formData.description || '');
      setValue('duration', formData.duration || '');
      setValue('instructor', formData.instructor || '');
    } catch (error) {
      console.log(error);
      toast.error('Failed to Load Course Data');
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append fields to FormData
    Object.keys(data).forEach(key => {
      if (key === 'objectives') {
        data[key].forEach((objective, index) => {
          formData.append(`objectives[${index}]`, objective.objective);
        });
      } else if (key !== 'image') {
        formData.append(key, data[key]);
      }
    });

    // Append the image file if it exists
    const fileInput = document.getElementById('image');
    if (fileInput && fileInput.files.length > 0) {
      formData.append('image', fileInput.files[0]);
    } else {
      console.log('No image file selected');
    }

    // Debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      if (isEdit) {
        await UpdateCourse(id, formData);
      } else {
       await CreateCourse(formData);
      }
      toast.success('Success');
      navigate(`/Instructor/home`); // Adjust path as needed
    } catch (error) {
      toast.error(error.message || 'Error saving course data');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-5">
        <div className="bg-white p-5 shadow-lg rounded-lg">
          <h3 className="text-3xl font-bold text-center mb-8">
            {isEdit ? "Edit Course" : "Create Course"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex-1">
                <label className="block text-red-500 font-medium mb-1">Course Id</label>
                <input
                  type="text"
                  {...register("_id", {
                    pattern: {
                      value: /^[0-9a-fA-F]{24}$/,
                      message: 'Invalid Course ID format'
                    }
                  })}
                  className="bg-white border border-gray-300 rounded p-2 w-full"
                  disabled={isEdit} // Disable if editing
                />
                {errors._id && <p className="text-red-500 text-sm">{errors._id.message}</p>}
              </div>

              <div className="flex-1">
                <label className="block text-red-500 font-medium mb-1">Instructor Id</label>
                <input
                  type="text"
                  {...register("instructor", {
                    required: 'Instructor ID is required',
                    pattern: {
                      value: /^[0-9a-fA-F]{24}$/,
                      message: 'Invalid Instructor ID format'
                    }
                  })}
                  className="bg-white border border-gray-300 rounded p-2 w-full"
                />
                {errors.instructor && <p className="text-red-500 text-sm">{errors.instructor.message}</p>}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex-1">
                <label className="block text-red-500 font-medium mb-1">Title</label>
                <input
                  type="text"
                  {...register("title", { required: 'Title is required' })}
                  className="bg-white border border-gray-300 rounded p-2 w-full"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>

              <div className="flex-1">
                <label className="block text-red-500 font-medium mb-1">Duration (in minutes)</label>
                <input
                  type="number"
                  {...register("duration", { required: 'Duration is required' })}
                  className="bg-white border border-gray-300 rounded p-2 w-full"
                />
                {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-red-500 font-medium mb-1">Image</label>
              <input
                type="file"
                id="image"
                className="bg-white border border-gray-300 rounded p-2 w-full"
                accept="image/*" // Optional: restrict to image files
              />
            </div>

            <div className="mb-4">
              <label className="block text-red-500 font-medium mb-1">Description</label>
              <textarea
                {...register("description", { required: 'Description is required' })}
                className="bg-white border border-gray-300 rounded p-2 w-full"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <label className="block text-red-500 font-medium mb-1">Objectives</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 mb-4">
                <Controller
                  name={`objectives[${index}].objective`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      placeholder="Objective"
                      className="border p-2 w-full"
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
              onClick={() => append({ objective: '' })}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Objective
            </button> 

            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
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
