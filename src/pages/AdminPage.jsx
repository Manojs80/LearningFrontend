  
    
 import React, { useState } from 'react'
 import { Footer } from '../components/Footer'
 import { Link, Outlet } from 'react-router-dom'
 import { LearnerHeader } from '../components/LearnerHeader'
 import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
 
 export const AdminPage = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 
     const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
   return (
     <div>
       <LearnerHeader/>
       <aside
           className={`fixed top-20 left-0 w-48 h-auto border-2 border-dashed border-cyan-400 transition-transform transform ${
             isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
           } `}
         >
           <div className="p-4">
             <h2 className="text-2xl font-bold mb-4">Admin.Name</h2>
             <ul  className="font-bold mb-4">
             <li className="mb-2"><Link to="66c2ddec1943acbb8bdd9cc1" className="text-blue-600 hover:underline">Profile</Link></li>
             <li className="mb-2"><Link to="home" className="text-blue-600 hover:underline">Home</Link></li>
             <li className="mb-2"><Link to="Course/66c431f1c8addb7d24853198" className="text-blue-600 hover:underline">Courses</Link></li>
             <li className="mb-2"><Link to="AssignmentList" className="text-blue-600 hover:underline">Assignments</Link></li>
             <li className="mb-2"><Link to="Quizs" className="text-blue-600 hover:underline">Quizs</Link></li>
             <li className="mb-2"><Link to="feedback/message" className="text-blue-600 hover:underline">Feedback/Message</Link></li>
             </ul>
           </div>
         </aside> 
         <main className={`flex-1 p-4 transition-all min-h-96 duration-300 ${
         isSidebarOpen ? 'ml-60' : 'ml-0'
       }`} style={{ width: `calc(100% - ${isSidebarOpen ? '240px' : '0px'})` }}>
           <header className="flex  bg-blue-600 text-white ">
              {/* Sidebar Toggle Button */}
            <button onClick={toggleSidebar}  className="flex items-center p-2">
                {isSidebarOpen ? (
                   <ArrowLeftFromLine size={28} color="#e20808" strokeWidth={3} />
                   ):(
                    <ArrowRightFromLine size={28} color="#08e24a" strokeWidth={3} />     
                  )}
         </button>
             <h1 className="text-2xl font-bold">Course Name</h1>
           </header>
           <div className=" p-4 border-2 border-cyan-400 h-auto ">
           <Outlet/>
         </div>
         </main>  
         
       <Footer/> 
     </div>
   )
 }
 
 
 