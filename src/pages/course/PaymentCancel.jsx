import React from 'react'
import { Link } from 'react-router-dom'

export const PaymentCancel = () => {

  return (
    <div className="flex justify-center mb-24">
    <div className="bg-white text-center shadow-lg rounded-lg max-w-lg mt-8 mb-auto p-12 ">
    <svg className="w-24 h-24 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
    <h1 className="text-2xl font-semibold text-gray-800 mt-4">Payment Cancelled</h1>
    <p className="text-gray-600 mt-2">Your payment was cancelled. Please try again or contact  if you need help.</p>
    <div className="mt-6">
    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-4">
    <Link to="/contact"> Contact Us</Link>
    </button>
    </div>
  </div>
  </div>
  )
}
