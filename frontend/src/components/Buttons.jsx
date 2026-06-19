import React from 'react'
import { Link } from 'react-router'
import { MoveLeft } from 'lucide-react'

export const BackToNotes = () => {
  return (
    <Link to={"/"} className="btn btn-ghost mb-2">
        <MoveLeft className='size-5'/>
        Back to Notes
    </Link>
  )
}