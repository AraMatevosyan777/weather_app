export const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER'
export const SET_DAILY_WEATHER = 'SET_DAILY_WEATHER'
export const SET_HOURLY_WEATHER = 'SET_HOURLY_WEATHER'
export const SET_TOGGLE = 'SET_TOGGLE'
export const LOADING = 'LOADING'
// -----------------------------
export const ADD_CITY = 'ADD_CITY'
export const DELETE_CITY = 'DELETE_CITY'
export const UPDATE_CITY = 'UPDATE_CITY'
// -----------------------------



// weather action creators
export const setCurrentWeather = (payload) => ({ type: SET_CURRENT_WEATHER, payload })
export const setDailyWeather = (payload) => ({ type: SET_DAILY_WEATHER, payload })
export const setHourlyWeather = (payload) => ({ type: SET_HOURLY_WEATHER, payload })
export const setToggle = (payload) => ({ type: SET_TOGGLE, payload })
export const setLoading = (payload) => ({ type: LOADING, payload })

// cities action creators
export const addCity = (city) => ({ type: ADD_CITY, city })
export const onCityDelete = (id) => ({ type: DELETE_CITY, id })
export const updateCity = (name, id) => ({ type: UPDATE_CITY, name, id })