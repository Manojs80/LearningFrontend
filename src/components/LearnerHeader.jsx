import React from 'react'
import { ThemeMode } from './ThemeMode'
import { Link } from 'react-router-dom'



export const LearnerHeader = () => {
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
      <button className=" btn bg-red-600 font-bold">
      <Link to="/login">Log Out</Link> 
      </button>   
    </div>
  </div>
  )
}


  //<a className="btn btn-bg-primary">Log Out</a>