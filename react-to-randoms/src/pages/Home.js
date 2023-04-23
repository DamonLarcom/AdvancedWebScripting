import {React, useState, useEffect} from 'react'

const Home = () => {
    const [users, setUsers] = useState([])

    const url = "https://randomuser.me/api/?results=500"

    useEffect(() =>{
        fetch(url)
        .then(res => res.json())
        .then(data => setUsers(data.results))
        console.log(users)
    }, [])

  return (
    <div>
        <div>Home</div>
        {users.map((user, index) => {
            return (
                <div className='border-2 rounded-md shadow-lg'>{user.name.first}, {user.name.last}</div>
            )
        })}
    </div>
    
  )
}

export default Home