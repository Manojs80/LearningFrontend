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
