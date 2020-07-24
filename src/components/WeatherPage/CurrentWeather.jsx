import React from 'react'
import m from './weather.module.css'
import Loading from '../Loader'

const CurrentWeather = ({currentWeather, toggle, loading}) => {
    const { name, main, weather } = currentWeather
    const celsius = Math.floor(main.temp - 273.15)
    const fahrenheit = Math.floor((celsius * 9 / 5) + 32)
    
    if(loading)return <Loading/>
    return (
        <>
            <h3>{name}</h3>
            {toggle
                ? <h1>{celsius}&deg;C</h1>
                : <h1>{fahrenheit}&deg;F</h1>
            }
            <img src={'http://openweathermap.org/img/wn/' + weather[0].icon + '@4x.png'} alt="" />
            <h4>{weather[0].main}</h4>
        </>
    )
}

export default CurrentWeather
