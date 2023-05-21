import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex h-screen justify-center items-center bg-slate-800'>
        <div className="flex flex-col gap-10 bg-slate-700 h-96 w-[30%] text-center p-5 rounded-xl shadow-lg">
            <h1 className="text-5xl text-white">Login</h1>
            <form action="" className='flex flex-col gap-10'>
                <input type="text" placeholder='Email' className='w-[75%] p-5 rounded-xl text-xl mx-auto'/>
                <input type="submit" value="Login" className='rounded-xl shadow-lg text-2xl h-12 w-[20%] mx-auto bg-slate-200'/>
            </form>
        </div>
        
    </div>
  ) 
}

export default LoginPage