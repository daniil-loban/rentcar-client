import {
  SET_FILTER_OPTIONS,
  UPDATE_FILTER
} from './actionTypes.js'
import {applyFilterCars} from './base'

export function setFilterOptions(cars) {
  return {
    type:SET_FILTER_OPTIONS,
    cars
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
  }
}