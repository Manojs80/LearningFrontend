import React, { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { Link, Outlet, useParams } from 'react-router-dom'
import { LearnerHeader } from '../components/LearnerHeader'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { DetailsLearner } from '../api/Routing'

export const LearnerPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { id } = useParams();
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const [Learner, setLearner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const loadLearner = async () => {
        try {
          const response = await DetailsLearner(id);
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
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile details. Please try again later.</div>;
    if (!Learner) return <div>No profile found.</div>;
    const firstCourseId = Learner.courses && Learner.courses.length > 0 ? Learner.courses[0] : null;
  return (
    <div>
      <LearnerHeader/>
      <aside
          className={`fixed top-20 left-0 w-48 h-auto border-2 border-dashed border-cyan-400 transition-transform transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } `}
        >
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 uppercase">{Learner.name}</h2>
            <ul  className="font-bold mb-4">
            <li className="mb-2"><Link to={`${Learner._id}`}  className="text-blue-600 hover:underline">Profile</Link></li>
            <li className="mb-2"><Link to="home" className="text-blue-600 hover:underline">Home</Link></li>
            {firstCourseId && (
              <li className="mb-2"><Link to={`Course/${firstCourseId}`} className="text-blue-600 hover:underline">Courses</Link></li>
            )}
              {firstCourseId && (
              <li className="mb-2"><Link to={`Course/AssignmentList/${firstCourseId}`} className="text-blue-600 hover:underline">Assignments</Link></li>
            )} 
              {firstCourseId && (
              <li className="mb-2"><Link to={`Course/Quizs/${firstCourseId}`} className="text-blue-600 hover:underline">Quizs</Link></li>
            )}
           
            <li className="mb-2"><Link to="feedback-message" className="text-blue-600 hover:underline">Feedback/Message</Link></li>             
            </ul>
          </div>
        </aside> 
        <main className={`flex-1 p-4 transition-all min-h-96 duration-300 ${
        isSidebarOpen ? 'ml-60' : 'ml-0'
      }`} style={{ width: `calc(100% - ${isSidebarOpen ? '240px' : '0px'})` }}>
          <header className="flex justify-between items-center  bg-blue-600 text-white ">
             {/* Sidebar Toggle Button */}
           <button onClick={toggleSidebar}  className="flex items-center p-2">
               {isSidebarOpen ? (
                  <ArrowLeftFromLine size={28} color="#e20808" strokeWidth={3} />
                  ):(
                   <ArrowRightFromLine size={28} color="#08e24a" strokeWidth={3} />     
                 )}
        </button>
        <h1 className="text-2xl font-bold uppercase">{Learner.name}</h1>
        <h6 className="text-sm font-semibold p-1">Id : {Learner._id}</h6>
          </header>
          <div className=" p-4 border-2 border-cyan-400 h-auto ">
          <Outlet/>
        </div>
        </main>  
        
      <Footer/> 
    </div>
  )
}
//"AssignmentList/66c2350e0914e4ea1199fc4a"
//<li className="mb-2"><Link to="Quizs" className="text-blue-600 hover:underline">Quizs</Link></li>

  /*
   <h1 className="text-2xl font-bold uppercase">{Learner.name}</h1>
          <h6 className="text-sm font-semibold p-1">Id : {Learner._id}</h6>
  */        