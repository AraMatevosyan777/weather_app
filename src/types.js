import PropTypes from 'prop-types';

export const currentWeatherType = {
    dt: PropTypes.number,
    dt_txt: PropTypes.string,
    temp: PropTypes.number,
    name: PropTypes.string,
    weather: PropTypes.shape({
        icon: PropTypes.string,
        main: PropTypes.string
    })
}
export const hourlyWeatherType = {
    temp: PropTypes.number,
    dt_txt: PropTypes.string,
    icon: PropTypes.string
}
export const cityType = {
    name: PropTypes.string,
    id: PropTypes.number
}
