import React, { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { Link, Outlet, useParams } from 'react-router-dom'
import { LearnerHeader } from '../components/LearnerHeader'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { DetailsLearner } from '../api/Routing'
import { LoadingPage } from '../LoadingPage'

export const LearnerPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 // const { id } = useParams();
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const [Learner, setLearner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const loadLearner = async () => {
        try {
          const LogId = sessionStorage.getItem('loginId');
          const response = await DetailsLearner(LogId);
          setLearner(response.data);
          sessionStorage.setItem('sessionData', response.data._id);
          console.log("learner page",response.data.courses);
        } catch (error) {
          setError(error);
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
  
      loadLearner();
    }, []);// Call the async function to load data
    
    if (loading) return <div><LoadingPage/></div>;
    if (error) return <div>Error loading profile details. Please try again later.</div>;
    if (!Learner) return <div>No profile found.</div>;
    const firstCourseId = Learner.courses && Learner.courses.length > 0 ? Learner.courses[0] : null;
  return (
    <div>
      <LearnerHeader/>
      <aside
          className={`fixed top-30 mt-5 min-h-96 left-0 right-0 w-56 p-2  bg-violet-800  transition-transform transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } `}
        >
          <div className="p-4">
            <h2 className="text-2xl font-bold text-teal-300 mb-10 uppercase">{Learner.name}</h2>
            <ul  className="font-bold text-white   mb-4">
            <li className="mb-3"><Link to={`${Learner._id}`}  className=" hover:underline">Profile</Link></li>
            <li className="mb-3"><Link to="home" className=" hover:underline">Home</Link></li>
            {firstCourseId && (
              <li className="mb-3"><Link to={`Course/${firstCourseId}`} className="  hover:underline">Courses</Link></li>
            )}
              {firstCourseId && (
              <li className="mb-3"><Link to={`Course/AssignmentList/${firstCourseId}`} className=" hover:underline">Assignments</Link></li>
            )} 
              {firstCourseId && (
              <li className="mb-3"><Link to={`Course/Quizs/${firstCourseId}`} className=" hover:underline">Quizs</Link></li>
            )}
           
            <li className="mb-3"><Link to="feedback-message" className=" hover:underline">Feedback/Message</Link></li>             
            </ul>
          </div>
        </aside> 
        <main className={`flex-1 p-4 transition-all min-h-96 duration-300 ${
        isSidebarOpen ? 'ml-60' : 'ml-0'
      }`} style={{ width: `calc(100% - ${isSidebarOpen ? '240px' : '0px'})` }}>
          <header className="flex justify-between items-center  bg-blue-600 text-white ">
             {/* Sidebar Toggle Button */}
             <div className="flex items-center p-2">
              <button onClick={toggleSidebar} className="mr-2">
                 {isSidebarOpen ? (
                   <ArrowLeftFromLine size={28} color="#e20808" strokeWidth={3} />
                     ) : (
                   <ArrowRightFromLine size={28} color="#08e24a" strokeWidth={3} />
                 )}
              </button>
               <h6 className="font-semibold uppercase">{Learner.role}</h6>
             </div>

        <h1 className="text-2xl font-bold uppercase">{Learner.name}</h1>
        <h6 className="text-sm font-semibold pe-5">Id : {Learner._id}</h6>
          </header>
          <div className=" p-4 border-2 border-cyan-400 h-auto ">
          <Outlet/>
        </div>
        </main>  
        
      <Footer/> 
    </div>
  )
}
