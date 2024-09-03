import React from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { CreateQuiz, GetQuiz, UpdateQuiz } from '../../api/Routing';

export const Quiz = () => {
  const { control, register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      questions: [{ text: '', answers: [{ text: '', isCorrect: false }], correctAnswerIndex: '' }],
      course: '',
      instructor: ''
    }
  });
  
  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: 'questions'
  });

  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const loadData = async () => {
    if (!isEdit) return;
    try {
      const res = await GetQuiz(id);
      const formData = res.data;
      console.log(formData);

      if (formData.questions) {
        reset({ questions: [] });
        formData.questions.forEach(question => {
          appendQuestion({
            text: question.text || '',
            correctAnswerIndex: question.correctAnswerIndex || '',
            answers: question.answers || []
          });
        });
      }

      setValue('course', formData.course || '');
      setValue('instructor', formData.instructor || '');
      setValue('title', formData.title || '');
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
      // Handle form submission here
      if (isEdit) {
        await UpdateQuiz(id,data);
      } else {
        await CreateQuiz(data);
      }
      toast.success('Success');
      navigate('/Instructor/quizs')

    } catch (error) {
      toast.error(error.message || 'Error saving study plan');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-5">
        <div className="bg-white p-5 shadow-lg rounded-lg">
          <h3 className="text-3xl font-bold text-center mb-8">
            {isEdit ? "Edit Quiz" : "Create Quiz"}
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
              <div>
                  <label className="block text-red-500 font-medium mb-1">Title</label>
                  <input type="text" {...register("title")} className="bg-white border border-gray-300 rounded p-2" />
                </div>
            </div>

            <label className="block text-red-500 font-medium mb-1">Activities</label>
            {questionFields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 mb-4">
                <Controller
                  name={`questions[${index}].text`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      placeholder="Question"
                      className="border p-2"
                    />
                  )}
                />
                {field.answers.map((answer, answerIndex) => (
                  <Controller
                    key={answerIndex}
                    name={`questions[${index}].answers[${answerIndex}].text`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        placeholder={`Option ${answerIndex + 1}`}
                        className="border p-2"
                      />
                    )}
                  />
                ))}
                <Controller
                  name={`questions[${index}].correctAnswerIndex`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="string"
                      {...field}
                      placeholder="Correct Answer Index"
                      className="border p-2"
                    />
                  )}
                />
                
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendQuestion({ text: '', 
                answers: [{ text: '', isCorrect: false },
                  { text: '', isCorrect: false },
                  { text: '', isCorrect: false },
                  { text: '', isCorrect: false }],
                 correctAnswerIndex: '' })}
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
}







  