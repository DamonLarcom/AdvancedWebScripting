import { useRef, useState} from "react";
import WeatherContainer from "./components/WeatherContainer";
import {BsCloudRainFill} from 'react-icons/bs'

function App() {
  const [city, setCity] = useState('')
  const cityRef = useRef(null)

  return (
    <div className="App">
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-800">
        <div className="flex text-5xl text-white">
          <BsCloudRainFill/>
          <h1 className="font-chivo mx-5">5-day Forecast</h1>
          <BsCloudRainFill/>
        </div>
        
        <div id="city" className="flex">
           <input type="text" className="w-80 h-16 text-2xl rounded-md text-center my-5 mx-2 font-chivo" placeholder="Enter a city.." ref={cityRef}/>
          <button className="w-36 h-16 text-lg text-white font-chivo rounded-lg shadow-xl bg-slate-400 my-5 mx-2" onClick={() => setCity(cityRef.current.value)}>Update City</button>
        </div>
        {city? 
          <WeatherContainer search={city}/>
          :
          <p className="text-3xl text-white">No City Selected..</p>
        }
      </div> 
    </div>
  );
}

export default App;
