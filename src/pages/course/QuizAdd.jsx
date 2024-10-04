import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateQuiz } from '../../api/Routing';

export const QuizAdd = () => {
  // Access course ID from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("courseId",id);
  const  courseId  = id;

  const { control, register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      questions: [{
        text: '',
        answers: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ],
        correctAnswerIndex: ''
      }],
      course: '',
      instructor: '',
      title: '',
      description: ''
    }
  });

  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: 'questions'
  });

  // Set the course ID in the form when the component mounts
  useEffect(() => {
    if (courseId) {
      setValue('course', courseId);
      const InstructorId = sessionStorage.getItem('InstructorId');
      setValue('instructor',InstructorId || '');
    }
  }, [courseId, setValue]);

  const onSubmit = async (data) => {
    try {
      // Optional: Validate correctAnswerIndex
      data.questions.forEach(question => {
        const index = parseInt(question.correctAnswerIndex, 10);
        if (isNaN(index) || index < 1 || index > 4) {
          throw new Error('Correct answer index must be a number between 1 and 4.');
        }
      });
        
      console.log("frontend", data);
      await CreateQuiz(data);
      console.log(" Create quiz ",data);
      toast.success('Success');
      navigate(`/instructor/Course/Quizs/${courseId}`);
    } catch (error) {
      toast.error(error.message || 'Error saving quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-5">
        <div className="bg-white p-5 shadow-lg rounded-lg">
          <h3 className="text-3xl font-bold text-center mb-8">Quiz Create</h3>
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
              <div className="flex gap-6">
                <div>
                <label className="block text-red-500 font-medium mb-1">Title</label>
                <input type="text" {...register("title")} className="bg-white border border-gray-300 rounded p-2" />
              </div>
              <div>
              <label className="block text-red-500 font-medium mb-1">Description</label>
              <textarea type="text" {...register("description")} className="bg-white border border-gray-300 rounded p-2" />
              </div>
            </div>
            </div>

            <label className="block text-red-500 font-medium mb-1">Questions</label>
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
                  <div key={answerIndex} className="flex items-center">
                    <Controller
                      name={`questions[${index}].answers[${answerIndex}].text`}
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder={`Option ${answerIndex + 1}`}
                          className="border p-2 mr-2"
                        />
                      )}
                    />
                  </div>
                ))}
                <Controller
                  name={`questions[${index}].correctAnswerIndex`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      min="1"
                      max="4"
                      placeholder="Correct Answer Index (1-4)"
                      className="border p-2"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 1 && value <= 4) {
                          setValue(`questions[${index}].correctAnswerIndex`, value);
                        }
                      }}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Remove Question
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendQuestion({
                text: '',
                answers: [
                  { text: '', isCorrect: false },
                  { text: '', isCorrect: false },
                  { text: '', isCorrect: false },
                  { text: '', isCorrect: false }
                ],
                correctAnswerIndex: ''
              })}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Question
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



  