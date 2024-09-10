import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DetailsInstructor, GetStudyplan } from '../../api/Routing';
import { FileText, SquarePlay } from 'lucide-react';

export const InstructorClassroom = () => {
  const { id } = useParams();
  const [Studyplan, setStudyplan] = useState([]);
  const [Course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(id); // Added state for selected course ID
  const navigate= useNavigate();

  const handleClick = (courseId) => {
    setSelectedCourseId(courseId); // Update selected course ID
  };

  useEffect(() => {
    const loadStudyplan = async () => {
      try {
        setLoading(true);
        // Fetch study plan based on the selected course ID
        const response = await GetStudyplan(selectedCourseId);
        setStudyplan(response.data.activities);
        console.log("loadStudyplan", response.data.activities);

        const InstructorId = sessionStorage.getItem('InstructorId');
        console.log("Instructor storage data", InstructorId);

        const Instructor = await DetailsInstructor(InstructorId);
        setCourse(Instructor.data.courses);
        console.log("load courses", Instructor.data.courses);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCourseId) {
      loadStudyplan(); // Call the async function to load data
    }
  }, [selectedCourseId]); // Dependency array includes selectedCourseId

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Studyplan details. Please try again later.</div>;
  if (!Studyplan.length) return <div>No Studyplan found.</div>;


  return (
    
    <div>
      <h1 className=" mb-6 text-center text-2xl font-bold text-green-500" >Instructor ClassRoom</h1>
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
      <div className="relative w-full pb-[56.25%]">
   {/* Video Player */}
   <iframe
    className="absolute inset-0 w-full h-full"
    src="https://www.youtube.com/embed/lJC_sJ6jhDo?list=PLTZYG7bZ1u6pQJShZs9iV0aJNzsqTm4Mx"
    title="YouTube video player"
   // frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
   />
      </div>
   
       <div className="p-4">
         <ul className="space-y-4   ">
            {Studyplan.map((task) => (
                <div className="border rounded-md shadow-sm">
              <li  className="flex items-center justify-between p-4 ">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold dark:text-white">{task.task}</span>
                    <span className="dark:text-white">task: {task.taskDescription} </span>
                   </div>
                  <div className="flex gap-20">
                    <a href={task.pdfUrl} download className="flex items-center">
                    <FileText size={28} color="#fa0000" strokeWidth={1.75} />
                    </a>
                    <a href={task.videoUrl} className="flex items-center">
                    <SquarePlay size={28} color="#fa0000" strokeWidth={1.75} />
                    </a>
                  </div> 
               </li>
             
            </div>
        ))}
          <li className="m-1 flex   justify-between   items-start	"> 
                <Link to="studyplan" className="bg-green-500 text-white px-4 py-2  rounded hover:bg-blue-600">ADD</Link>
                <Link to="studyplan" className="bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600">UPDATE</Link>
                <Link to="studyplan" className="bg-red-500 text-white px-4 py-2  rounded hover:bg-blue-600">DELETE</Link>
               </li>
        </ul>
        </div>
    </div>
  )
}
