import React from 'react'
import { ThemeMode } from './ThemeMode'
import { Link } from 'react-router-dom'


export const LearnerHeader = () => {
  return (
    <div className="navbar bg-base-100"> 

    <div className="navbar-start ">
      <div className="hidden md:block ">
        pic 
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