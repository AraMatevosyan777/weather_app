import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistedStore } from './redux/store'
import Navbar from './components/Navbar'
import './App.css'
import Routing from './Routes/Routing'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <Router>
          <div className='app'>
            <Navbar />
            <div className='content'>
              <Routing />
            </div>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
