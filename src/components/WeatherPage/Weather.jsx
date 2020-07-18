import React, { useEffect } from 'react'
import m from './weather.module.css'
import { connect } from 'react-redux'
import { requestCurrentWeather, requestCityWeather, requestWeatherByDay } from '../../redux/weatherReducer'
import { withRouter } from 'react-router-dom'
import Loader from '../Loader'
import DailyWeather from './DailyWeather'
import CurrentWeather from './CurrentWeather'
import HourlyWeather from './HourlyWeather'

const Weather = (props) => {
    const {requestCurrentWeather, requestCityWeather, currentWeather, 
        match, dailyWeather, hourlyWeather, requestWeatherByDay, toggle} = props
    useEffect(() => {
        if(match.params.city){
            requestCityWeather(match.params.city)
        }else{
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude
                let lon = position.coords.longitude
                requestCurrentWeather(lat, lon)
            })
        }
    }, [match.params.city, requestCityWeather, requestCurrentWeather])
   
    if (!currentWeather) return <Loader/>
    return (
        <div className={m.weather}>
            <CurrentWeather currentWeather={currentWeather} toggle={toggle}/>
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

const mapStateToProps = (state) => ({
    currentWeather: state.weather.currentWeather,
    dailyWeather: state.weather.dailyWeather,
    hourlyWeather: state.weather.hourlyWeather,
    toggle: state.weather.toggle
})
export default withRouter(connect(mapStateToProps, 
    { requestCurrentWeather, requestCityWeather, requestWeatherByDay })(Weather))
