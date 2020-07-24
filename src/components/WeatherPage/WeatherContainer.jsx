import React, { Component } from 'react'
import Weather from './Weather'
import { connect } from 'react-redux'
import { requestCurrentWeather, requestWeatherByDay } from '../../redux/weatherReducer'
import { withRouter } from 'react-router-dom'
import Loader from '../Loader'

class WeatherContainer extends Component {
    refreshWeather = () => {
        let date = this.props.match.params.day
        if(date === undefined){
            date = new Date().getDate()
        }
        if(this.props.match.params.city){
            const cityParams = `q=${this.props.match.params.city}`
            this.props.requestCurrentWeather(cityParams, date)
        }else{
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude
                let lon = position.coords.longitude
                const cityParams = `lat=${lat}&lon=${lon}`
                this.props.requestCurrentWeather(cityParams, date)
            })
        }
    }
    componentDidMount(){
        this.refreshWeather()
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.match.params.day !== this.props.match.params.day){
            this.refreshWeather();
          }
    }
  render() {
    if (!this.props.currentWeather) return <Loader/>
    return (
      <Weather 
      currentWeather={this.props.currentWeather}
      dailyWeather={this.props.dailyWeather}
      hourlyWeather={this.props.hourlyWeather}
      requestWeatherByDay={this.props.requestWeatherByDay}
      toggle={this.props.toggle}
      loading={this.props.loading}
      />
    )
  }
}
const mapStateToProps = (state) => ({
    currentWeather: state.weather.currentWeather,
    dailyWeather: state.weather.dailyWeather,
    hourlyWeather: state.weather.hourlyWeather,
    toggle: state.weather.toggle,
    loading: state.weather.loading,
})
export default withRouter(connect(mapStateToProps, 
    { requestCurrentWeather, requestWeatherByDay })(WeatherContainer))
