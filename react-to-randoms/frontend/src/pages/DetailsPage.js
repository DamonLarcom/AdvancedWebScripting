import React from 'react'
import {useLocation, Link} from 'react-router-dom'
import moment from 'moment'

const DetailsPage = () => {
  const loc = useLocation()
  const person = loc.state.user

  const {location} = person
  const {street} = location

  console.log(person)

  return (
    <div className='flex flex-col p-10 text-center'>
      <Link to='/' className='shadow-lg rounded-lg border-2 w-32 mx-auto my-5 p-1'>
        Return to home
      </Link>
      <img src={person.picture.large} alt="" className='h-72 w-72 rounded-full mx-auto'/>
      <h1 className='text-5xl py-5'>{person.name.first} {person.name.last}</h1>
      <p className='text-3xl mb-5'>@{person.login.username}</p>
      <div className='text-xl'>
        <p><strong>Age:</strong> {person.dob.age}</p>
        <p><strong>Date of Birth:</strong> {moment(person.dob.date).format("MMMM Do YYYY")}</p>
        <p><strong>Address:</strong> {street.number} {street.name}, {location.city}, {location.state}, {location.country}, {location.postcode}</p>
        <div>
          <h2 className='text-3xl font-bold mt-10'>Contact</h2>
          <p><strong>Email:</strong> {person.email}</p>
          <p><strong>Home Phone:</strong> {person.phone}</p>
          <p><strong>Cellphone:</strong> {person.cell}</p>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage