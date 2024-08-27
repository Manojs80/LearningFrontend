import React from 'react'
import { useNavigate } from 'react-router-dom';


export const ErrorPage = () => {

    const navigate = useNavigate(); // To handle navigation

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Something went wrong. The page you’re looking for doesn’t exist or there was an error.
        </p>
        <button 
          onClick={handleGoHome} 
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Go to Home
        </button>
      </div>
    </div>
  )
}
