import React from 'react'
import {useLocation, Link} from 'react-router-dom'
import moment from 'moment'

const DetailsPage = () => {
  const loc = useLocation()
  const person = loc.state.user

  return (
    <div className='flex flex-col p-10 text-center'>
      <Link to='/' className='shadow-lg rounded-lg border-2 w-32 mx-auto my-5 p-1'>
        Return to home
      </Link>
      <img src={person.picture.large} alt="" className='h-72 w-72 rounded-full mx-auto'/>
      <h1 className='text-5xl py-5'>{person.name.first} {person.name.last}</h1>
      <div className='text-xl'>
        <p><strong>Age:</strong> {person.dob.age}</p>
        <p><strong>Date of Birth:</strong> {moment(person.dob.date).format("MMMM Do YYYY")}</p>
      </div>
    </div>
  )
}

export default DetailsPage