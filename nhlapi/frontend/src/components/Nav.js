import { Link } from 'react-router-dom'

const Nav = ({user}) => {

    const handleLogout = () => {
        localStorage.removeItem("user")
        window.location = "/"
    }

    return (
    <nav className='flex justify-end text-white px-10 py-5'>
        {
            user == null ?
                null
                :
                <div className='flex gap-10 items-center'>
                    <div className='flex flex-col'>
                        <p>Logged in as: {user.email}</p>
                        <p>Key: {user.key}</p>
                    </div>
                    
                    <button onClick={handleLogout} className='shadow-xl rounded-lg bg-slate-500 p-2'>Log Out</button>
                </div>
        }
    </nav>
    )
}

export default Nav