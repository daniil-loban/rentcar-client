import {
  FETCH_CARS_START,
  FETCH_CARS_SUCCESS,
  FETCH_CARS_ERROR,
  APPLY_FILTER,
  RESET_FILTER,
  SET_FILTER_OPTIONS
} from '../actions/actionTypes.ts';

const initialState = {
  filterOptions: null,
  filteredCars: [],
  cars: [],
  loading: false,
  error: null
};

export default function baseReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARS_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_CARS_SUCCESS:
      return {
        ...state,
        loading: false,
        cars: action.cars
      };
    case FETCH_CARS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case APPLY_FILTER:
      return {
        ...state,
        filteredCars: action.filteredCars
      };
    case RESET_FILTER:
      return {
        ...state,
        filteredCars: [...state.cars]
      };
    case SET_FILTER_OPTIONS:
      return {
        ...state,
        filterOptions: action.cars
      };
    default:
      return state;
  }
}
