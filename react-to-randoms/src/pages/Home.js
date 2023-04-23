import {React, useState, useEffect} from 'react'
import PersonCard from '../components/PersonCard'

const Home = () => {
    // contains full users list
    const [users, setUsers] = useState([])

    //contains filtered users to prevent filtering data from original list
    const [filtered, setFiltered] = useState([])

    // filters
    const [ageMin, setAgeMin] = useState(0)
    const [ageMax, setAgeMax] = useState(100)
    const [nameFilter, setNameFilter] = useState('')
    const [usernameFilter, setUsernameFilter] = useState('')

    const url = "https://randomuser.me/api/?results=500"

    useEffect(() =>{
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setUsers(data.results)
            setFiltered(data.results)
        })
    }, [])

    useEffect(() => {
        filterResults()
    },[ageMin, ageMax, nameFilter, usernameFilter])

    function filterResults(){
        //uses 0 as min age and 100 as max age default in case the input is empty
        //for string filters, returns 1 (truthy value) if no filter text exists
        let filteredUsers = users.filter(user => {
            return (
                (nameFilter.length > 0?`${user.name.first} ${user.name.last}`.toLowerCase().includes(nameFilter): 1) &&
                (usernameFilter.length > 0? user.login.username.toLowerCase().includes(usernameFilter): 1) &&
                (ageMin? user.dob.age >= ageMin : user.dob.age > 0) &&
                (ageMax? user.dob.age <= ageMax : user.dob.age < 100)
            )
        })
        setFiltered(filteredUsers)
    }

  return (
    <div className='text-center p-10'>
        <div className='text-5xl my-10'>React to Randoms</div>
        <div className='flex flex-wrap justify-center gap-4 my-5'>
            <input type="text" placeholder='Filter by name..' className='shadow-xl rounded-lg  p-2 border-2' onChange={(e) => setNameFilter(e.target.value.toLowerCase())}/>
            <input type="text" placeholder='Filter by username..' className='shadow-xl rounded-lg  p-2 border-2' onChange={(e) => setUsernameFilter(e.target.value.toLowerCase())}/>
            <div className='flex gap-2'>
                <input type="number" placeholder='Age Min' className='shadow-xl rounded-lg p-2 border-2 w-32' onChange={(e) => setAgeMin(e.target.value)}/>
                <input type="number" placeholder='Age Max' className='shadow-xl rounded-lg p-2 border-2 w-32' onChange={(e) => setAgeMax(e.target.value)}/>
            </div>
        </div>
        {
            filtered.length > 0? <p className='text-2xl font-bold my-5'>Results: {filtered.length}</p> : null
        }
        <div className='flex flex-wrap gap-5 justify-center '>
            {filtered.map((user, index) => {
                return (
                    <PersonCard person={user} key={index}/>
                )
            })}
        </div>
    </div>
    
    
  )
}

export default Home