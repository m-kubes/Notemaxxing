import React from 'react'
import { CircleAlert } from 'lucide-react';

const RateLimitedUI = () => {
  return (
    <div className='flex items-center gap-3 h-fit bg-warning rounded-lg border-base-200 shadow-lg border-2 p-3 my-3'>
      <CircleAlert className='h-full w-15 hidden sm:block align-middle' stroke='black'/>
      <div id="text" className="flex flex-col align-middle ">
        <h1 className='wotfard-bold text-2xl text-black'>Rate Limit Reached</h1>
        <h2 className='text-lg text-black'>You've made too many requests in a short period. Please wait a moment.</h2>
      </div>
    </div>
  )
}

export default RateLimitedUI