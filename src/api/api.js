import axios from 'axios'

const instance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`,
})
const API_KEY = '4f854dff31c2e1ca2516bffdbe8c42c1'

export const WeatherAPi = {
    currentWeather(cityParams) {
        return instance.get(`weather?${cityParams}&appid=${API_KEY}`)
    },
    dailyWeather(name) {
        return instance.get(`forecast?q=${name}&appid=${API_KEY}`)
    },
}