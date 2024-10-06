
import React, { useEffect, useState } from 'react'
import { AssignmentList, DeleteAssignment } from '../../api/Routing';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingPage } from '../../LoadingPage';


export const AdminAssignmentsDetails = () => {
     
  const { id } = useParams();
  const [Assignment, setAssignment] = useState([]);
  const [Ci, setCi] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("Loading assignment list...id1",selectedCourseId);
  const [refresh, setRefresh] = useState(false);
    // Delete an assignmen
    const handleDelete = async (id) => {
      console.log(" Delete an assignmen",id);    
     try {
       await DeleteAssignment(id); // Adjust this function to your API
       toast.success('Assignment deleted successfully.');
       setRefresh((prev) => !prev); // Trigger a re-fetch
     } catch (error) {
      console.error('Error deleting assignment:', error);
      toast.error('Failed to delete assignment.');
     }
 };
 
useEffect(() => {
  const loadAssignment = async () => {
    setLoading(true); // Ensure loading is set to true at the start

    try {
      let response = await AssignmentList(selectedCourseId);
      
      if (response.success) {
        if (response.data.length > 0) {
          // Accessing the first item in the data array and then getting activities
          setAssignment(response.data[0].activities);  
          console.log("load courses setAssignment",response.data[0].activities );     
          setCi(response.data[0]);
          console.log("loadAssignment setCi", response.data[0]);

        
        } else {
          // Handle case where there are no assignments
          setAssignment([]); // Clear previous assignments
          toast.info('No assignments found for the selected course.'); // Using info toast for no results
        }
      } else {
        // Handle cases where the response is not successful
        toast.error('Failed to fetch assignments.');
      }
    } catch (error) {
      
      console.error(error);
   
    } finally {
      setLoading(false);
    }
  };

  if (selectedCourseId) {
    loadAssignment(); // Call the async function to load data
  }

  // Clear data if course ID changes
  return () => {
    setAssignment([]);
    setCi({});
  };
}, [selectedCourseId, refresh]); // Dependency array includes selectedCourseId

  
  if (loading) return <div><LoadingPage/></div>;
   if (error) return <div>Error loading Assignment details. Please try again later.</div>;
  if (!Assignment) return <div>No Assignment found.</div>;
    

  return (
  <div className="p-4">
    
     <h2 className="text-xl font-semibold text-blue-500">Courses</h2>
   
      <div className="bg-green-800 text-center text-blue font-bold my-5 p-2">
      Selected:
        <h1 className="text-zinc-950 text-2xl">{selectedCourseId}</h1>
        </div>
        {Assignment.length === 0 ? (
        <div className="text-center my-6">
          <h1 className="text-zinc-950 bg-white m-1 text-2xl">No assignments found for the selected course.</h1>
          <Link 
            to={`/Admin/assignmetAdd/${selectedCourseId}`} 
            className="bg-green-500 text-white m-1 px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Assignment
          </Link>
        </div>
      ) : (
        
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
         
           
         </li>
         

    ))} 
     <div className="m-1 flex   justify-between"> 
           <Link to={`/Admin/assignmetChange/${selectedCourseId}`} className="bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600">CHANGE</Link>          
           <button
              onClick={() => handleDelete(Ci.course)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
             >
               Delete
             </button>
           </div>
    </ul>
    )}
  </div>
  )
}
