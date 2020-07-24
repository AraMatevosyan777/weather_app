import { WeatherAPi } from "../api/api"
import { createBrowserHistory } from 'history';
import { addCity } from "./citiesReducer";
export const browserHistory = createBrowserHistory();
const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER'
const SET_DAILY_WEATHER = 'SET_DAILY_WEATHER'
const SET_HOURLY_WEATHER = 'SET_HOURLY_WEATHER'
const SET_TOGGLE = 'SET_TOGGLE'
const LOADING = 'LOADING'

const initialState = {
  currentWeather: null,
  dailyWeather: [],
  hourlyWeather: [],
  toggle: true,
  loading: false,
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
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default: return state
  }
}

const setCurrentWeather = (payload) => ({ type: SET_CURRENT_WEATHER, payload })
const setDailyWeather = (payload) => ({ type: SET_DAILY_WEATHER, payload })
const setHourlyWeather = (payload) => ({ type: SET_HOURLY_WEATHER, payload })
export const setToggle = (payload) => ({ type: SET_TOGGLE, payload })
const setLoading = (payload) => ({ type: LOADING, payload })

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
  dispatch(setDailyWeather(daily))
}

export const requestWeatherByDay = (name, date) => async (dispatch) => {
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
  const hourlyWeather = [
    ...hourly
  ]
  dispatch(setHourlyWeather(hourlyWeather))
  dispatch(setLoading(false))
}


