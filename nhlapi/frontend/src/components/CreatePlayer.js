import { useEffect, useRef, useState } from "react";
import conf from "../global.json"

const CreatePlayer = () => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [teams, setTeams] = useState([])

    const firstName = useRef();
    const lastName = useRef();
    const position = useRef();
    const team = useRef();
    const status = useRef();
    const birthdate = useRef();
    const birthCity = useRef();
    const birthState = useRef();
    const height = useRef();
    const weight = useRef();
    const jersey = useRef();

    useEffect(() => {
        fetch(conf.url + conf.endpoints.teams)
        .then(res => res.json())
        .then(data => {
            setTeams(data)
            setLoading(false)
        })
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError(false)
        if(!firstName.current.value.length > 0 && !lastName.current.value.length > 0 &&
            !position.current.value.length > 0 && !team.current.value.length > 0 && !status.current.value.length > 0 &&
            !birthdate.current.value.length > 0 && !birthCity.current.value.length > 0 && !birthState.current.value.length > 0 &&
            !height.current.value.length > 0 && !weight.current.value.length > 0 && !jersey.current.value.length > 0)
        {
            setError(true)
        } else {
            await fetch(conf.url + conf.endpoints.players + `?key=${JSON.parse(localStorage.getItem("user")).key}`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(
                    {
                        first_name: firstName.current.value,
                        last_name: lastName.current.value,
                        status: status.current.value,
                        team: team.current.value,
                        position: position.current.value,
                        jersey: parseInt(jersey.current.value),
                        height: parseInt(height.current.value),
                        weight: parseInt(weight.current.value),
                        birth_date: birthdate.current.value,
                        birth_city: birthCity.current.value,
                        birth_state: birthState.current.value
                    }
                )
            })
            window.location = "/"
        }
    }
    return (
        <div className='flex h-fit justify-center'>
            <div className="flex flex-col gap-5 bg-slate-700 w-[30%] h-fit text-center p-5 rounded-xl shadow-lg">
                <h1 className="text-5xl text-white">New Player</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
                    <input type="text" placeholder='First Name' className="w-[75%] p-5 rounded-xl text-xl mx-auto" ref={firstName}/>
                    <input type="text" placeholder='Last Name' className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={lastName}/>
                    <input type="text" placeholder='Birthdate' className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={birthdate}/>
                    <input type="text" placeholder='Birth City' className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={birthCity}/>
                    <input type="text" placeholder='Birth State' className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={birthState}/>
                    <input type="text" placeholder='Height (in)' className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={height}/>
                    <input type="text" placeholder='Weight (lb)' className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={weight}/>
                    <input type="text" placeholder="Jersey Number" className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={jersey}/>
                    <select name="status" className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={status}>
                        <option value="">--Select a status--</option>
                        <option value="Active">Active</option>
                        <option value="Injured Reserve">Injured Reserve</option>
                    </select>
                    <select name="position" className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={position}>
                        <option value="">--Select a position--</option>
                        <option value="G">Goaltender</option>
                        <option value="D">Defenseman</option>
                        <option value="LW">Left Wing</option>
                        <option value="C">Center</option>
                        <option value="RW">Right Wing</option>
                    </select>
                    <select name="team" className='w-[75%] p-5 rounded-xl text-xl mx-auto' ref={team}>
                        <option value="">--Select a Team--</option>
                        {!loading?
                            teams.sort((a,b) => a.name.full > b.name.full).map(team => (
                                <option value={team.name.abbrev}>{team.name.full}</option>
                            ))
                        :
                        null
                        }
                    </select>
                    <input type="submit" value="Add" className='rounded-xl shadow-lg text-2xl h-16 w-[20%] mx-auto bg-slate-200'/>
                </form>
                {
                  error?
                    <h1 className='text-red-500'>Not all fields are populated.</h1>
                    :
                    null
                }
            </div> 
        </div>
      ) 
}

export default CreatePlayer