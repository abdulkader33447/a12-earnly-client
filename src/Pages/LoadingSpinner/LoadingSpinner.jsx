import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-[#fca61b] border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;