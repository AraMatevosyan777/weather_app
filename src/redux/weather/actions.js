export const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER'
export const SET_DAILY_WEATHER = 'SET_DAILY_WEATHER'
export const SET_HOURLY_WEATHER = 'SET_HOURLY_WEATHER'
export const SET_TOGGLE = 'SET_TOGGLE'
export const LOADING = 'LOADING'

export const setCurrentWeather = (payload) => ({ type: SET_CURRENT_WEATHER, payload })
export const setDailyWeather = (payload) => ({ type: SET_DAILY_WEATHER, payload })
export const setHourlyWeather = (payload) => ({ type: SET_HOURLY_WEATHER, payload })
export const setToggle = (payload) => ({ type: SET_TOGGLE, payload })
export const setLoading = (payload) => ({ type: LOADING, payload })