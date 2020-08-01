import React, { Component } from 'react'
import Weather from '../../components/WeatherPage/index'
import { connect } from 'react-redux'
import { requestCurrentWeather } from '../../redux/weather/thunks'
import { withRouter } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import PropTypes from 'prop-types';
import { currentWeatherType, hourlyWeatherType } from '../../types'

class WeatherContainer extends Component {
    refreshWeather = () => {
        let date = this.props.match.params.day
        if (date === undefined) {
            date = new Date().getDate()
        }
        if (this.props.match.params.city) {
            const cityParams = `q=${this.props.match.params.city}`
            this.props.requestCurrentWeather(cityParams, date)
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude
                let lon = position.coords.longitude
                const cityParams = `lat=${lat}&lon=${lon}`
                this.props.requestCurrentWeather(cityParams, date)
            })
        }
    }
    componentDidMount() {
        this.refreshWeather()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.day !== this.props.match.params.day) {
            this.refreshWeather();
        }
    }

    render() {
        if (!this.props.currentWeather || !this.props.hourlyWeather) return <Loader />
        return (
            <Weather
                currentWeather={this.props.currentWeather}
                dailyWeather={this.props.dailyWeather}
                hourlyWeather={this.props.hourlyWeather}
                toggle={this.props.toggle}
                loading={this.props.loading}
            />
        )
    }
}

WeatherContainer.propTypes = {
    currentWeather: PropTypes.shape(currentWeatherType) || null,
    dailyWeather: PropTypes.arrayOf(PropTypes.shape(currentWeatherType)) || null,
    hourlyWeather: PropTypes.arrayOf(PropTypes.shape(hourlyWeatherType)) || null,
    toggle: PropTypes.bool,
    loading: PropTypes.bool,
    requestCurrentWeather: PropTypes.func,
}

const mapStateToProps = (state) => ({
    currentWeather: state.weather.currentWeather,
    dailyWeather: state.weather.dailyWeather,
    hourlyWeather: state.weather.hourlyWeather,
    toggle: state.weather.toggle,
    loading: state.weather.loading,
})
export default withRouter(connect(mapStateToProps,
    { requestCurrentWeather })(WeatherContainer))
