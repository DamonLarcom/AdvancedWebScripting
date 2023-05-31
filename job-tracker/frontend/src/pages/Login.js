import {useState} from 'react'

const Login = () => {
    const [error, setError] = useState(false)
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        setError(false)

        if(user.length === 0 || pass.length === 0){
            setError(true)
        }
    }

    return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <div className='rounded-xl shadow-xl bg-slate-600 w-[25%] h-fit flex flex-col items-center p-8 gap-5'>
            <h1 className='text-5xl text-white'>Login</h1>
            <form onSubmit={handleLogin} className='flex flex-col gap-3 w-1/2'>
                <input type="text" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} className='h-10 rounded-lg p-2'/>
                <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} className='h-10 rounded-lg p-2'/>
                <input type="submit" value="Login" className='h-16 rounded-lg p-5 bg-slate-300 text-xl'/>
            </form>
            {error? <p className='text-red-600 text-xl'>Username or Password are empty</p> : null}
            <p className='text-white text-lg'>Or <a href="/register" className='text-blue-400 underline'>Sign Up</a></p>
        </div>
    </div>
    )
}

export default Login