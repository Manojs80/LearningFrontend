
import React, { useState, useEffect } from 'react';
import { CourseList, DeleteCourse } from '../../api/Routing';
import { Link } from 'react-router-dom';

export const AdminClassroom = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from the server
  const fetchCourses = async () => {
    try {
      const response = await CourseList();
      setCourses(response.data);
      console.log("Admin fetch course list",response.data);
      
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Delete a course
  const handleDelete = async (id) => {
    try {
      await DeleteCourse(id);
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4 text-green-500 text-center">Course List</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b p-4 text-left text-pink-700">No</th>
            <th className="border-b p-4 text-left text-pink-700">ID</th>
            <th className="border-b p-4 text-left text-pink-700">Title</th>
            <th className="border-b p-4 text-left text-pink-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">No courses available</td>
            </tr>
          ) : (
            courses.map((course, index) => (
              <tr key={course._id} className="hover:bg-gray-100 text-zinc-950">
                <td className="border-b p-4">{index + 1}</td>
                <td className="border-b p-4">{course._id}</td>
                <td className="border-b p-4">{course.title}</td>
                <td className="border-b p-4">
                    <Link
                      to={`${course._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};




// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { GetStudyplan } from '../../api/Routing';
// import { FileText, SquarePlay } from 'lucide-react';

// export const AdminClassroom = () => {

//     const { id } = useParams();
//     const [Studyplan, setStudyplan] = useState(null); 
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       const loadStudyplan = async () => {
//         try {
//           let response = await GetStudyplan(id);
//           setStudyplan(response.data.activities);
//         } catch (error) {
//           setError(error);
//           console.log(error); 
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       loadStudyplan(); // Call the async function to load data
//     }, [id]);  
    
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error loading Studyplan details. Please try again later.</div>;
//     if (!Studyplan) return <div>No Studyplan found.</div>;

//   return (
//     <div>
//       <div className="relative w-full pb-[56.25%]">
//    {/* Video Player */}
//    <iframe
//     className="absolute inset-0 w-full h-full"
//     src="https://www.youtube.com/embed/lJC_sJ6jhDo?list=PLTZYG7bZ1u6pQJShZs9iV0aJNzsqTm4Mx"
//     title="YouTube video player"
//    // frameBorder="0"
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//     allowFullScreen
//    />
//       </div>
   
//        <div className="p-4">
//          <ul className="space-y-4   ">
//             {Studyplan.map((task) => (
//                 <div className="border rounded-md shadow-sm">
//               <li  className="flex items-center justify-between p-4 ">
//                   <div className="flex items-center space-x-4">
//                     <span className="text-lg font-semibold dark:text-white">{task.task}</span>
//                     <span className="dark:text-white">taskDescription: {task.taskDescription} </span>
//                    </div>
//                   <div className="flex gap-20">
//                     <a href={task.pdfUrl} download className="flex items-center">
//                     <FileText size={28} color="#fa0000" strokeWidth={1.75} />
//                     </a>
//                     <a href={task.videoUrl} className="flex items-center">
//                     <SquarePlay size={28} color="#fa0000" strokeWidth={1.75} />
//                     </a>
//                   </div> 
//                </li>
//                <li className="m-1 flex   justify-between   items-start	"> 
//                 <Link to="edit/66c2ddec1943acbb8bdd9cc1" className="bg-green-500 text-white px-4 py-2  rounded hover:bg-blue-600">ADD</Link>
//                 <Link to="edit/66c2ddec1943acbb8bdd9cc1" className="bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600">UPDATE</Link>
//                 <button to="edit/66c2ddec1943acbb8bdd9cc1" className="bg-red-500 text-white px-4 py-2  rounded hover:bg-blue-600">DELETE</button>
//                </li>
//             </div>
//         ))}
//         </ul>
//         </div>
//     </div>
//   )
// }
