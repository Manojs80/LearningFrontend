import React, { useEffect, useState } from 'react';
import axios from 'axios'; // or use fetch
import { AddCourse } from '../../api/Routing';
const apiUrl = import.meta.env.VITE_API_URL;

export const PaymentSuccess = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const sessionId = queryParams.get('session_id');

      try {
        const response = await axios.get(`${apiUrl}/v1/payment/details?session_id=${sessionId}`);
        setPaymentDetails(response.data);
       
       // Uncomment to add course
        if (response.data.CourseId) {
          const id =response.data.CourseId ;
          await AddCourse(id);
        }

      } catch (err) {
        setError('Failed to fetch payment details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center mb-24">
      <div className="bg-white text-center shadow-lg rounded-lg max-w-lg mt-8 mb-auto p-12">
        <svg className="w-24 h-32 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">Payment Successful!</h1>
        <p className="text-gray-600 my-2">Thank you for your purchase. Your transaction has been completed successfully.</p>

        {paymentDetails && (
          <div className="mt-8">
            
            <p className="text-gray-800"><strong>Course:</strong> {paymentDetails.courseTitle || 'N/A'}</p>
            <p className="text-gray-800"><strong>CourseId:</strong> {paymentDetails.CourseId || 'N/A'}</p>
            <p className="text-gray-800"><strong>Amount Paid:</strong> ₹{paymentDetails.amount || '0'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

