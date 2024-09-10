
import React, { useEffect, useState } from 'react'
import { AssignmentList, DetailsInstructor, GetAssignment } from '../../api/Routing';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export const InstructorAssignment = () => {
     
  const { id } = useParams();
  const [Assignment, setAssignment] = useState([]);
  const [Ci, setCi] = useState([]);
  const [Course, setCourse] = useState([]); 
  const [selectedCourseId, setSelectedCourseId] = useState(id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("Loading assignment list...id1",selectedCourseId);
  const handleClick = (courseId) => {
    setSelectedCourseId(courseId); // Update selected course ID
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

          const instructorId = sessionStorage.getItem('InstructorId');
          console.log("Instructor storage data", instructorId);

          const instructor = await DetailsInstructor(instructorId);
          setCourse(instructor.data.courses);
          console.log("load courses", instructor.data.courses);
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
      if(instructorId){ toast.error('An error occurred while fetching assignments.');}
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
}, [selectedCourseId]); // Dependency array includes selectedCourseId

  
  if (loading) return <div>Loading...</div>;
   if (error) return <div>Error loading Assignment details. Please try again later.</div>;
  if (!Assignment) return <div>No Assignment found.</div>;
    

  return (
  <div className="p-4">
     <h1 className=" mb-6 text-center text-2xl font-bold text-green-500" >Instructor Assignment</h1>
     <h2 className="text-xl font-semibold text-blue-500">Courses</h2>
     {Course.map((task,index) => (
        <div className="flex flex-col p-4 mx-12">
      <button onClick={() => handleClick(task)} className="bg-pink-500 text-white px-4 py-2  rounded hover:bg-blue-600">{index+1} : {task}</button>
      </div>
       ))}
      <div className="bg-green-800 text-center text-blue font-bold my-5 p-2">
      Selected:
        <h1 className="text-zinc-950 text-2xl">{selectedCourseId}</h1>
        </div>
        {Assignment.length === 0 ? (
        <div className="text-center my-6">
          <h1 className="text-zinc-950 bg-white m-1 text-2xl">No assignments found for the selected course.</h1>
          <Link 
            to={`/instructor/assignmetAdd/${selectedCourseId}`} 
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
           <div className="m-1 flex   justify-end "> 
           <Link to={`/instructor/assignmetAdd/${selectedCourseId}`} className="bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600">CHANGE</Link>          
           </div>
         </li>

    ))}  
    </ul>
    )}
  </div>
  )
}

/*
<div className="m-1 flex   justify-end "> 
                <Link to="assignmet/66d552db2b47076d37d8ed64" className="bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600">CHANGE</Link>          
           </div>

*/

// useEffect(() => {
//   const loadAssignment = async () => {
//     console.log("Loading assignment list...id2",id);
//     try {
//       let response = await AssignmentList(id);
//       if (response.success && response.data.length > 0) 
//         {
//         // Accessing the first item in the data array and then getting activities
//         setAssignment(response.data[0].activities);       
//       setCi(response.data[0])
//       console.log("loadAssignment",response.data.activities);
//         }
//     } catch (error) {
//       setError(error);
//       console.log(error); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadAssignment(); // Call the async function to load data
// },[] );