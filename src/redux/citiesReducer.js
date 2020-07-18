const ADD_CITY = 'ADD_CITY'
const DELETE_CITY = 'DELETE_CITY'
const UPDATE_CITY = 'UPDATE_CITY'

const initialState = {
  cities: []
}

export const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return {
        ...state,
        cities: [...state.cities, action.city]
      }
    case DELETE_CITY:
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.id)
      }
    case UPDATE_CITY:
      return {
        ...state,
        cities: state.cities.map(city => {
          if (city.id === action.id) {
            city.name = action.name
          }
          return city
        })
      }
    default: return state
  }
}

export const addCity = (city) => ({ type: ADD_CITY, city })
export const onCityDelete = (id) => ({ type: DELETE_CITY, id })
export const updateCity = (name, id) => ({ type: UPDATE_CITY, name, id })