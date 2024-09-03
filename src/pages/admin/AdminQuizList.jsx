

import React, { useEffect, useState } from 'react'
import { QuizListGet } from '../../api/Routing';
import { Link } from 'react-router-dom';


export const AdminQuizList = () => {
  const [QuizList, setQuizList] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuizList = async () => {
      try {
        let response = await QuizListGet();
        setQuizList(response.data);
      } catch (error) {
        setError(error);
        console.log(error); 
      } finally {
        setLoading(false);
      }
    };

    loadQuizList(); // Call the async function to load data
  }, []);  
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Studyplan details. Please try again later.</div>;
  if (!QuizList) return <div>No Studyplan found.</div>;

  return (
 
  <div className="p-4">
    <ul className="space-y-4   ">
      {QuizList.map((task,index) => (
       <li  className="p-4 border rounded-md shadow-sm">
        <div className="mt-2 flex flex-col md:flex-row md:justify-between   items-start	 md:space-x-4">
            <div className="dark:text-white mb-2 md:mb-0 pe-11">
                 <div className="text-lg font-semibold dark:text-white">No:  {index+1}
                 </div>
            </div>
            <div className="dark:text-white mb-2 md:mb-0 flex-1">
              <div className="text-lg font-semibold dark:text-white">Topic:  {task.title}
              </div>
            </div>
            <div className="dark:text-white mb-2 md:mb-0 whitespace-normal flex-1">
              <div className="text-lg font-semibold dark:text-white">Description:</div> {task.description}
            </div>
            <div className="dark:text-white mb-2  md:mb-0  md:px-20  md:ml-auto text-right">
               <div className="text-lg font-semibold dark:text-white">
               <button className='btn bg-emerald-400 text-black text-lg'>Start</button>
            </div>
            </div>
        </div>
            <div className="m-1 flex   justify-between   items-start	"> 
                <Link to="edit/66c2ddec1943acbb8bdd9cc1" className="bg-green-500 text-white px-4 py-2  rounded hover:bg-blue-600">ADD</Link>
                <Link to="edit/66c2ddec1943acbb8bdd9cc1" className="bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600">UPDATE</Link>
                <button to="edit/66c2ddec1943acbb8bdd9cc1" className="bg-red-500 text-white px-4 py-2  rounded hover:bg-blue-600">DELETE</button>
           </div>

        
       </li>
      ))}
    </ul>
  </div>
  
  )
}
