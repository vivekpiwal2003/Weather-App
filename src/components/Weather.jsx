import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import hero_icon from "../assets/hero.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"

const Weather = () => {

  const inputRef= useRef()

  const [weatherData,setWeatherData] = useState(false)

  const allIcons= {
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "010d":rain_icon,
    "010n":rain_icon,
    "013d":snow_icon,
    "013n":snow_icon
  }

  const search = async (city)=>{
    if(city=== ""){
      alert("Enter City Name ");
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url)
      const data = await response.json()
      if(!response.ok){
        alert(data.message)
        return        
      }
      console.log(data);
      const icons= allIcons[data.weather[0].icon ]|| clear_icon
      setWeatherData({
        humidity :data.main.humidity,
        windspeed:data.wind.speed,
        temperature : Math.floor(data.main.temp),
        location : data.name,
        icon:icons
      })
    } catch (error) {
      setWeatherData(false)
      console.error("Error in fetching data")

    }
  }

  useEffect(()=>{
    search("New Delhi")
  },[])

  return (
    <div className='weather'>

      <div className="search-bar">
        <input type="text"  placeholder='Search' ref={inputRef}/>
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>


      {weatherData?
        <>
        
      <img src={weatherData.icon} alt="" className='weather-icon'/>
      <p className='temp'>{weatherData.temperature}°c</p>
      <p className='city'>{weatherData.location}</p>

      <div className="weather-data">

        {/* For humidity  */}
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        {/* For wind Speed */}

        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windspeed}km/h</p>
            <span>Wind Speed </span>
          </div>
        </div>

      </div>


        </> :
        
        <></>
        }

    </div>
  )
}

export default Weather
