import { DELETE_CITY, ADD_CITY, ADD_CURRENT_CITY } from "./actions"

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
    case ADD_CURRENT_CITY:
      return {
        ...state,
        cities: [...state.cities, action.city]
      }
    case DELETE_CITY:
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.id)
      }
    default: return state
  }
}

