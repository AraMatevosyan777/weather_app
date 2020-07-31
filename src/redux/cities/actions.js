export const ADD_CITY = 'ADD_CITY'
export const DELETE_CITY = 'DELETE_CITY'
export const UPDATE_CITY = 'UPDATE_CITY'

export const addCity = (city) => ({ type: ADD_CITY, city })
export const onCityDelete = (id) => ({ type: DELETE_CITY, id })
export const updateCity = (name, id) => ({ type: UPDATE_CITY, name, id })