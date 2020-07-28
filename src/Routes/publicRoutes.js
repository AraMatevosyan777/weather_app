import WeatherContainer from '../components/WeatherPage/index'
import Cities from '../components/CitiesPage/index'
import { CITIES_PATH, WEATHER_PATH } from './paths'

const WEATHER = {
    component: WeatherContainer,
    path: WEATHER_PATH
}
const CITIES = {
    component:  Cities,
    path: CITIES_PATH
}

export default [WEATHER, CITIES]