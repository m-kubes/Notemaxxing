import React from 'react'
import { Link } from 'react-router'

const Welcome = () => {
  return (
    <div className='flex flex-col my-50 gap-5 items-center justify-center h-fit w-full'>
        <h1 className='text-5xl wotfard-bold text-center'>Welcome to Notemaxxing</h1>
        <p className='text-center text-lg'>Your ultimate note-taking companion. Capture your thoughts, ideas, and inspirations in one place.</p>
        <Link to={"/create"} className='btn btn-primary'>Create a Note</Link>
    </div>
  )
}

export default Welcome