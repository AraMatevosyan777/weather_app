import React from 'react'
import m from './weather.module.css'
import DailyWeather from './DailyWeather'
import CurrentWeather from './CurrentWeather'
import HourlyWeather from './HourlyWeather'

const Weather = (props) => {
    const { currentWeather, dailyWeather, hourlyWeather, requestWeatherByDay, toggle, loading} = props
   
    return (
        <div className={m.weather}>
            <div className={m.currentWeather}>
                <CurrentWeather currentWeather={currentWeather} toggle={toggle} loading={loading}/>
            </div>
            <div className={m.hourlyWeather}>
                {hourlyWeather.map(hourly=> <HourlyWeather key={hourly.dt} hourly={hourly} toggle={toggle}/>)}
            </div>
            <div className={m.dailyWeather}>
                {dailyWeather.map(daily=> 
                <DailyWeather 
                key={daily.dt} 
                daily={daily} 
                toggle={toggle}
                requestWeatherByDay={requestWeatherByDay}
                dt={currentWeather.dt}
                name={currentWeather.name}/>)}
            </div>
        </div>
    )
}

export default Weather
