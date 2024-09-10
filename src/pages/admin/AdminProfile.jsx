
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DetailsAdmin } from '../../api/Routing';

//import UserDetails from './UserDetails'; // Assuming you have a UserDetails component

export const AdminProfile = () => {
  const { id } = useParams(); 
  const [Learner, setLearner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLearner = async () => {
      try {
        console.log("admin profil frontend"); 
        let response = await DetailsAdmin(id);
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
      <div className="container mx-auto p-4 relative">
      {/* Profile Picture */}
      <div >
        <img 
          src={Learner.profilepic || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp'} 
          alt="Profile" 
          className="absolute top-0 right-0 w-32 h-32 rounded-full object-cover border-2 border-gray-300"
        />
        
        {/* Profile Details */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
        <ul>
          <li className="border-b py-2">Name: {Learner.name} </li>
          <li className="border-b py-2">Email: {Learner.email} </li>
          <li className="border-b py-2"> Role: {Learner.role}</li>
          <li className="border-b py-2"> Mobile No: {Learner.mobile}</li>
          <li className="border-b py-2"> course:</li>
        </ul>
      </section>

      {/* Actions */}
      <section className="mt-6 flex justify-between"> 
        <div>Updated At :  {Learner.updatedAt}</div>
        <div className=" space-x-4">
          <Link to="edit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Profile</Link>
        </div>
      </section>

      </div>
    </div>
  );
}

