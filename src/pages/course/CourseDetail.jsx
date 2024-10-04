import React, { useState, useEffect } from 'react';
import { DetailsCourse } from '../../api/Routing';
import {  useNavigate, useParams } from 'react-router-dom';

import { LoadingPage } from '../../LoadingPage';
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
 



export const CourseDetail = () => {
  const { id } = useParams();
 
  const [course, setCourse] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const stripePublicKey = import.meta.env.VITE_STRIPE_P_KEY;

  useEffect(() => {
    const loadCourse = async () => {
      try {
        let response = await DetailsCourse(id);
        setCourse(response.data);
        console.log("response.data",response.data);
        
      } catch (error) {
        setError(error);
        console.log(error); 
      } finally {
        setLoading(false);
      }
    };

    loadCourse(); // Call the async function to load data
  }, [id]); // Added `id` as a dependency to ensure `useEffect` runs when `id` changes

  if (loading) return <div><LoadingPage/></div>;
  if (error) return <div>Error loading course details. Please try again later.</div>;
  if (!course) return <div>No course found.</div>;

  

  const makePayment = async () => {
    
    try {
      const LearnerId = sessionStorage.getItem('loginId');
      if (LearnerId) {
        const stripe = await loadStripe(stripePublicKey);

          if (!stripe) {
            console.error("Stripe failed to initialize.");
            return;
          }
    
        
          const response = await axios.post(`${apiUrl}/v1/payment/create-checkout-session`, { course }, { withCredentials: true });
          const { sessionId } = response.data;
    
          if (!sessionId) {
            console.error("No session ID received.");
            return;
          }
    
          const result = await stripe.redirectToCheckout({ sessionId });
    
          if (result.error) {
            console.error(result.error.message);
          }
      } else{
      navigate(`/Payment/${course._id}`);
      }
    } catch (error) {
      console.error("Payment process failed:", error);
    }
    
  };

  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-bold text-green-500">Course Details</h1>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row bg-gray-500 shadow-lg rounded-lg overflow-hidden">
          <div className="lg:w-1/3">
            <img
              src={course.image}
              alt={`Image for ${course.title}`}
              className="w-full h-96 object-fill"
            />
          </div>
          <div className="lg:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-lime-500 mb-2">{course.title}</h1>
              <p className="  text-pink-400 mb-2">CourseId: {course._id}</p>
              {course.instructor?.name && (<p className="text-xl text-orange-400 font-semibold ">
                Instructor: {course.instructor.name.toUpperCase()}  </p>)}
              {course.instructor?._id && (<p className="text-orange-400 mb-4">
                Instructor-Id: {course.instructor._id}</p>)}
              <p className="text-white mb-6">{course.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-lime-500 mb-4">Objectives</h2>
              <ul className="list-disc list-inside text-white">
                {course.objectives && course.objectives.map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>
            </div>
            <button onClick={makePayment} className="mt-6 btn btn-primary">
              Enroll Now
            </button>
          </div>
        </div>
      </div> 
    </div>
  );
};

