import React, { useEffect, useState } from 'react';
import { AssignmentList, DeleteAssignment, DetailsInstructor } from '../../api/Routing';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingPage } from '../../LoadingPage';

export const InstructorAssignment = () => {
  const { id } = useParams();
  const [Assignment, setAssignment] = useState([]);
  const [Ci, setCi] = useState([]);
  const [Course, setCourse] = useState([]); 
  const [selectedCourseId, setSelectedCourseId] = useState(id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const handleClick = (courseId) => {
    setSelectedCourseId(courseId); // Update selected course ID
  };

  const loadAssignment = async () => {
    setLoading(true);
    try {
      let response = await AssignmentList(selectedCourseId);
      if (response.success) {
        if (response.data.length > 0) {
          setAssignment(response.data[0].activities);  
          setCi(response.data[0]);
          const instructorId = sessionStorage.getItem('InstructorId');
          const instructor = await DetailsInstructor(instructorId);
          setCourse(instructor.data.courses);
        } else {
          setAssignment([]);
          toast.info('No assignments found for the selected course.');
        }
      } else {
        toast.error('Failed to fetch assignments.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching assignments.');
    } finally {
      setLoading(false);
    }
  };

  const DeleteClick = async (id) => {
    try {
      await DeleteAssignment(id);
      toast.success('Assignment deleted successfully!');
      loadAssignment(); // Refresh assignments after deletion
    } catch (error) {
      console.error('Error deleting assignment:', error);
      toast.error('Error deleting assignment.');
    }
  };

  useEffect(() => {
    loadAssignment(); // Load assignments on component mount
    return () => {
      setAssignment([]);
      setCi({});
    };
  }, [selectedCourseId]);

  if (loading) return <LoadingPage />;
  if (error) return <div>Error loading Assignment details. Please try again later.</div>;
  if (!Assignment) return <div>No Assignment found.</div>;

  return (
    <div className="p-4">
      <h1 className=" mb-6 text-center text-2xl font-bold text-green-500">Instructor Assignment</h1>
      <h2 className="text-xl font-semibold text-blue-500">Courses</h2>
      {Course.map((task, index) => (
        <div className="flex flex-col p-4 mx-12" key={index}>
          <button onClick={() => handleClick(task)} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {index + 1}: {task}
          </button>
        </div>
      ))}
      <div className="bg-green-800 text-center text-blue font-bold my-5 p-2">
        Selected:
        <h1 className="text-zinc-950 text-2xl">{selectedCourseId}</h1>
      </div>
      {Assignment.length === 0 ? (
        <div className="text-center my-6">
          <h1 className="text-zinc-950 bg-white m-1 text-2xl">No assignments found for the selected course.</h1>
          <Link to={`/instructor/assignmetAdd/${selectedCourseId}`} className="bg-green-500 text-white m-1 px-4 py-2 rounded hover:bg-blue-600">
            Add Assignment
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {Assignment.map((row, index) => (
            <li className="p-4 border rounded-md shadow-sm" key={row.id}>
              <div className="mt-2 flex flex-col md:flex-row md:justify-between items-start md:space-x-4">
                <div className="dark:text-white mb-2 md:mb-0 pe-11">
                  <div className="text-lg font-semibold dark:text-white">No: {index + 1}</div>
                </div>
                <div className="dark:text-white mb-2 md:mb-0 flex-1">
                  <div className="text-lg font-semibold dark:text-white">Title:</div> {row.task}
                </div>
                <div className="dark:text-white mb-2 md:mb-0 whitespace-normal flex-1">
                  <div className="text-lg font-semibold dark:text-white">Description:</div> {row.description}
                </div>
                <div className="dark:text-white mb-2 md:mb-0 md:px-20 md:ml-auto text-right">
                  <div className="text-lg font-semibold dark:text-white">Due Date:</div>{row.dueDate}
                </div>
              </div>
            </li>
          ))}
          <div className="m-1 flex justify-between items-start"> 
            <button onClick={() => DeleteClick(selectedCourseId)} className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600">
              Delete
            </button>
            <Link to={`/instructor/${selectedCourseId}/assignmetChange`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              CHANGE
            </Link>          
          </div> 
        </ul>
      )}
    </div>
  );
};
