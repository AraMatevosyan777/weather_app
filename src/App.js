import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {Route, Redirect, withRouter} from 'react-router-dom'
import routes from './Routes/publicRoutes'

const App = () => {
    return (
    <div className='app'>
      <Navbar/>
      <div className='content'>
          {routes.map(route => 
            (<Route key={route.path} path={route.path} component={route.component}/>)
          )}
          <Route exact path='/' render={()=> <Redirect to='/weather'/>}/>
      </div>
    </div>
  )
}

export default withRouter(App)
