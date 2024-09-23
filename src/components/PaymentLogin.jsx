import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { DetailsCourse, Learnerlogin } from '../api/Routing';
import { LoadingPage } from '../LoadingPage';


export const PaymentLogin = () => {
  
  const { register, handleSubmit,reset } = useForm();
  const apiUrl = import.meta.env.VITE_API_URL;
  const stripePublicKey = import.meta.env.VITE_STRIPE_P_KEY;
   const { id } = useParams();
 
  const [course, setCourse] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  

  const onSubmit = async(data) => {

    try {
        const  loginbackend = await Learnerlogin(data);

      // Debug: Check the loginbackend structure
        console.log("loginbackend:", loginbackend.data);
        sessionStorage.setItem('loginId', loginbackend.data._id);
        console.log("LearnerId",loginbackend.data._id);
       toast.success(loginbackend.message);
   
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
   
  } catch (error) {
    
      // Ensure that error.response.data exists before accessing
      if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
      } else {
          toast.error('An unexpected error occurred.');
      }
      reset();
  }
};
  
  return (
    <div>
      <div className="flex justify-center my-16  h-auto ">
      <div className={` p-8 rounded-lg shadow bg-neutral-400 w-1/3 `}>
        <h2 className="text-2xl font-bold text-center text-pink-700 mb-6">Login</h2> 
       
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
           <div>
            <label htmlFor="email" className="block  text-zinc-950 font-bold">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full px-3 py-2 bg-white text-zinc-950 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email"
            />
           </div>
           <div>
            <label htmlFor="password" className="block  text-zinc-950 font-bold">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full px-3 py-2 bg-white text-zinc-950 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
            
            <label className="label text-warning">
               <Link to={"/signup"}>New User ?</Link>
            </label>

           </div>
           <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 mb-12 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Login
           </button>
        </form>
      </div>
    </div>
    </div>
  )
}


/*
  sessionStorage.setItem('LearnerId', loginbackend.data._id);
         console.log("LearnerId",loginbackend.data._id);

 const makePayment = async () => {
    
    try {
    
      
    } catch (error) {
      console.error("Payment process failed:", error);
    }
    console.log('Frontend :makePayment');
  };
*/