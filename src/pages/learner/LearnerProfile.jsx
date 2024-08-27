import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DetailsLearner } from '../../api/Routing';

//import UserDetails from './UserDetails'; // Assuming you have a UserDetails component

export const LearnerProfile = () => {
  const { id } = useParams(); 
  const [Learner, setLearner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLearner = async () => {
      try {
        let response = await DetailsLearner(id);
        setLearner(response.data);
      } catch (error) {
        setError(error);
        console.log(error); 
      } finally {
        setLoading(false);
      }
    };

    loadLearner(); // Call the async function to load data
  }, [id]);  
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading course details. Please try again later.</div>;
  if (!Learner) return <div>No course found.</div>;

    return (
      <div className="container mx-auto p-4">
      
    

      {/* Profile Details */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
        <ul>
          <li className="border-b py-2">Name:{Learner.name} </li>
          <li className="border-b py-2">Email:{Learner.email} </li>
          <li className="border-b py-2"> Mobile No:{Learner.mobile}</li>
          <li className="border-b py-2"> course:</li>
        </ul>
      </section>

      {/* Actions */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        <div className="flex space-x-4">
          <Link to="edit/66c21e5d525f93085956f0ab" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Profile</Link>
          <Link to="/settings" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Settings</Link>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {/* Example content, replace with dynamic content */}
        <ul>
          <li className="border-b py-2">Liked a post about React</li>
          <li className="border-b py-2">Commented on a JavaScript tutorial</li>
          <li className="border-b py-2">Updated profile picture</li>
        </ul>
      </section>
    </div>
  );
}

