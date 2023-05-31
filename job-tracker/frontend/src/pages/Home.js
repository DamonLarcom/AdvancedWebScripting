import React from 'react'

const Home = ({user}) => {
  return (
    <div className='h-screen flex flex-col justify-center items-center text-white'>
        <h1 className='text-5xl'>Welcome, {user.username}</h1>
    </div>
  )
}

export default Home