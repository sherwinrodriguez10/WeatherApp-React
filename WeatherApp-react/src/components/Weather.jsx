import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search_icon from '../assets/search.png'
import Cloud_icon from '../assets/cloud.png'
import Drizzle_icon from '../assets/drizzle.png'
import Humidity_icon from '../assets/humidity.png'
import Snow_icon from '../assets/snow.png'
import Clear_icon from '../assets/clear.png'
import Rain_icon from '../assets/rain.png'
import Wind_icon from '../assets/wind.png'
const Weather = () => {
  const inputref = useRef()
  const [weatherdata,setdata]= useState(false)
  const allIcons={
    "01d":Clear_icon,
    "01n":Clear_icon,
    "02d":Cloud_icon,
    "02n":Cloud_icon,
    "03d":Cloud_icon,
    "03n":Cloud_icon,
    "04d":Drizzle_icon,
    "04n":Drizzle_icon,
    "09d":Rain_icon,
    "09n":Rain_icon,
    "010d":Rain_icon,
    "010n":Rain_icon,
    "013d":Snow_icon,
    "013n":Snow_icon,

  }
  const search = async (city) =>{
    if(city===""){
      alert("enter city name")
      return
    }
    try{
      const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
    const response = await fetch(url);
    const data = await response.json();
    if(!response.ok){
      alert(data.message)
      return
    }
    console.log(data)
    const icon = allIcons[data.weather[0].icon] || Clear_icon;
    setdata({
      humidity: data.main.humidity,
      windSpeed:data.wind.speed,
      temperature:Math.floor(data.main.temp),
      location:data.name,
      icon: icon
    })
    }
    catch(error){
      setdata(false)
      console.error("error in fetching data")
    }
  }
  useEffect(()=>{
    search("himalaya")
  },[])
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputref} type='text' placeholder='Search' />
            <img onClick={()=>search(inputref.current.value)} src={Search_icon} alt=''/>
        </div>
        {weatherdata?<>
          <img src={weatherdata.icon} alt='' className='weather-icon'></img>
        <p className='temp'>{weatherdata.temperature}</p>
        <p className='location'>{weatherdata.location}</p>
        <div className='weather-data'>
          <div className="col">
            <img src={Humidity_icon} alt="" />
            <div>
              <p>{weatherdata.humidity}</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={Wind_icon} alt="" />
            <div>
              <p>{weatherdata.windSpeed}Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </>:<></>}
        
    </div>
  )
}

export default Weather