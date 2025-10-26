import React, { useEffect, useRef, useState } from 'react'
import { FaReact } from "react-icons/fa";
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {

const inputRef = useRef();
const[weatherData,setweatherData]=useState(false);
const allicons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
}

    const search = async (city) =>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon =  allicons[data.weather[0].icon]
            setweatherData({
                humidity:data.main.humidity,
                windspeed:data.wind.speed,
                temprature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon,
            })
        } catch (error) {
            
        }
    }

    useEffect(()=>{
         search("Raipur");
     },[])

  return (
    <div className=' w-[25%] bg-blue-300 p-20 self-center flex-col justify-center items-center'>
        <div className='gap-2 flex justify-center items-center'>
            <input ref={inputRef} type="text" placeholder='Search' className=' bg-white rounded-3xl h-10 p-4 outline-neutral-500 border-gray-600' />
            <img src={search_icon} onClick={()=>search(inputRef.current.value)}   className=" text-gray-700 text-xl bg-white rounded-4xl p-2 cursor-pointer " />
        </div>
        <img src={weatherData.icon} alt="" className='w-[150px]'/>
        <p className='text-white text-4xl leading-relaxed '>{weatherData.temprature} C</p>
        <p className='text-white text-2xl '>{weatherData.location}</p>
        <div className='text-white gap-14 flex justify-center items-center mt-10'>
            <div className='flex items-start'>
                <img src={humidity}/>
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span className=' block'>Humidity</span>
                </div>
            </div>
                <div className='flex items-start'>
                <img src={wind}/>
                <div>
                    <p>{weatherData.windspeed}km/h</p>
                    <span className=' block '>Wind Speed</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather