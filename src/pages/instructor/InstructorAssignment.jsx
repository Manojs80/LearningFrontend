
import React, { useEffect, useState } from 'react'
import { GetAssignment } from '../../api/Routing';
import { Link, useParams } from 'react-router-dom';


export const InstructorAssignment = () => {
     
  const { id } = useParams();
  const [Assignment, setAssignment] = useState([]);
  const [Ci, setCi] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const loadAssignment = async () => {
      try {
        let response = await GetAssignment(id);
        setAssignment(response.data.activities);
        setCi(response.data)
        console.log("loadAssignment",response.data.activities);
        
      } catch (error) {
        setError(error);
        console.log(error); 
      } finally {
        setLoading(false);
      }
    };

    loadAssignment(); // Call the async function to load data
  },[] );  
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Assignment details. Please try again later.</div>;
  if (!Assignment) return <div>No Assignment found.</div>;
    

  return (
  <div className="p-4">
    <ul className="space-y-4   ">
      {Assignment.map((row,index) =>( 
        <li className="p-4 border rounded-md shadow-sm">
          <div className="mt-2 flex flex-col md:flex-row md:justify-between   items-start	 md:space-x-4">
           <div className="dark:text-white mb-2 md:mb-0 pe-11">
             <div className="text-lg font-semibold dark:text-white">No:  {index+1}</div>
           </div>
           <div className="dark:text-white mb-2 md:mb-0 flex-1">
            <div className="text-lg font-semibold dark:text-white">Title:</div> {row.task}
           </div>
           <div className="dark:text-white mb-2 md:mb-0 whitespace-normal flex-1">
            <div className="text-lg font-semibold dark:text-white">Description:</div> {row.description}
            </div>
           <div className="dark:text-white mb-2  md:mb-0  md:px-20  md:ml-auto text-right">
            <div className="text-lg font-semibold dark:text-white">
             Due Date: </div>{row.dueDate}
           </div>
          </div>
          <div className="mt-2 flex flex-col md:flex-row md:justify-between md:space-x-4">
            <div className="dark:text-white mb-2 md:mb-0">
            <div className="text-lg font-semibold dark:text-white mb-2 md:mb-0">
             Course ID: </div>{Ci.course}
             </div>
            <div className="dark:text-white mb-2 md:mb-0">
            <div className="text-lg font-semibold dark:text-white mb-2 md:mb-0">
              Instructor ID: </div>{Ci.instructor}
            </div>
           </div>
           <div className="m-1 flex   justify-between   items-start	"> 
                <Link to="assignmetAdd" className="bg-green-500 text-white px-4 py-2  rounded hover:bg-blue-600">ADD</Link>
                <Link to="assignmet/66d552db2b47076d37d8ed64" className="bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600">UPDATE</Link>
                <button to="assignmet" className="bg-red-500 text-white px-4 py-2  rounded hover:bg-blue-600">DELETE</button>
           </div>
         </li>
    ))}  
    </ul>
  </div>
  )
}
