import React from 'react'

export const PaymentSuccess = () => {
  return (
    <div className="flex justify-center mb-24">
    <div className="bg-white text-center shadow-lg rounded-lg max-w-lg mt-8 mb-auto p-12 ">
    <svg className="w-24 h-32 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <h1 className="text-2xl font-semibold text-gray-800 mt-4">Payment Successful!</h1>
    <p className="text-gray-600 my-2">Thank you for your purchase. Your transaction has been completed successfully.</p>
    
  </div>
 
  </div>
  )
}
/*
bg-white w-1/2 h-1/4 shadow-lg rounded-lg max-w-lg  p-2 text-center
<div class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div class="bg-white shadow-lg rounded-lg max-w-lg w-full p-8 text-center">
    <svg class="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <h1 class="text-2xl font-semibold text-gray-800 mt-4">Payment Successful!</h1>
    <p class="text-gray-600 mt-2">Thank you for your purchase. Your transaction has been completed successfully.</p>
    <div class="mt-6">
      <a href="/" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Go to Homepage</a>
    </div>
  </div>
*/