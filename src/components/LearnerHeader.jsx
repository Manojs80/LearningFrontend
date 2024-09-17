import React, { useEffect, useState } from 'react';
import { ThemeMode } from './ThemeMode';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailsAdmin, DetailsInstructor, DetailsLearner, Logout } from '../api/Routing';
import { toast } from 'react-toastify';

export const LearnerHeader = () => {
  const { id } = useParams();
  const [Learner, setLearner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        let response;

        // Try to fetch instructor data
        response = await DetailsInstructor(id);

        // If no response for instructor, try fetching learner data
        if (!response || !response.data) {
          response = await DetailsLearner(id);
        }

        // If no response for learner, try fetching admin data
        if (!response || !response.data) {
          response = await DetailsAdmin(id);
        }

        // Check if a valid response was received
        if (response && response.data) {
          setLearner(response.data);
          console.log("response.data", response.data);
        } else {
          console.error("No data found for the given ID");
        }
      } catch (error) {
        console.log("Error loading data", error);
      }
    };

    loadData();
  }, []);

  const handleClick = async () => {
    try {
      await Logout();
      // Remove the token from cookies
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      toast.success("Logged out successfully");
      console.log('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="navbar dark:bg-red-600">
      <div className="navbar-start ">
        <div className="hidden md:block">
          <img
            src={Learner?.profilepic || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp'}
            alt="Profile"
            className="w-12 rounded-full object-cover border-2 border-gray-300"
          />
        </div>
        <div className="block sm:hidden">
          <ThemeMode />
        </div>
      </div>

      <div className="navbar-center">
        <div>
          <h1 className="text-2xl  font-extrabold md:text-4xl">LEARNING DASHBOARD</h1>
        </div>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <div className="hidden sm:block">
          <ThemeMode />
        </div>
        <button onClick={handleClick} className="btn bg-red-600 font-bold">
          Log Out
        </button>
      </div>
    </div>
  );
};
