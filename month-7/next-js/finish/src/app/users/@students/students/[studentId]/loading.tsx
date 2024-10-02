import React from "react";

export default function loading() {
  return (
    <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-10 animate-pulse'>
      <div className='flex flex-col items-center pb-10'>
        {/* Skeleton for the image */}
        <div className='w-24 h-24 mb-3 rounded-full bg-gray-300 dark:bg-gray-700'></div>

        {/* Skeleton for the name */}
        <div className='w-32 h-6 mb-2 bg-gray-300 dark:bg-gray-700 rounded'></div>

        {/* Skeleton for the role */}
        <div className='w-24 h-4 mb-4 bg-gray-300 dark:bg-gray-700 rounded'></div>

        {/* Skeleton for buttons */}
        <div className='flex mt-4 md:mt-6 space-x-2'>
          <div className='w-24 h-10 bg-blue-300 dark:bg-blue-600 rounded-lg'></div>
          <div className='w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg'></div>
        </div>
      </div>
    </div>
  );
}
