import {useEffect, useState} from 'react'
import Nav from '../components/Nav'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/Auth'
import conf from "../conf.json"
import ApplicationRow from '../components/ApplicationRow'
import {AiOutlinePlus} from 'react-icons/ai'
import { SyncLoader } from "react-spinners";

const Home = () => {
  const [apps, setApps] = useState([])
  const [filteredApps, setFilteredApps] = useState([])
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(true)

  const noApplications = filteredApps.length === 0

  const auth = useAuth()
  const navigate = useNavigate()

  const filterApps = () => {
    let shown = apps.filter(app => app.company.toLowerCase().includes(filter) || app.status.toLowerCase().includes(filter))
    setFilteredApps(shown)
  }

  useEffect(() => {
    if(auth.user) {
      fetch(conf.url + `/apps/${auth.user.username}`, {
        headers: {
          "Authorization": JSON.parse(localStorage.getItem("creds"))
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.data) {
          setApps(data.data)
          setFilteredApps(data.data)
        }
        setLoading(false)
      })
    }
  },[])

  useEffect(() => {
    filterApps()
  },[filter])

  return (
    <div className='h-screen flex flex-col text-white'>
      <Nav/>
      {
        auth.user?
            <div className='h-screen m-10 w-3/4 mx-auto'>
              {loading?
                <div className='flex mx-auto justify-center'>
                  <SyncLoader color="#FFF" />
                </div>
                
              :
                <>
                  <div className='flex justify-end m-2 text-xl gap-5'>
                    <input type="text" placeholder='Filter applications' className='rounded-full text-center text-black' onChange={e => setFilter(e.target.value)}/>
                    <button className='flex rounded-full w-fit p-5 h-[25px] justify-center items-center bg-green-500 text-black' onClick={() => navigate("/app/create")}>
                      <AiOutlinePlus/> Add Application
                    </button>
                  </div>
                  <table className='w-full h-fit overflow-y-scroll border-2 border-white'>
                    <tr>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Title</th>
                      <th>Date Applied</th>
                      <th className='w-1/3'>Link</th>
                    </tr>
                    {
                      !noApplications?
                        filteredApps.sort((a,b) => a.application_date < b.application_date).map((app, index) => (
                          <ApplicationRow app={app} key={index} onClick={() => console.log("clicked")}/>
                        ))
                      :
                      null
                    }
                  </table>
                  {noApplications? <h1 className='text-xl mt-2 text-center'>No Applications to show.</h1>: null}
                </>}
            </div>
        :
        <Navigate to="/login"/>
      }
    </div>
  )
}

export default Home