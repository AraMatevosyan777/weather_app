export const ADD_CITY = 'ADD_CITY'
export const ADD_CURRENT_CITY = 'ADD_CURRENT_CITY'
export const DELETE_CITY = 'DELETE_CITY'

export const addCity = (city) => ({ type: ADD_CITY, city })
export const addCurrentCity = (city) => ({ type: ADD_CURRENT_CITY, city })
export const onCityDelete = (id) => ({ type: DELETE_CITY, id })
