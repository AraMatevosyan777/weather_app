import { DELETE_CITY, UPDATE_CITY, ADD_CITY } from "./actions"

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

