import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuizListGet } from '../../api/Routing';
import { LoadingPage } from '../../LoadingPage';

export const LearnerQuizList = () => {
  const {id} = useParams();
  console.log("Loading quiz list...id",id);
  const [QuizList, setQuizList] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const handleClick = async (id) => {
    try {
      console.log("quiz start",id);
        
        navigate(`/learner/quiz/${id}`); 
      
    } catch (error) {
      console.error(error);
    }
  };
  
    
  useEffect(() => {
    const fetchQuizList = async () => {
      console.log("Loading quiz list...id", id);
      try {
        const response = await QuizListGet(id);
        console.log("Quiz list loaded successfully.");
        setQuizList(response.data);
      }catch (error) {
        setError(error);
        console.log(error); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuizList();
  }, [id]);
 

   if (loading) return <div><LoadingPage/></div>;
   if (error) return <div>Error loading Quiz details. Please try again later.</div>;
   if (QuizList.length === 0) return <div>No Quiz found.</div>;

  return (
    <div className="p-4">
      <h1 className=" mb-6 text-center text-2xl font-bold text-green-500" >Learners Quiz</h1>
      <ul className="space-y-4">
        {QuizList.map((task, index) => (
          <li key={task._id || index} className="p-4 border rounded-md shadow-sm">
            <div className="mt-2 flex flex-col md:flex-row md:justify-between items-start md:space-x-4">
              <div className="dark:text-white mb-2 md:mb-0 pe-11">
                <div className="text-lg font-semibold dark:text-white">No: {index + 1}</div>
              </div>
              <div className="dark:text-white mb-2 md:mb-0 flex-1">
                <div className="text-lg font-semibold dark:text-white">Topic: {task.title}</div>
              </div>
              <div className="dark:text-white mb-2 md:mb-0 whitespace-normal flex-1">
                <div className="text-lg font-semibold dark:text-white">Description:</div> {task.description}
              </div>
              <div className="dark:text-white mb-2 md:mb-0 md:px-20 md:ml-auto text-right">
                <div className="text-lg font-semibold dark:text-white">
                  <button className="btn bg-emerald-400 text-black text-lg" 
                   onClick={() => handleClick(task._id)}>
                    Start
                    </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
