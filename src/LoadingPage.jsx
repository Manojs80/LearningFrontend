import React from 'react'

export const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center h-screen ">
          <div className="loader h-32"></div>
          <div className="text-red font-bold text-2xl">Loading Please Wait</div>
        </div>
      );

}
