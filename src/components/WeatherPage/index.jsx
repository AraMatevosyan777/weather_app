import React from 'react'
import m from './weather.module.css'
import DailyWeather from './DailyWeather'
import CurrentWeather from './CurrentWeather'
import HourlyWeather from './HourlyWeather'
import PropTypes from 'prop-types';
import { currentWeatherType, hourlyWeatherType } from '../../types'

const Weather = ({ currentWeather, dailyWeather, hourlyWeather, toggle, loading}) => {
   
    return (
        <div className={m.weather}>
            <div className={m.currentWeather}>
                <CurrentWeather currentWeather={currentWeather} toggle={toggle} loading={loading}/>
            </div>
            <div className={m.hourlyWeather}>
                {hourlyWeather.map(hourly=> <HourlyWeather key={hourly.dt_txt} hourly={hourly} toggle={toggle}/>)}
            </div>
            <div className={m.dailyWeather}>
                {dailyWeather.map(daily=> 
                <DailyWeather 
                key={daily.dt} 
                daily={daily} 
                toggle={toggle}
                dt={currentWeather.dt}
                name={currentWeather.name}/>)}
            </div>
        </div>
    )
}

Weather.propTypes = {
    currentWeather: PropTypes.shape(currentWeatherType) || null,
    dailyWeather:  PropTypes.arrayOf(PropTypes.shape(currentWeatherType)) || null,
    hourlyWeather: PropTypes.arrayOf(PropTypes.shape(hourlyWeatherType)) || null,
    toggle: PropTypes.bool,
    loading: PropTypes.bool,
}

export default Weather
