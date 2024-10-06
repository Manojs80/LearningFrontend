
import React, { useState, useEffect } from 'react';
import { CourseList } from '../../api/Routing';
import { Link } from 'react-router-dom';

export const AdminQuizList = () => {
    
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
  
  
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    return (
      <div className="container mx-auto p-5">
       <h1 className="text-2xl font-bold text-green-500 mb-4 text-center">Quiz List</h1>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="border-b p-4 text-left text-pink-700">No</th>
              <th className="border-b p-4 text-left text-pink-700">Course ID</th>
              <th className="border-b p-4 text-left text-pink-700">Course</th>
              <th className="border-b p-4 text-left text-pink-700">Quizzes</th>
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
                      
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };







// import React, { useState, useEffect } from 'react';
// import { CourseList} from '../../api/Routing';
// import { Link } from 'react-router-dom';

// export const AdminQuizList = () => {
    
    
//         const [courses, setCourses] = useState([]);
      
//         // Fetch courses from the server
//         const fetchCourses = async () => {
//           try {
//             const response = await CourseList();
//             setCourses(response.data);
//             console.log("Admin fetch course list",response.data);
            
//           } catch (error) {
//             console.error('Error fetching courses:', error);
//           }
//         };
      
     
      
//         useEffect(() => {
//           fetchCourses();
//         }, []);
      
//         return (
//           <div className="container mx-auto p-5">
//             <h1 className="text-2xl font-bold mb-4 text-center">Assignments</h1>
//             <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="border-b p-4 text-left text-pink-700">No</th>
//                   <th className="border-b p-4 text-left text-pink-700">Course ID</th>
//                   <th className="border-b p-4 text-left text-pink-700">Course</th>
//                   <th className="border-b p-4 text-left text-pink-700">Assignment</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {courses.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-center py-4">No courses available</td>
//                   </tr>
//                 ) : (
//                   courses.map((course, index) => (
//                     <tr key={course._id} className="hover:bg-gray-100 text-zinc-950">
//                       <td className="border-b p-4">{index + 1}</td>
//                       <td className="border-b p-4">{course._id}</td>
//                       <td className="border-b p-4">{course.title}</td>
//                       <td className="border-b p-4">
//                           <Link
//                             to={`${course._id}`}
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
//                           >
//                             View
//                           </Link>
                         
//                         </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         );
//       };
