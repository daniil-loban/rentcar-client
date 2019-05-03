import axios from 'axios';
import {
  FETCH_CARS_SUCCESS,
  FETCH_CARS_ERROR,
  APPLY_FILTER,
  RESET_FILTER,
  SET_FILTER_OPTIONS
} from './actionTypes.ts';
import { deepValue } from '../../helpers/objectHelper';

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

const getFlatObject = (obj, path = '') => {
  return Object.keys(obj).reduce((acc, e) => {
    if (obj[e] instanceof Object) {
      const temp = getFlatObject(
        obj[e],
        `${path}${path === '' ? '' : '.'}${e}`
      );
      Object.keys(temp).forEach(inner => {
        acc[`${inner}`] = temp[inner];
      });
    } else {
      acc[`${path}${path === '' ? '' : '.'}${e}`] = obj[e];
    }
    return acc;
  }, {});
};

const sortByType = arr => {
  if (typeof arr[0] === 'number') {
    return (a, b) => a - b;
  }
  return (a, b) => (a >= b ? 1 : -1);
};

const agregate = arr => {
  const result = arr.reduce((acc, e) => {
    const flat = getFlatObject(e);
    Object.keys(flat).forEach(path => {
      if (acc[path]) {
        if (!acc[path].includes(flat[path]))
          acc[path] = acc[path].concat(flat[path]);
      } else {
        acc[path] = [flat[path]];
      }
    });
    return acc;
  }, {});

  Object.keys(result).forEach(key => {
    result[key] = result[key].sort(sortByType(arr));
  });
  return result;
};

export function setFilterOptions(cars) {
  return {
    type: SET_FILTER_OPTIONS,
    cars: agregate(cars)
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
