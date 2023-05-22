import {useState} from 'react'
import global from "../global.json"

const LoginPage = () => {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    setError(false)
    
    fetch(global.url + global.endpoints.user + `?email=${email}`)
    .then(res => res.json())
    .then(data => {
      if(data.status === 404) {
        setError(true)
      } else {
        localStorage.setItem("user", JSON.stringify(data.payload))
        window.location = "/"
      }
    })
    .catch(error => console.log(error))
  }

  return (
    <div className='flex h-fit justify-center bg-slate-800'>
        <div className="flex flex-col gap-5 bg-slate-700 h-96 w-[30%] text-center p-5 rounded-xl shadow-lg">
            <h1 className="text-5xl text-white">Login</h1>
            <form onSubmit={handleLogin} className='flex flex-col gap-10'>
                <input type="text" placeholder='Email' className='w-[75%] p-5 rounded-xl text-xl mx-auto' onChange={(e) => setEmail(e.target.value)}/>
                <input type="submit" value="Login" className='rounded-xl shadow-lg text-2xl h-12 w-[20%] mx-auto bg-slate-200'/>
            </form>
            {
              error?
                <h1 className='text-red-500'>That user was not found. Please try again.</h1>
                :
                null
            }
            <p className='text-lg text-white'>Or <a href="/register" className='text-blue-500 underline'>Sign Up</a></p>
        </div>
        
    </div>
  ) 
}

export default LoginPage