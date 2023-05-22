import {useEffect, useState} from 'react'
import conf from "../global.json"
import TeamCard from './Cards/TeamCard'

const HomePage = ({user}) => {
    const [teams, setTeams] = useState([])

    useEffect(() => {
        fetch(conf.url + conf.endpoints.teams)
        .then(res => res.json())
        .then(data => setTeams(data))
    },[])


    return (
    <div className='h-fit bg-slate-800 text-white flex flex-col items-center gap-2'>
        <h1 className='text-5xl'>Welcome to the NHL API</h1>
        <p className='text-2xl'>Total teams: {teams.length}</p>
        {
            user? 
                <a href="/teams/create" className='rounded-lg shadow-xl bg-slate-600 p-2 mt-5'>Create a team</a>
            :
                <div className='text-lg'>
                    <p><a href="/login" className='text-blue-700 underline'>Log In</a> or <a href="/register" className='text-blue-700 underline'>Sign up</a> to create a team</p>
                </div>
        }
        <div className='flex justify-center gap-10 flex-wrap p-10'>
            {
                teams.sort((a,b) => a.name.full > b.name.full).map(team => (
                    <TeamCard team={team} key={team.name.abbrev}/>
                ))
            } 
        </div>

    </div>
    )
}

export default HomePage