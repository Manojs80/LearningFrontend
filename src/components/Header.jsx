import React, { useState } from 'react'
import { ThemeMode } from './ThemeMode'
import { Link } from 'react-router-dom'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to handle open/close state
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
<div className="navbar bg-base-100 "
    style={{ marginBottom: isOpen ? '0' : '2rem' }}
> 

  <div className="navbar-start">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
       </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link to="/home">Home</Link></li>
        <li>
          <a>Courses</a>
          <ul className="p-2">
          <li><Link to="/Learner">Learner</Link></li>
          <li><Link to="/Instructor">Instructor</Link></li> 
          <li><Link to="/Admin">Admin</Link></li> 
          </ul>
        </li>
        <li><Link to="/login">Login</Link></li>
      <li><Link to="/SignUp">SignUp</Link></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">LEARNING DASHBOARD</a>
  </div>

  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/home">Home</Link></li>
      <li>
        <details  open={isOpen} // Control the open state
        onClick={handleToggle} // Toggle state on click
         >
          <summary>Courses</summary>
          <ul className="p-1">
          <li><Link to="/Learner">Learner</Link></li>
           <li><Link to="/Instructor">Instructor</Link></li>
           <li><Link to="/Admin">Admin</Link></li>   
          </ul>
        </details>
      </li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/SignUp">SignUp</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <ThemeMode/>
    
    <button className=" btn bg-blue-700 hover:bg-blue-500  font-bold">
      <Link to="/contact">Contact Us</Link> 
      </button>
  </div>
</div>
   
    </>
  )
}
