import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { CourseList, CourseListinstructor, DeleteCourse, DetailsInstructor } from '../../api/Routing';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const InstructorHome = () => {
  
   const[lists,setList] = useState([]);
   const navigate= useNavigate();
   console.log(lists);
   useEffect(()=> {
      init()
       },[]);
   const handleKnow = (id)=>{
     console.log("know",id);
     navigate(`/Instructor/CourseCard/${id}`);
   }

   const init = async()=>{

    const InstructorId = sessionStorage.getItem('InstructorId');
    console.log("Instructor storage data", InstructorId);

   

   let res = await CourseListinstructor(InstructorId)
   console.log("Instructor CourseListinstructor frend", res.data);
   setList(res.data);
   }
   
   const handleClick = async(courseId) => {
    try {
      console.log('Course ID:', courseId);
      await DeleteCourse(courseId)
      toast.success('Success and please refresh the page');
       navigate(`/Instructor/home`);
    } catch (error) {
      toast.error(error.message || 'Error in deleting course data');
    }


   };

  return (
    <div>
         <div className="flex flex-col items-center justify-center md:w-1/4 p-2 mx-auto  shadow-lg rounded-lg">
  <Link 
    to="CourseAdd" 
    className="bg-green-500 text-white text-center px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
  >
    ADD COURSE
  </Link>
</div>
    <div className="flex flex-wrap justify-center gap-10 py-20">
         
      {lists.map((row, index) =>(
        <div>
        <div className="card bg-base-100 w-96 shadow-xl ">
          <figure>
            <img
             src={row.image}
             alt="course" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-blue-600">{row.title}</h2>
            <p class="h-15 ">{row.description}</p>
            <div className="m-1 flex   justify-between   items-start	"> 
                <Link to={`/Instructor/CourseAdd/${row._id}`} className="bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-800">EDIT</Link>
                <button onClick={() => handleClick(row._id)} className="bg-red-500 text-white px-4 py-2  rounded hover:bg-blue-600">DELETE</button>
                <button onClick={()=>{handleKnow(row._id)}} className="btn btn-primary bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-800 " >Know More</button>
           </div>
           
          </div>
        </div>
        </div>
        ))
      } 
   </div> 
   </div>
       )
    
}
