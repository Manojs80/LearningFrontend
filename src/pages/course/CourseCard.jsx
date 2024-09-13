import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { CourseList } from '../../api/Routing';
import { useNavigate } from 'react-router-dom';

export const CourseCard = () => {
  
  const[lists,setList] = useState([]);
  console.log(lists);
  useEffect(()=> {
   init()
  },[]);
   const navigate= useNavigate();

 const init = async()=>{
   let res = await CourseList()
   setList(res.data);
 }

 const handleClick = (courseId) => {
  console.log('Course ID:', courseId);
  navigate(`/CourseDetail/${courseId}`)
  // You can perform any action here, like navigating to a course detail page or making an API call
};

  return (
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
            <div className="card-actions justify-between">
            <h4 className="card-title text-green-600"> ₹ {row.fee}</h4>
               <button className="btn btn-primary" onClick={()=>{handleClick(row._id)}}>Know More</button>
            </div>
          </div>
        </div>
        </div>
        ))
      } 
   </div> 
    
       )
    
}


{/* 
  <h4 className="card-title text-green-600">{row.fee}</h4>
  
  <div className="card-body">
      <h2 className="card-title">Shoes!</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
    <button className="btn btn-primary">Buy Now</button>
      </div>
    </div>*/}