

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { DeleteLearner, LearnerList } from '../../api/Routing';

export const AdminLearners = () => {
  
  
    const [Learners, setLearners] = useState([]);
  
    // Fetch instructors from the server
    const fetchLearners = async () => {
      try {
        const response = await LearnerList(); // Adjust this function to your API
        setLearners(response.data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };
  
    // Delete an instructor
    const handleDelete = async (id) => {
      try {
        await DeleteLearner(id); // Adjust this function to your API
        setLearners(Learners.filter(Learner => Learner._id !== id));
      } catch (error) {
        console.error('Error deleting instructor:', error);
      }
    };
  
    useEffect(() => {
      fetchLearners();
    }, []);
  
    return (
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold mb-4 text-center">Learners List</h1>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 ">
            <tr>
              <th className="border-b p-4 text-left text-pink-700">No</th>
              <th className="border-b p-4 text-left text-pink-700">Image</th>
              <th className="border-b p-4 text-left text-pink-700">ID</th>
              <th className="border-b p-4 text-left text-pink-700">Name</th>
              <th className="border-b p-4 text-left text-pink-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Learners.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">No Learners available</td>
              </tr>
            ) : (
              Learners.map((Learner, index) => (
                <tr key={Learner._id} className="hover:bg-gray-100 text-zinc-950">
                  <td className="border-b p-4">{index + 1}</td>
                  <td className="border-b p-4">
                    <img src={Learner.profilepic} alt={Learner.name} className="w-16 h-16 object-cover rounded-full" />
                  </td>
                  <td className="border-b p-4">{Learner._id}</td>
                  <td className="border-b p-4">{Learner.name}</td>
                  <td className="border-b p-4">
                    <Link
                      to={`${Learner._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(Learner._id)}
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
  }
