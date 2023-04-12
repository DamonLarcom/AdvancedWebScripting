import moment from 'moment'

const WeatherTile = ({content}) => {
    return (
        <div className="flex flex-col w-56 h-72 shadow-2xl rounded-xl bg-slate-400 text-center p-5">
            <div id="top" className="flex justify-around">
                <div id="low" className="flex flex-col text-sm md:text-md justify-center font-chivo">
                    <p>Low</p>
                    <p>{Math.round(content.low_temp)}&deg;F</p>
                </div>
                <img src={`/icons/${content.weather.icon}.png`} alt="" className="mx-auto h-20 w-20"/>  
                <div id="hi" className="flex flex-col text-sm md:text-md justify-center font-chivo">
                    <p>High</p>
                    <p>{Math.round(content.high_temp)}&deg;F</p>
                </div>
            </div>
            <p className="font-chivo text-md border-b-[2px] border-black">{content.weather.description}</p>
            <p className="font-chivo text-md border-b-[2px] border-black">{moment(content.valid_date).format("MMMM Do YYYY")}</p>
            <div id="bottomstats"className='flex flex-col p-5'>
                <div className="flex font-chivo text-sm md:text-md justify-between">
                    <p className='mb-1'>Sunrise:</p>
                    <p>{moment(content.sunrise_ts).format("h:mm A")}</p>
                </div>
                <div className="flex font-chivo text-sm md:text-md justify-between">
                    <p className='mb-3'>Precipitation:</p>
                    <p>{Math.round(content.pop)}%</p>
                </div>
                <div className="flex font-chivo text-sm md:text-md justify-between">
                    <p className='mb-1'>Sunset:</p>
                    <p>{moment(content.sunset_ts).format("h:mm A")}</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherTile;