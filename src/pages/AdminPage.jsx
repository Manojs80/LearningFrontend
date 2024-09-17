     
 import React, { useEffect, useState } from 'react'
 import { Footer } from '../components/Footer'
 import { Link, Outlet, useParams } from 'react-router-dom'
 import { LearnerHeader } from '../components/LearnerHeader'
 import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { DetailsAdmin } from '../api/Routing'
import { LoadingPage } from '../LoadingPage'
 
 export const AdminPage = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
     const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
      const { id } = useParams(); 
       const [Admin, setAdmin] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
   
     useEffect(() => {
       const loadAdmin = async () => {
         try {             
           let response = await DetailsAdmin(id);
           console.log("admin response.data",response.data);
           setAdmin(response.data);
         } catch (error) {
           setError(error);
           console.log(error); 
         } finally {
           setLoading(false);
         }
       };
   
       loadAdmin(); // Call the async function to load data
     }, []);  
     
     if (loading) return <div><LoadingPage/></div>;
     if (error) return <div>Error loading Admin details. Please try again later.</div>;
     if (!Admin) return <div>No Admin found.</div>;
   return (
     <div>
       <LearnerHeader/>
       <aside
           className={`fixed top-30 mt-5 min-h-96 left-0 right-0 w-56 p-2 bg-violet-800 transition-transform transform ${
             isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
           } `}
         >
           <div className="p-4">
             <h2 className="text-2xl font-bold text-teal-300 mb-10  uppercase">{Admin.name}</h2>
             <ul  className="font-bold text-white  mb-4">
             <li className="mb-3"><Link to={`${Admin._id}`} className=" hover:underline">Profile</Link></li>
             <li className="mb-3"><Link to="home" className=" hover:underline">Home</Link></li>
             <li className="mb-3"><Link to="Courses" className=" hover:underline">Courses</Link></li>
             <li className="mb-3"><Link to="Instructors" className=" hover:underline">Instructors</Link></li>
             <li className="mb-3"><Link to="Learners" className=" hover:underline">Learners</Link></li>
             <li className="mb-3"><Link to="Assignments" className=" hover:underline">Assignments</Link></li>
             <li className="mb-3"><Link to="QuizList" className="hover:underline">Quiz List</Link></li>
             <li className="mb-3"><Link to="feedback/message" className=" hover:underline">Feedback/Message</Link></li>
             </ul>
           </div>
         </aside> 
         <main className={`flex-1 p-4 transition-all min-h-96 duration-300 ${
         isSidebarOpen ? 'ml-60' : 'ml-0'
       }`} style={{ width: `calc(100% - ${isSidebarOpen ? '240px' : '0px'})` }}>
           <header className="flex justify-between items-center  bg-blue-600 text-white  ">
              {/* Sidebar Toggle Button */}
            <button onClick={toggleSidebar}  className="flex items-center p-2">
                {isSidebarOpen ? (
                   <ArrowLeftFromLine size={28} color="#e20808" strokeWidth={3} />
                   ):(
                    <ArrowRightFromLine size={28} color="#08e24a" strokeWidth={3} />     
                  )}
         </button>
         <h1 className="text-2xl font-bold uppercase">{Admin.name}</h1>
         <h6 className="text-sm font-semibold pe-5">Id : {Admin._id}</h6>
           </header>
           <div className=" p-4 border-2 border-cyan-400 h-auto ">
           <Outlet/>
         </div>
         </main>  
         
       <Footer/> 
     </div>
   )
 }
 
 /*
<h1 className="text-2xl font-bold uppercase">{Admin.name}</h1>
          <h6 className="text-sm font-semibold p-1">Id : {Admin._id}</h6>
 */
 