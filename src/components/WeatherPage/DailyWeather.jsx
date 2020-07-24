import React from 'react'
import m from './weather.module.css'
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const DailyWeather = ({ daily, toggle, name, requestWeatherByDay, dt }) => {
  const celsius = Math.floor(daily.main.temp - 273.15)
  const fahrenheit = Math.floor((celsius * 9 / 5) + 32)
  const date = daily.dt_txt.slice(5, 10)
  const currentDate = new Date(dt * 1000).getDate()
  const itemDate = new Date(daily.dt * 1000).getDate()
  return (
    <NavLink to={`/weather/${name}/${itemDate}`} style={{color:'black', textDecoration:'none'}}>
      <div className={classNames(m.DailyWeatheritem, currentDate === itemDate && m.currentDay)}>
        <div className="date">{date}</div>
        <div>
          {toggle
            ? <h2>{celsius}&deg;C</h2>
            : <h2>{fahrenheit}&deg;F</h2>
          }
          <img src={'http://openweathermap.org/img/wn/' + daily.weather[0].icon + '.png'} alt="" />
        </div>
      </div>
    </NavLink>
  )
}

export default DailyWeather
