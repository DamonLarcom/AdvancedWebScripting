import {useRef, useState} from 'react'
import conf from "../global.json"

const Register = () => {
    const email = useRef()
    const [error, setError] = useState(false)

    const handleRegister = async(e) => {
        e.preventDefault()

        setError(false)
        //checks characters present in all emails, not full validation
        if(!email.current.value.includes("@") || !email.current.value.includes(".")) {
            setError(true)   
        } else {
            //post user
            await fetch(conf.url + conf.endpoints.user, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify({email: email.current.value})
            })
            window.location = "/login"
        }
    }

    return (
    <div className='flex h-fit justify-center bg-slate-800'>
        <div className="flex flex-col gap-5 bg-slate-700 h-fit w-[30%] text-center p-5 rounded-xl shadow-lg">
            <h1 className="text-5xl text-white">Sign Up</h1>
            <form onSubmit={handleRegister} className='flex flex-col gap-10'>
                <input type="text" placeholder='Email' className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={email}/>
                <input type="submit" value="Sign Up" className='rounded-xl shadow-lg text-2xl h-12 w-[20%] mx-auto bg-slate-200'/>
            </form>
            {
              error?
                <h1 className='text-red-500'>Email must be valid.</h1>
                :
                null
            }
            <p className='text-lg text-white'>Already have an account? <a href="/login" className='text-blue-500 underline'>Log in</a></p>
        </div>
        
    </div>
    )
}

export default Register