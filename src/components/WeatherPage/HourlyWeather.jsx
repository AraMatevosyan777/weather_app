import React from 'react'
import m from './weather.module.css'
import PropTypes from 'prop-types';
import { hourlyWeatherType } from '../../types';

const HourlyWeather = ({hourly, toggle}) => {
    const celsius = Math.floor(hourly.temp - 273.15)
    const fahrenheit = Math.floor((celsius * 9 / 5) + 32)
    const hour = hourly.dt_txt.slice(10)
  return (
    <div className={m.hourlyWeatherItem}>
      <div>{hour}</div>
      {toggle
        ? <div>{celsius}&deg;C</div>
        : <div>{fahrenheit}&deg;F</div>
      }
      <img src={'http://openweathermap.org/img/wn/'+ hourly.icon +'.png'} alt=""/>
    </div>
  )
}

HourlyWeather.propTypes = {
  hourly: PropTypes.shape(hourlyWeatherType),
  toggle: PropTypes.bool,
}

export default HourlyWeather
