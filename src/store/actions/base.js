import axios from 'axios';
import {
  FETCH_CARS_SUCCESS,
  FETCH_CARS_ERROR,
  APPLY_FILTER,
  RESET_FILTER,
  SET_FILTER_OPTIONS
} from './actionTypes.ts';
import {
  deepValue,
  agregateValuesListObjects
} from '../../helpers/objectHelper';

const pathByKey = {
  model: 'model',
  price: 'price',
  year: 'properties.year',
  seats: 'properties.seats',
  bags: 'properties.bags',
  doors: 'properties.doors',
  ac: 'properties.ac',
  tms: 'properties.transmission'
};

export function setFilterOptions(cars) {
  return {
    type: SET_FILTER_OPTIONS,
    // cars: agregate(cars)
    filterOptions: agregateValuesListObjects(cars)
  };
}

export function fetchCarsSuccess(cars) {
  return {
    type: FETCH_CARS_SUCCESS,
    cars
  };
}

export function fetchCarsError(error) {
  return {
    type: FETCH_CARS_ERROR,
    error
  };
}

export function applyFilter(filteredCars) {
  return {
    type: APPLY_FILTER,
    filteredCars
  };
}

export function applyFilterCars() {
  return (dispatch, getState) => {
    const filter = getState().filterOptions.selectedFilter;
    const cars = [...getState().base.cars];
    const filteredCars = cars.filter(e => {
      return Object.keys(filter).reduce((acc, key) => {
        return (
          acc &&
          (filter[key] !== ''
            ? filter[key] === `${deepValue(e, pathByKey[key])}`
            : true)
        );
      }, true);
    });
    dispatch(applyFilter(filteredCars));
  };
}

function initFilteredCars(cars) {
  return dispatch => {
    dispatch(applyFilter([...cars]));
  };
}

export function fetchCars() {
  return async dispatch => {
    try {
      const response = await axios.get(`/cars`);
      const cars = response.data;
      dispatch(fetchCarsSuccess(cars));
      dispatch(setFilterOptions(cars));
      dispatch(initFilteredCars(cars));
    } catch (error) {
      dispatch(fetchCarsError(error));
    }
  };
}

export function resetFilter(cars) {
  return {
    type: RESET_FILTER,
    filteredCars: cars
  };
}
