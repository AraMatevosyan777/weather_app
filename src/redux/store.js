import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { weatherReducer } from './weather/weatherReducer'
import { citiesReducer } from './cities/citiesReducer'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'

const reducers = combineReducers({
    weather: weatherReducer,
    cities: citiesReducer
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cities']
}
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))
export const persistedStore = persistStore(store)

// export const store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.store = store;