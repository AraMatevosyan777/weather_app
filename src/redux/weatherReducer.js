import { WeatherAPi } from "../api/api"
import { createBrowserHistory } from 'history';
import { addCity } from "./citiesReducer";
export const browserHistory = createBrowserHistory();
const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER'
const SET_DAILY_WEATHER = 'SET_DAILY_WEATHER'
const SET_HOURLY_WEATHER = 'SET_HOURLY_WEATHER'
const SET_TOGGLE = 'SET_TOGGLE'

const initialState = {
  currentWeather: null,
  dailyWeather: [],
  hourlyWeather: [],
  toggle: true
}

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload
      }
    case SET_DAILY_WEATHER:
      return {
        ...state,
        dailyWeather: action.payload
      }
    case SET_HOURLY_WEATHER:
      return {
        ...state,
        hourlyWeather: action.payload
      }
    case SET_TOGGLE:
      return {
        ...state,
        toggle: action.payload
      }
    default: return state
  }
}

const setCurrentWeather = (payload) => ({ type: SET_CURRENT_WEATHER, payload })
const setDailyWeather = (payload) => ({ type: SET_DAILY_WEATHER, payload })
const setHourlyWeather = (payload) => ({ type: SET_HOURLY_WEATHER, payload })
export const setToggle = (payload) => ({ type: SET_TOGGLE, payload })

export const requestCurrentWeather = (lat, lon) => async (dispatch, getState) => {
  const response = await WeatherAPi.currentWeather(lat, lon)
  dispatch(setCurrentWeather(response.data))
  dispatch(requestDailyWeather(response.data.name))
  const currentCity = {
    name: response.data.name,
    id: Date.now()
  }
  const cities = getState().cities.cities
  if(cities.length === 0){
    dispatch(addCity(currentCity))
  }else{
    cities.every(city=>{
      if(city.name !== currentCity.name){
        dispatch(addCity(currentCity))
      }
    })
  }
}

export const requestCityWeather = (name) => async (dispatch) => {
  try {
    const response = await WeatherAPi.cityWeather(name)
    dispatch(setCurrentWeather(response.data))
    dispatch(requestDailyWeather(name))
  } catch{
    alert('city not found')
    browserHistory.push('/weather')
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      dispatch(requestCurrentWeather(lat, lon))
    })
  }
}
const requestDailyWeather = (name) => async (dispatch) => {
  const response = await WeatherAPi.dailyWeather(name)
  const daily = response.data.list.filter(item => {
    // const currentTime = new Date().getHours()
    const itemTime = new Date(item.dt_txt).getHours()
    if (12 === itemTime) {
      return item
    }
    // if(currentTime >= itemTime && currentTime < itemTime+3){
    //   return item
    // }
  })
  daily.filter(item => {
    const currentDate = new Date()
    const itemDate = new Date(item.dt_txt)
    if (currentDate !== itemDate) return item
  })
  dispatch(setDailyWeather(daily))
  const hourly = response.data.list.slice(2, 10).map(item => { return item })
  dispatch(setHourlyWeather(hourly))
}

export const requestWeatherByDay = (name, dt_txt) => async (dispatch) => {
  const response = await WeatherAPi.dailyWeather(name)
  const current = response.data.list.filter(item => item.dt_txt === dt_txt)
  const currentWeather = {
    ...response.data.city,
    ...current[0]
  }
  dispatch(setCurrentWeather(currentWeather))

  const hourly = response.data.list.filter(item => {
    const itemDtTxt = item.dt_txt.slice(0, 10)
    const dtTxt = dt_txt.slice(0, 10)
    if (itemDtTxt === dtTxt) return item
  })
  const hourlyWeather = [
    ...hourly
  ]
  dispatch(setHourlyWeather(hourlyWeather))
}


