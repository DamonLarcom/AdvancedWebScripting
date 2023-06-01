import {useEffect, useState} from 'react'
import conf from "../conf.json"
import {SyncLoader} from "react-spinners"
import { useParams, Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import {TiDelete} from "react-icons/ti"
import { useNavigate } from 'react-router-dom'

const AppDetails = () => {
    const [application, setApplication] = useState({})

    const [company, setCompany] = useState("")
    const [roleTitle, setRoleTitle] = useState("")
    const [status, setStatus] = useState("")
    const [link, setLink] = useState("")
    const [skills, setSkills] = useState([])
    const [skill, setSkill] = useState('')

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isEditable, setEditable] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(conf.url + `/apps/id/${id}`, {
            mode: "cors",
            headers : {
                "Authorization": JSON.parse(localStorage.getItem("creds"))
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.data) {
                setApplication(data.data)
            }
        })
    },[])

    useEffect(() => {
        setCompany(application.company)
        setRoleTitle(application.title)
        setStatus(application.status)
        setLink(application.link)
        setSkills(application.skills)
        setLoading(false)
    }, [application])

    const handleUpdate = (e) => {
        e.preventDefault()
        fetch(conf.url + `/apps/${id}`, {
            method: "PUT",
            mode: "cors",
            headers :{
                "Authorization" : JSON.parse(localStorage.getItem("creds"))
            },
            body: JSON.stringify({company: company, title: roleTitle, status: status, link: link, skills: skills})
        }).then(navigate(`/`))
    }

    const addSkill = (e,skill) => {
        e.preventDefault()

        if(skill.includes(",")) {
            let skillsList
            if(skills) {
                skillsList = skill.split(",").concat(skills)
            } else {
                skillsList = skill.split(",")
            }
            setSkills(skillsList)
        } else {
            if(skills) {
                setSkills([...skills, skill])
            } else {
                setSkills([skill])
            }
        }
        setSkill("")
    }

    const removeSkill = (index) => {
        let left = skills.slice(0, index)
        let right = skills.slice(index + 1)
        setSkills([...left,...right])
    }

  return (
    <div className='h-screen flex justify-center items-center'>
        {loading?
            <SyncLoader color="#FFF"/>
            :
            <div className='bg-slate-600 rounded-xl shadow-xl w-1/2 h-fit text-center p-5 flex flex-col'>
                <div className='flex justify-center m-5'>
                    <button className='flex rounded-full w-fit p-5 h-[25px] justify-center items-center bg-yellow-500 text-black' onClick={() => {setEditable(!isEditable)}}>
                        <AiOutlinePlus/> Toggle Edit Mode
                    </button>
                </div>
                <div className='flex text-white'>
                    <div className='w-full text-black flex flex-col gap-5'>
                        <div className='flex gap-5 mx-auto'>
                            <h2 className='text-2xl'>Details</h2>
                            {isEditable?
                                <p className='text-2xl text-green-600 font-bold'>Edits Enabled</p>
                                :
                                <p className='text-2xl text-red-600 font-bold'>Edits Disabled</p>
                            }
                        </div>
                        <input disabled type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} className='h-10 rounded-lg p-2'/>
                        <input disabled={!isEditable} type="text" placeholder="Role Title" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} className='h-10 rounded-lg p-2'/>
                        <input disabled={!isEditable} type="text" placeholder="Link to job post" value={link} onChange={(e) => setLink(e.target.value)} className='h-10 rounded-lg p-2'/>
                        <select disabled={!isEditable} value={status} onChange={(e) => setStatus(e.target.value)} className='h-10 rounded-lg p-2'>
                            <option value="">--Select Application Status--</option>
                            <option value="Submitted">Submitted</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Deferred">Deferred for another role</option>
                        </select>
                        {isEditable?
                            <button disabled={!isEditable} className={'flex justify-center rounded-full w-fit p-5 h-[25px] items-center text-black bg-blue-500'}
                                onClick={handleUpdate}>Apply Changes</button>
                            :
                            null
                        }
                    </div>
                    <div className='w-full p-10'>
                        <h2 className='text-2xl'>Skills</h2>
                        {isEditable?
                            <div className='flex justify-center mb-5 text-black'>
                                <input type="text" placeholder="Skill" value={skill} onChange={(e) => setSkill(e.target.value)} className='h-10 rounded-lg p-2 w-full'/>
                                <button className='flex rounded-full w-auto h-10 p-3 mx-2 bg-green-500 text-black' onClick={(e) => addSkill(e,skill)}>
                                    <AiOutlinePlus/>
                                </button>
                            </div>
                            :
                            null
                        }
                        {skills?
                            <div className='flex justify-center flex-wrap gap-2'>
                                {skills.map((skill, index) => (
                                    <div className='flex w-fit h-fit px-2 bg-slate-400 rounded-lg shadow-lg text-xl items-center gap-1'>
                                        <p>{skill}</p>
                                        {isEditable? <TiDelete className='text-xl items' onClick={() => removeSkill(index)}/>: null}
                                    </div>
                                ))}
                            </div>
                            :
                            <h1>No Skills to display</h1>
                        }
                    </div>
                </div>
                {error? <p className='text-red-600 text-md'>Company Name & Status are required fields</p> : null}
                <Link to="/login" className='text-xl underline text-blue-500 mt-10'>Back to home</Link>
            </div>
        }
    </div>
  )
}

export default AppDetails