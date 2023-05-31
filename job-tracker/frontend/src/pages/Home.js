import React from 'react'
import { useAuth } from '../components/Auth'

const Home = () => {
  const auth = useAuth()

  return (
    <div className='h-screen flex flex-col justify-center items-center text-white'>
        <h1 className='text-5xl'>Welcome, {auth.user.username}</h1>
    </div>
  )
}

export default Home