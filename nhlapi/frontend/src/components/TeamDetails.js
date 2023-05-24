import{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import conf from "../global.json"
import { SyncLoader } from "react-spinners";
import {Link} from 'react-router-dom'
import Td from "./Td"

const TeamDetails = () => {
    const [team, setTeam] = useState({})
    const [loading, setLoading] = useState(true)
    let {abbrev} = useParams()
    let user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        fetch(conf.url + conf.endpoints.teams + `/${abbrev.toUpperCase()}?includePlayers=true`)
        .then(res => res.json())
        .then(data => {
            setTeam(data)
            setLoading(false)
        })
    },[])

    const handleDeleteTeam = async() => {
        let user = JSON.parse(localStorage.getItem("user"))
        await fetch(conf.url + conf.endpoints.teams + `/${abbrev}?key=${user.key}`, {
            method: "DELETE",
        })
        window.location = "/"
    }

    return (
        <div className='flex justify-center text-white'>
            {loading?
                <p className="text-lg text-white"><SyncLoader color="#88F"/></p>
            :
                <div className='flex flex-col gap-5 text-center text-2xl w-full'>
                    <div className='flex w-[40%] mx-auto'>
                        <Link to="/" className='text-xl shadow-lg rounded-lg bg-slate-400 p-2 w-40 mx-auto'>Back to home</Link>
                        {
                            user?
                                <>
                                    <Link to={`/teams/${team.name.abbrev}/update`} className='text-xl shadow-lg rounded-lg bg-blue-400 p-2 w-40 mx-auto'>Update Team</Link>
                                    <button onClick={handleDeleteTeam} className='text-xl shadow-lg rounded-lg bg-red-400 p-2 w-40 mx-auto'>Delete Team</button>
                                </>
                                :
                                null
                            
                        }
                    </div>
                    <h1 className='text-5xl'>{team.name.full} ({team.name.abbrev.toUpperCase()})</h1>
                    <p>Location: {team.location.city}</p>
                    <p>Arena: {team.location.arena_name}</p>
                    <p>Division: {team.division}</p>

                    <div className='shadow-lg rounded-lg bg-slate-600 w-[50%] mx-auto mb-16 py-5'>
                        <h2 className='text-3xl underline'>Players</h2>
                        {
                            team.players != null && team.players.length > 0?
                                <table className='mx-auto' cellPadding={15}>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Position</th>
                                    <th>Jersey Number</th>
                                </tr>
                                {
                                    team.players.sort((a,b) => a.last_name > b.last_name).map(player => (
                                        <tr className='hover:bg-slate-400'>
                                            <Td to={`/players/${player.id}`}>{player.first_name} {player.last_name}</Td>
                                            <Td to={`/players/${player.id}`}>{player.position}</Td>
                                            <Td to={`/players/${player.id}`}>{player.jersey}</Td>
                                        </tr>
                                        
                                    ))
                                }
                                </table>
                                :
                                <h2 className='text-xl'>This team has no players.</h2>
                        }
                    </div>
                </div>
                
            }
        </div>
        
    )
}

export default TeamDetails