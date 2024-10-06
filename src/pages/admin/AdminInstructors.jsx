

import React, { useState, useEffect } from 'react';
import { DeleteInstructor, InstructorList } from '../../api/Routing';
import { Link } from 'react-router-dom';


export const AdminInstructors = () => {
  
  const [instructors, setInstructors] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // Fetch instructors from the server
  const fetchInstructors = async () => {
    try {
      const response = await InstructorList(); // Adjust this function to your API
      setInstructors(response.data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  // Delete an instructor
  const handleDelete = async (id) => {
    try {
      await DeleteInstructor(id); // Adjust this function to your API
      setRefresh((prev) => !prev); // Trigger a re-fetch
    } catch (error) {
      console.error('Error deleting instructor:', error);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, [refresh]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4 text-green-500 text-center">Instructors List</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b p-4 text-left text-pink-700">No</th>
            <th className="border-b p-4 text-left text-pink-700">Image</th>
            <th className="border-b p-4 text-left text-pink-700">ID</th>
            <th className="border-b p-4 text-left text-pink-700">Name</th>
            <th className="border-b p-4 text-left text-pink-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">No instructors available</td>
            </tr>
          ) : (
            instructors.map((instructor, index) => (
              <tr key={instructor._id} className="hover:bg-gray-100 text-zinc-950">
                <td className="border-b p-4">{index + 1}</td>
                <td className="border-b p-4">
                  <img src={instructor.profilepic} alt={instructor.name} className="w-16 h-16 object-cover rounded-full" />
                </td>
                <td className="border-b p-4">{instructor._id}</td>
                <td className="border-b p-4">{instructor.name}</td>
                <td className="border-b p-4">
                  <Link
                    to={`${instructor._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(instructor._id)}
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
