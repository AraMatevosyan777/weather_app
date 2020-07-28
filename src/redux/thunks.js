import { addCity, setDailyWeather, setLoading, setCurrentWeather, setHourlyWeather } from "./actions"
import { WeatherAPi } from "../api/api"
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

export const requestCurrentWeather = (cityParams, date) => async (dispatch, getState) => {
    try{
      const response = await WeatherAPi.currentWeather(cityParams)
      dispatch(requestDailyWeather(response.data.name, response.data.dt))
      dispatch(requestWeatherByDay(response.data.name, date))
      const currentCity = {
        name: response.data.name,
        id: Date.now()
      }
      const cities = getState().cities.cities
      if(cities.length === 0){
        dispatch(addCity(currentCity))
      }else{
          if(cities.every(city=> city.name !== currentCity.name)){
            dispatch(addCity(currentCity))
          }
      }
    }catch(e){
      alert('city not found')
      browserHistory.push('/')
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const cityParams = `lat=${lat}&lon=${lon}`
        dispatch(requestCurrentWeather(cityParams))
      })
    }
  }
  
  const requestDailyWeather = (name) => async (dispatch) => {
    const response = await WeatherAPi.dailyWeather(name)
    const daily = response.data.list.filter(item => {
      const currentTime = new Date().getHours()
      const itemTime = new Date(item.dt_txt).getHours()
      if(currentTime >= itemTime && currentTime < itemTime+3){
        return item
      }
    })
    daily.filter(item => {
      const currentDate = new Date()
      const itemDate = new Date(item.dt_txt)
      if (currentDate !== itemDate) return item
    })
    const payload = daily.map(item=>{
      item = {
        dt: item.dt,
        dt_txt: item.dt_txt,
        temp: item.main.temp, 
        name: name,
        weather: {
          icon: item.weather[0].icon,
          main: item.weather[0].main
        }
      }
      return item
    })
    dispatch(setDailyWeather(payload))
  }
  
  const requestWeatherByDay = (name, date) => async (dispatch) => {
    dispatch(setLoading(true))
    const response = await WeatherAPi.dailyWeather(name)
    const current = response.data.list.filter(item => {
      const itemDate = new Date(item.dt_txt).getDate()
      const itemHour = new Date(item.dt_txt).getHours()
      const currentTime = new Date().getHours()
      if(itemDate == date && currentTime >= itemHour && currentTime < itemHour+3){
        return item
      }
    })
    const currentWeather = {
      ...response.data.city,
      ...current[0]
    }
    dispatch(setCurrentWeather(currentWeather))
  
    const hourly = response.data.list.filter(item => {
      const itemDate = new Date(item.dt_txt).getDate()
      if (itemDate == date) return item
    })
    const payload = hourly.map(item=> {
        item = {
          temp: item.main.temp,
          dt_txt: item.dt_txt,
          icon: item.weather[0].icon
        }
        return item
      })
    dispatch(setHourlyWeather(payload))
    dispatch(setLoading(false))
  }
  
  
  