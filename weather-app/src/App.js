import { useRef, useState} from "react";
import WeatherContainer from "./components/WeatherContainer";

function App() {
  const [city, setCity] = useState('')
  const cityRef = useRef(null)

  return (
    <div className="App">
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-800">
        <h1 className="text-5xl text-white">5-day Forecast</h1>
        <div id="city" className="flex">
           <input type="text" className="w-56 h-16 text-2xl rounded-md text-center my-5 mx-2" placeholder="Enter a city.." ref={cityRef}/>
          <button className="w-36 h-16 text-white rounded-lg shadow-xl bg-slate-400 my-5 mx-2" onClick={() => setCity(cityRef.current.value)}>Update City</button>
        </div>
        {city? 
          <WeatherContainer search={city}/>
          :
          null
        }
      </div> 
    </div>
  );
}

export default App;
