import React from 'react'
import { ThemeMode } from './ThemeMode'
import { useNavigate } from 'react-router-dom';
import { Logout } from '../api/Routing';
import { toast } from 'react-toastify';




export const LearnerHeader = () => {

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Logout();
     //  Remove the Quiz item from state after deletion
     document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
     toast.success("Success");
      console.log('logout succesfully');
      navigate('/login')
    } catch (error) {
      console.error('Error in logout:', error);
    }
  };
    const defaultImage = "https://icons.veryicon.com/png/o/miscellaneous/standard/user-274.png"
   //const imageSrc =  instructor.image || defaultImage ;
  
  return (
    <div className="navbar bg-base-100"> 

    <div className="navbar-start ">
      <div className="hidden md:block ">
      <img
          src= "https://icons.veryicon.com/png/o/miscellaneous/standard/user-274.png"
          alt= "Profile"
          className="w-10 bg-blue-300 h-10 rounded-full border-2 border-white"
        /> 
      </div>
      <div className=" block sm:hidden">        
      <ThemeMode/>
      </div>
    </div>
  
    <div className="navbar-center ">
    <div>
      <h1 className=" text-2xl font-extrabold md:text-4xl">LEARNING DASHBOARD</h1>
    </div>
    </div>
    <div className="navbar-end flex items-center gap-2 ">
    <div className="hidden sm:block ">        
      <ThemeMode/>
      </div>
      <button onClick={() => handleClick()} className=" btn bg-red-600 font-bold">
          Log Out 
      
      </button>   
    </div>
  </div>
  )
}


  //<a className="btn btn-bg-primary">Log Out</a>