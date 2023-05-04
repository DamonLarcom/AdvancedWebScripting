import React from 'react'
import {Link} from 'react-router-dom'

const PersonCard = ({person}) => {
  return (
    <Link to={`/details/${person.login.username}`} state={{user: person}} className="flex h-32 w-80 border-2 rounded-lg shadow-xl p-5 justify-around gap-5">
        <img src={person.picture.medium} alt="" className='h-20 w-20 rounded-full'/>  
        <div>
            <h3 className="text-lg font-semibold">{person.name.first} {person.name.last}, {person.dob.age}</h3>
            <p>@{person.login.username}</p>   
        </div>
        
    </Link>
  )
}

export default PersonCard