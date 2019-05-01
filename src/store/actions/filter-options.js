import {
  SET_FILTER_OPTIONS,
  UPDATE_FILTER,
  CLEAR_FILTER_SELECTED_OPTIONS
} from './actionTypes.js'
import {applyFilterCars,resetFilter } from './base'

export function setFilterOptions(cars) {
  return {
    type:SET_FILTER_OPTIONS,
    cars
  }
}

export function clearSelectedOptions() {
  return {
    type: CLEAR_FILTER_SELECTED_OPTIONS
  }
}

export function clearFilterSelectedOptions(cars) {
  return dispatch =>{
    dispatch(setFilterOptions(cars))
    dispatch(clearSelectedOptions())
    dispatch(resetFilter(cars))
  }
}

export function updateFilter(name, value) {
  return {
    type:UPDATE_FILTER,
    field: {name, value}
  }
}

export function setSelectedFilter(name, value) {
  return  (dispatch, getState) => {
    dispatch(updateFilter(name, value))
    dispatch(applyFilterCars())
    //test
    const filteredCars = getState().base.filteredCars;
    dispatch(setFilterOptions(filteredCars))

  }
}