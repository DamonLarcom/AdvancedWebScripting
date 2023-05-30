import React from 'react'
import { Link } from 'react-router-dom'

const TeamCard = ({team}) => {
  return (
    <Link to={`/teams/${team.name.abbrev}`}>
        <div className='rounded-lg shadow-xl p-10 w-96 h-32 bg-slate-500 flex flex-col justify-center items-center border-green-600 hover:border-8'>
            <h1 className='text-lg'>{team.name.full} ({team.name.abbrev})</h1>
            <p>{team.location.city}</p>
        </div>
    </Link>
    
  )
}

export default TeamCard