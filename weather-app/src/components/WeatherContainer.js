import { useState, useEffect } from "react"
import WeatherTile from "./WeatherTile"
import config from '../resources/config.json'
import mockdata from "../resources/mockdata.json"
import { SyncLoader } from "react-spinners";

const WeatherContainer = ({search}) => {
    const [forecast, setForecast] = useState({})
    const [loading, setLoading] = useState(true)
    const [isError, setError] = useState(false)

    useEffect(() => {
        setError(false)
        setTimeout(() => {
            if(loading){
                setError(true)
            }
        },7000)
        fetchData()
    },[search])
    
    const fetchData = async() => {
        if(search !== '' && search !== null){
        await fetch(`${config.apiUrl}&city=${search}`)
            .then(res => res.json())
            .then(data => {
                setForecast(data)
                setLoading(false)
            }).catch((e) => {
                console.log('caught exception:' + e)
            })
        }
    }

    return (
        <>
            {loading? 
                <>
                    <p className="text-lg md:text-3xl text-white font-chivo"><SyncLoader color="#FFF"/></p>
                    {/* Flex on this p tag is to put the frowny face inline with the text */}
                    {isError? <p className="text-md md:text-3xl text-red-500 font-chivo flex mt-5">An error occurred while searching for this city.</p> : null}
                </>
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