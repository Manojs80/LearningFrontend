import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetQuiz, SubmitQuiz } from '../../api/Routing'; // Ensure this is your API call function
import { LoadingPage } from '../../LoadingPage';

export const LearnerQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await GetQuiz(id);
        console.log("fetchQuiz frontend", response.data);
       
        // Assuming `response.data` is the quiz object
        if (response.data) {
          setQuiz(response.data); // Directly set the quiz data
        } else {
          setError('Failed to fetch quiz data.');
        }
      } catch (err) {
        setError(err.message || 'Error fetching quiz.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionChange = (questionId, optionId) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace with actual user ID
      const sessionData = sessionStorage.getItem('sessionData');
      console.log("session storage data",sessionData);
      const userId = `${sessionData}`; // Retrieve this from your auth context or user state
  
      const payload = {
        userId,
        quizId: quiz._id,
        responses: Object.keys(responses).map(questionId => ({
          questionId,
          answerId: responses[questionId]
        }))
      };
      const result = await SubmitQuiz(payload);
     console.log("quiz submit frontend response",result);
     
      if (result.score !== undefined) {
        alert(`Responses submitted successfully! Your score is: ${result.score}`);
        navigate(`/learner/profile/${sessionData}`);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      console.error('Error submitting responses:', err);
      alert('Failed to submit responses. Please try again.');
    }
  };

  if (loading) return <div><LoadingPage/></div>;
  if (error) return <div>Error loading quiz. Please try again later.</div>;
  if (!quiz) return <div>No quiz found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <p className="mb-4">{quiz.description}</p>

      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <div key={question._id} className="mb-6">
            <div className="text-lg font-semibold mb-2">{index + 1}. {question.text}</div>
            <div className="space-y-2">
              {question.answers.map((answer) => (
                <div key={answer._id} className="flex items-center">
                  <input
                    type="radio"
                    id={`${question._id}-${answer._id}`}
                    name={question._id}
                    value={answer._id}
                    checked={responses[question._id] === answer._id}
                    onChange={() => handleOptionChange(question._id, answer._id)}
                    className="mr-2"
                  />
                  <label htmlFor={`${question._id}-${answer._id}`} className="text-lg">
                    {answer.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
       <div className="flex justify-end">
        <button
          type="submit"
          className="btn bg-emerald-400 text-black text-lg  rounded"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};







// import React, { useEffect, useState } from 'react';
// import { GetQuiz } from '../../api/Routing';


// export const LearnerQuiz = () => {
//         const {id} = useParams();
//         const [quiz, setQuiz] = useState(null);
//         const [responses, setResponses] = useState({});
//         const [loading, setLoading] = useState(true);
//         const [error, setError] = useState(null);
      
//         useEffect(() => {
//           const fetchQuiz = async (id) => {
//             try {
//               const response = await GetQuiz(id);
//               if (response.data.success) {
//                 setQuiz(response.data.data[0]); // Assuming the response contains an array of quizzes
//               }
//             } catch (err) {
//               setError(err);
//             } finally {
//               setLoading(false);
//             }
//           };
      
//           fetchQuiz();
//         }, [id]);
      
//         const handleOptionChange = (questionId, optionId) => {
//           setResponses((prevResponses) => ({
//             ...prevResponses,
//             [questionId]: optionId,
//           }));
//         };
      
//         const handleSubmit = () => {
//           console.log('Responses:', responses);
//           // Implement response submission logic here
//         };
      
//         if (loading) return <div>Loading...</div>;
//         if (error) return <div>Error loading quiz. Please try again later.</div>;
//         if (!quiz) return <div>No quiz found.</div>;
      
//         return (
//           <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
//             <p className="mb-4">{quiz.description}</p>
      
//             <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
//               {quiz.questions.map((question, index) => (
//                 <div key={question._id} className="mb-6">
//                   <div className="text-lg font-semibold mb-2">{index + 1}. {question.text}</div>
//                   <div className="space-y-2">
//                     {question.answers.map((answer) => (
//                       <div key={answer._id} className="flex items-center">
//                         <input
//                           type="radio"
//                           id={`${question._id}-${answer._id}`}
//                           name={question._id}
//                           value={answer._id}
//                           checked={responses[question._id] === answer._id}
//                           onChange={() => handleOptionChange(question._id, answer._id)}
//                           className="mr-2"
//                         />
//                         <label htmlFor={`${question._id}-${answer._id}`} className="text-lg">
//                           {answer.text}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="submit"
//                 className="btn bg-emerald-400 text-black text-lg p-2 rounded"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         );
//       };
      
      
      

