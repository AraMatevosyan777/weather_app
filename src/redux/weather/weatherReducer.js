import { SET_CURRENT_WEATHER, SET_DAILY_WEATHER, SET_HOURLY_WEATHER, SET_TOGGLE, LOADING } from "./actions";

const initialState = {
  currentWeather: null,
  dailyWeather: null,
  hourlyWeather: null,
  toggle: true,
  loading: false,
}

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_WEATHER:
      const currentWeather = {
        dt: action.payload.dt,
        dt_txt: action.payload.dt_txt,
        temp: action.payload.main.temp,
        name: action.payload.name,
        weather: {
          icon: action.payload.weather[0].icon,
          main: action.payload.weather[0].main
        }
      }
      return {
        ...state,
        currentWeather: currentWeather
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



