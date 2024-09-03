

import React, { useEffect, useState } from 'react'
import { AssignmentList } from '../../api/Routing';
import { Link } from 'react-router-dom';


export const AdminAssignment = () => {
     
    
  const [Assignment, setAssignment] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const loadAssignment = async () => {
      try {
        let response = await AssignmentList();
        setAssignment(response.data);
        console.log(response.data);
        
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
      {Assignment.map((row, index) =>( 
        <li className="p-4 border rounded-md shadow-sm">
          <div className="mt-2 flex flex-col md:flex-row md:justify-between   items-start	 md:space-x-4">
           <div className="dark:text-white mb-2 md:mb-0 pe-11">
             <div className="text-lg font-semibold dark:text-white">No:  {index+1}</div>
           </div>
           <div className="dark:text-white mb-2 md:mb-0 flex-1">
            <div className="text-lg font-semibold dark:text-white">Title:</div> {row.course}
           </div>
           <div className="dark:text-white mb-2 md:mb-0">
            <div className="text-lg font-semibold dark:text-white mb-2 md:mb-0">
              Instructor ID: </div>{row.instructor}
            </div>
           
          </div>
          <div className="mt-2 flex flex-col md:flex-row md:justify-between md:space-x-4"> 
           </div>
           <div className="m-1 flex  items-end	"> 
                <Link to={`assignment/${row._id}`} className="bg-green-500 text-white px-4 py-2  rounded hover:bg-blue-600">Know More</Link>     
           </div>
         </li>
    ))}  
    </ul>
  </div>
  )
}
