import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {Route, Redirect, withRouter} from 'react-router-dom'
import Weather from './components/WeatherPage/Weather'
import Cities from './components/CitiesPage/Cities'

const App = () => {
    return (
    <div className='app'>
      <Navbar/>
      <div className='content'>
        <Route exact path='/' render={()=> <Redirect to='/weather'/>}/> 
        <Route path='/weather/:city?' render={()=> <Weather/>}/> 
        <Route path='/cities' render={()=> <Cities/>}/>
      </div>
    </div>
  )
}

export default withRouter(App)
