import React from 'react'
import Loading from '../Loader'
import { currentWeatherType } from '../../types'
import PropTypes from 'prop-types';

const CurrentWeather = ({currentWeather, toggle, loading}) => {
    const { name, temp, weather } = currentWeather
    const celsius = Math.floor(temp - 273.15)
    const fahrenheit = Math.floor((celsius * 9 / 5) + 32)
    
    if(loading)return <Loading/>
    return (
        <>
            <h3>{name}</h3>
            {toggle
                ? <h1>{celsius}&deg;C</h1>
                : <h1>{fahrenheit}&deg;F</h1>
            }
            <img src={'http://openweathermap.org/img/wn/' + weather.icon + '@4x.png'} alt="" />
            <h4>{weather.main}</h4>
        </>
    )
}

CurrentWeather.propTypes = {
    currentWeather: PropTypes.shape(currentWeatherType) || null,
    toggle: PropTypes.bool,
    loading: PropTypes.bool,
}

export default CurrentWeather
