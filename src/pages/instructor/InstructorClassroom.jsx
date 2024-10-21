import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DeleteStudyplan, DetailsInstructor, GetStudyplan } from '../../api/Routing';
import { FileText, SquarePlay } from 'lucide-react';
import { LoadingPage } from '../../LoadingPage';
import { toast } from 'react-toastify';

export const InstructorClassroom = () => {
  const { id } = useParams();
  const [Studyplan, setStudyplan] = useState([]);
  const [Course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(id); // Added state for selected course ID
  const [currentVideoUrl, setCurrentVideoUrl] = useState('https://www.youtube.com/embed/lJC_sJ6jhDo'); // Default video URL
  const navigate = useNavigate();

  const loadStudyplan = async () => {
    try {
      setLoading(true);
      const response = await GetStudyplan(selectedCourseId);

      if (response.data && response.data.activities) {
        console.log("StudyplanId", response.data._id);
        setStudyplan(response.data.activities);
        console.log("loadStudyplan", response.data.activities);
      } else {
        setStudyplan([]); // Set study plan to an empty array or null as needed
        toast.info("No study plan available for the selected course."); // Show a message
        console.log("No study plan found.");
      }

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

  const handleClick = (courseId) => {
    setSelectedCourseId(courseId); // Update selected course ID
  };

  const deleteStudyplan = async (courseId) => {
    try {
      const response = await DeleteStudyplan(courseId);
      toast.success(response.message); // Show success message
      setTimeout(async () => {
        await loadStudyplan(); // Reload study plan after deletion
      }, 5000); // Delay of 5 seconds
    } catch (error) {
      console.error("Error deleting study plan:", error.response?.data.message || error.message);
      toast.error(error.response?.data.message || "Error deleting study plan");
    }
  };

  const handleVideoChange = (videoUrl) => {
    setCurrentVideoUrl(videoUrl); // Update the video URL state
  };

  useEffect(() => {
    if (selectedCourseId) {
      loadStudyplan(); // Call the async function to load data
    }
  }, [selectedCourseId]); // Dependency array includes selectedCourseId

  if (loading) return <LoadingPage />;
  if (error) return <div>Error loading Studyplan details. Please try again later.</div>;

  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-bold text-green-500">Instructor ClassRoom</h1>
      <h2 className="text-xl font-semibold text-blue-500">Courses</h2>
      {Course.map((task, index) => (
        <div className="flex flex-col p-4 mx-12" key={index}>
          <button onClick={() => handleClick(task)} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {index + 1} : {task}
          </button>
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
          src={currentVideoUrl} // Use the current video URL from state
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="p-4">
        <ul className="space-y-4">
          {Studyplan.map((task) => (
            <div className="border rounded-md shadow-sm" key={task.id}>
              <li className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold dark:text-white">{task.task}</span>
                  <span className="dark:text-white">task: {task.taskDescription} </span>
                </div>
                <div className="flex gap-20">
                <a 
                 href={task.pdfNote} 
                 download 
                 target="_blank" 
                       rel="noopener noreferrer" 
                className="flex items-center"
                 >
                  <FileText size={28} color="#fa0000" strokeWidth={1.75} />
                </a>
                  <button 
                    onClick={() => handleVideoChange(task.videoUrl)} // Change video on click
                    className="flex items-center"
                  >
                    <SquarePlay size={28} color="#fa0000" strokeWidth={1.75} />
                  </button>
                </div>
              </li>
            </div>
          ))}
          <li className="m-1 flex justify-between items-start">
            <Link to="studyplan" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600">STUDY PLAN</Link>
            <button 
              onClick={() => deleteStudyplan(selectedCourseId)} 
              className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <Link to={`studyplan/${selectedCourseId}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-400">CHANGES</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
