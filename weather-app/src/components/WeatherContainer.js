import { useState, useEffect } from "react"
import WeatherTile from "./WeatherTile"
import config from '../resources/config.json'
import mockdata from "../resources/mockdata.json"
import axios from "axios";
import { SyncLoader } from "react-spinners";

const WeatherContainer = ({search}) => {
    const [forecast, setForecast] = useState(mockdata)
    const [loading, setLoading] = useState(false)
    const [isError, setError] = useState(false)

    // useEffect(() => {
    //     setError(!isError)
    //     fetchData()
    // },[search])
    
    // const fetchData = async() => {
    //     await axios.get(`${config.apiUrl}&city=${search}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setForecast(data)
    //             setLoading(!loading)
    //         }).catch(() => {
    //             setError(true)
    //         })
    // }

    return (
        <>
            {loading? 
                <p className="text-lg md:text-3xl text-white font-chivo">{isError? "An error occurred." : <SyncLoader color="#FFF"/>}</p>
                :
                <div className="text-center">
                    <h2 className="text-lg md:text-3xl text-white font-chivo">{forecast? `Displaying results for ${forecast.city_name}, ${forecast.state_code}, ${forecast.country_code}`: null}</h2>
                    <div className="flex my-10 flex-wrap gap-5 justify-center">
                        {forecast.data.map((item, index) => {
                            return (
                                <WeatherTile key={index} content={item}/>
                            )
                        })}  
                    </div>  
                </div>              
            }             
        </>     
    )
}

export default WeatherContainer