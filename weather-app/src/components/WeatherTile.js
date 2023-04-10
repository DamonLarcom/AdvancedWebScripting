import moment from 'moment'

const WeatherTile = ({content}) => {
    return (
        <div className="flex flex-col w-[20%] md:h-80 md:w-80 shadow-2xl rounded-xl bg-slate-400 text-center p-5">
            <div id="top" className="flex justify-around">
                <div id="low" className="flex flex-col text-md md:text-xl justify-center font-chivo">
                    <p>Low</p>
                    <p>{Math.round(content.low_temp)}&deg;F</p>
                </div>
                <img src={`/icons/${content.weather.icon}.png`} alt="" className="mx-auto h-20 w-20 md:h-36 md:w-36"/>  
                <div id="hi" className="flex flex-col text-md md:text-lg justify-center font-chivo">
                    <p>High</p>
                    <p>{Math.round(content.high_temp)}&deg;F</p>
                </div>
            </div>
            <p className="font-chivo text-md md:text-lg border-b-[2px] border-black">{content.weather.description}</p>
            <p className="font-chivo text-md md:text-lg border-b-[2px] border-black">{moment(content.valid_date).format("MMMM Do YYYY")}</p>
            <div id="bottomstats"className='flex justify-around'>
                <div className="flex flex-col font-chivo text-sm md:text-md py-2 ml-5">
                    <p className='mb-1'>Sunrise</p>
                    <p className="text-lg">{moment(content.sunrise_ts).format("h:mm A")}</p>
                </div>
                <div className="flex flex-col font-chivo mx-5 border-black border-x-[2px] p-3 text-sm md:text-md">
                    <p className='mb-3'>Precip</p>
                    <p className='text-lg md:text-xl'>{Math.round(content.pop)}%</p>
                </div>
                <div className="flex flex-col font-chivo text-sm md:text-md py-2 mr-5">
                    <p className='mb-1'>Sunset</p>
                    <p className='text-lg'>{moment(content.sunset_ts).format("h:mm A")}</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherTile;