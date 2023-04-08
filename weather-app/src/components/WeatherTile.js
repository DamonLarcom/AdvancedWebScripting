import moment from 'moment'

const WeatherTile = ({content}) => {
    return (
        <div className="flex flex-col w-72 md:h-96 md:w-80 shadow-2xl rounded-xl bg-slate-400 text-center p-5">
            <div id="top" className="flex justify-around">
                <div id="low" className="flex flex-col text-md md:text-xl justify-center font-chivo">
                    <p>Low</p>
                    <p>{content.low_temp}&deg;F</p>
                </div>
                <img src={`/icons/${content.weather.icon}.png`} alt="" className="mx-auto h-20 w-20 md:h-36 md:w-36"/>  
                <div id="hi" className="flex flex-col text-md md:text-xl justify-center font-chivo">
                    <p>High</p>
                    <p>{content.high_temp}&deg;F</p>
                </div>
            </div>
            <p className="font-chivo text-md md:text-lg border-b-[2px] border-black">{content.weather.description}</p>
            <p className="font-chivo text-md md:text-lg border-b-[2px] border-black">{moment(content.valid_date).format("MMMM Do YYYY")}</p>
            <div id="bottomstats"className='flex justify-around'>
                <div className="flex flex-col font-chivo text-md md:text-xl py-5">
                    <p className='mb-1'>Sunrise</p>
                    <p>{moment(content.sunrise_ts).format("h:mm A")}</p>
                </div>
                <div className="flex flex-col font-chivo mx-5 border-black border-x-[2px] p-5">
                    <p className='mb-3'>Precip</p>
                    <p className='text-2xl md:text-3xl'>{content.pop}%</p>
                </div>
                <div className="flex flex-col font-chivo text-md md:text-xl py-5">
                    <p className='mb-1'>Sunset</p>
                    <p className='text-lg md:text-xl'>{moment(content.sunset_ts).format("h:mm A")}</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherTile;