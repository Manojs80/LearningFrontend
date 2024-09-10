
import React, { useEffect, useState } from 'react'
import { DeleteQuiz, DetailsInstructor, QuizListGet } from '../../api/Routing';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export const InstructorQuizList = () => {
  const {id} = useParams();
  console.log("Loading quiz list...id1",id);
  const [QuizList, setQuizList] = useState([]);
  const [Course, setCourse] = useState([]); 
  const [selectedCourseId, setSelectedCourseId] = useState(id); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleCourse = (courseId) => {
    setSelectedCourseId(courseId); // Update selected course ID
  };

  const handleClick = async (id) => {
    try {
      await DeleteQuiz(id);
     //  Remove the Quiz item from state after deletion
      setQuizList(QuizList.filter(item => item._id !== id));
      console.log('Quiz deleted!', id);
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  useEffect(() => {
    const loadQuizList = async () => {
      setLoading(true);
      console.log("Loading quiz list...id2", id);
      try {
        let response = await QuizListGet(selectedCourseId);
        if (response.success) {
          if (response.data.length > 0) {
        console.log("Quiz list loaded successfully.");
        setQuizList(response.data);

        const instructorId = sessionStorage.getItem('InstructorId');
        console.log("Instructor storage data", instructorId);

        const instructor = await DetailsInstructor(instructorId);
        setCourse(instructor.data.courses);
        console.log("load courses", instructor.data.courses);

      }else {
        // Handle case where there are no assignments
        setQuizList([]); // Clear previous assignments
        toast.info('No assignments found for the selected course.'); // Using info toast for no results
      }
     }else {
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
      loadQuizList(); 
    }
    return () => {
      setQuizList([]);
     
    };
  }, [selectedCourseId]);   
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Studyplan details. Please try again later.</div>;
  if (!QuizList) return <div>No Studyplan found.</div>;

  return (
 
  <div className="p-4">
      <h1 className=" mb-6 text-center text-2xl font-bold text-green-500" >Instructor Quiz</h1>
       
      <h2 className="text-xl font-semibold text-blue-500">Courses</h2>
      
     {Course.map((row,index) => (
        <div className="flex flex-col p-4 mx-12">
      <button onClick={() => handleCourse(row)} className="bg-pink-500 text-white px-4 py-2  rounded hover:bg-blue-600">{index+1} : {row}</button>
      </div>
       ))}
       <div className="bg-green-800 text-center text-blue font-bold my-5 p-2">
      Selected:
        <h1 className="text-zinc-950 text-2xl">{selectedCourseId}</h1>
        </div>

        {QuizList.length === 0 ? (
        <div className="text-center my-6">
          <h1 className="text-zinc-950 bg-white m-1 text-2xl">No Quiz found for the selected course.</h1> 
          <Link 
           to={`/instructor/quizAdd/${selectedCourseId}`} 
          className="bg-green-500 text-white m-1 px-4 py-2 rounded hover:bg-blue-600"
           >
           Add Quiz
          </Link>
      
        </div>
      ) : (
     
    <ul className="space-y-4   ">
          <div className="text-center my-6">
        <Link 
        to={`/instructor/quizAdd/${selectedCourseId}`} 
        className="bg-green-500 text-white m-1 px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Quiz
      </Link>
      </div>

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
        <div className="mt-2 flex flex-col md:flex-row md:justify-between md:space-x-4">
            <div className="dark:text-white mb-2 md:mb-0">
            <div className="text-lg font-semibold dark:text-white mb-2 md:mb-0">
             Course ID: </div> {task.course}
             </div>
            <div className="dark:text-white mb-2 md:mb-0">
            <div className="text-lg font-semibold dark:text-white mb-2 md:mb-0">
              Instructor ID: </div>{task.instructor}
            </div>
           </div>
           <div className="m-1 flex   justify-end "> 
           <Link to={`/instructor/quizChange/${task._id}`} className="bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600">CHANGE</Link>          
           </div>

        
       </li>
      ))}
    </ul>
      )}
  </div>
  
  )
}

/*
if(instructorId){ toast.error('An error occurred while fetching assignments.');}
<div className="mt-2 flex flex-col md:flex-row md:justify-between md:space-x-4">
            <div className="dark:text-white mb-2 md:mb-0">
            <div className="text-lg font-semibold dark:text-white mb-2 md:mb-0">
             Course ID: </div> {task.course}
             </div>
            <div className="dark:text-white mb-2 md:mb-0">
            <div className="text-lg font-semibold dark:text-white mb-2 md:mb-0">
              Instructor ID: </div>{task.instructor}
            </div>
           </div>
*/