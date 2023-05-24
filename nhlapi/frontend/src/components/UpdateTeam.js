import {useRef, useState, useEffect} from 'react'
import conf from "../global.json"
import { useParams } from 'react-router-dom'

const UpdateTeam = () => {
    const [loading, setLoading] = useState(true)
    const [team, setTeam] = useState({})
    const {abbrev} = useParams()

    const teamName = useRef();
    const teamAbbrev = useRef();
    const locationCity = useRef();
    const arena = useRef();
    const division = useRef();

    useEffect(() => {
        fetch(conf.url + conf.endpoints.teams + `/${abbrev}`)
        .then(res => res.json())
        .then(data => {
            setTeam(data)
            setLoading(false)
        })
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        await fetch(conf.url + conf.endpoints.teams + `/${abbrev}?key=${JSON.parse(localStorage.getItem("user")).key}`, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(
                {
                    name:{
                        full: teamName.current.value,
                        abbrev: teamAbbrev.current.value
                    },
                    location: {
                        city: locationCity.current.value,
                        arena_name: arena.current.value
                    },
                    division: division.current.value
                }
            )
        })
        window.location = "/"
    }
    return (
        <div className='flex h-fit justify-center'>
            <div className="flex flex-col gap-5 bg-slate-700 w-[30%] h-fit text-center p-5 rounded-xl shadow-lg">
                <h1 className="text-5xl text-white">Update Team</h1>
                {!loading?
                    <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
                        <input type="text" placeholder={team.name.full} className="w-[75%] p-5 rounded-xl text-xl mx-auto" ref={teamName}/>
                        <input type="text" placeholder={team.name.abbrev} className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={teamAbbrev}/>
                        <input type="text" placeholder={team.location.city} className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={locationCity}/>
                        <input type="text" placeholder={team.location.arena_name} className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={arena}/>
                        <select name="division" className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={division}>
                            <option value="">--Select a division--</option>
                            <option value="Pacific">Pacific</option>
                            <option value="Atlantic">Atlantic</option>
                            <option value="Metropolitan">Metropolitan</option>
                            <option value="Central">Central</option>
                        </select>
                        <input type="submit" value="Update" className='rounded-xl shadow-lg text-2xl h-12 w-fit mx-auto p-2 bg-slate-200'/>
                        <p className='text-lg text-white'>Or <a href="/" className='text-blue-500 underline'>Go Back Home</a></p>
                    </form>
                    :
                    null
                }
            </div> 
        </div>
      ) 
}

export default UpdateTeam