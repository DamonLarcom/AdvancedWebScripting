import {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import conf from "../global.json"
import { SyncLoader } from "react-spinners";
import moment from 'moment'

const PlayerDetails = () => {
    const [player, setPlayer] = useState({})
    const [loading, setLoading] = useState(true)
    let user = JSON.parse(localStorage.getItem("user"))
    let {id} = useParams()

    useEffect(() => {
        fetch(conf.url + conf.endpoints.players + `/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPlayer(data)
            setLoading(false)
        })
    },[])

    const handleDeletePlayer = async() => {
        await fetch(conf.url + conf.endpoints.players + `/${id}?key=${user.key}`, {
            method: "DELETE",
        })
        window.location = "/"
    }

    return (
    <div className='flex justify-center text-white'>
        {loading?
            <p className="text-lg text-white"><SyncLoader color="#88F"/></p>
        :
            player != null ?
            <div className='flex flex-col gap-5 text-center text-2xl w-full'>
                <div className='flex w-[40%] mx-auto'>
                    <Link to="/" className='text-xl shadow-lg rounded-lg bg-slate-400 p-2 w-40 mx-auto'>Back to home</Link>
                    {
                        user?
                            <>
                                <Link to={`/players/${player.id}/update`} className='text-xl shadow-lg rounded-lg bg-blue-400 p-2 w-40 mx-auto'>Update Player</Link>
                                <button onClick={handleDeletePlayer} className='text-xl shadow-lg rounded-lg bg-red-400 p-2 w-40 mx-auto'>Delete Player</button>
                            </>
                        :
                        null
                    }
                    
                </div>
                <h1 className='text-5xl'>{player.first_name} {player.last_name} (#{player.jersey})</h1>
                <p><strong>Status:</strong> {player.status}</p>
                <p><strong>Position:</strong>: {player.position}</p>
                <p><strong>Height:</strong> {player.height} in</p>
                <p><strong>Weight:</strong> {player.weight} Lbs</p>
                <p><strong>Birthdate:</strong> {moment(player.birth_date).format("MMMM D, YYYY")}</p>
                <p><strong>Birth City:</strong> {player.birth_city}</p>
                <p><strong>Birth State:</strong> {player.birth_state}</p>
            </div>
            :
            null
        }
    </div>
    )
}

export default PlayerDetails