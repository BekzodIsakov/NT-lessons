import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProfileCard({ name }: { name: string }) {
  return (
    <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-10'>
      <div className='flex flex-col items-center pb-10'>
        <Image
          width={50}
          height={50}
          className='w-24 h-24 mb-3 rounded-full shadow-lg object-cover'
          src='/images/profile.jpg'
          alt='Bonnie image'
        />
        <h5 className='capitalize mb-1 text-2xl font-medium text-gray-900 dark:text-white'>
          {name}
        </h5>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          Frontend developer
        </span>
        <div className='flex mt-4 md:mt-6'>
          <Link
            href='#'
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Add friend
          </Link>
          <Link
            href='#'
            className='py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            Message
          </Link>
        </div>
      </div>
    </div>
  );
}
