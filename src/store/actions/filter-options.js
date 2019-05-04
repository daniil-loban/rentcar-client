import { UPDATE_FILTER, CLEAR_FILTER_SELECTED_OPTIONS } from './actionTypes.ts';

import { applyFilterCars, resetFilter, setFilterOptions } from './base';

export function clearSelectedOptions() {
  return {
    type: CLEAR_FILTER_SELECTED_OPTIONS
  };
}

export function clearFilterSelectedOptions(cars) {
  return dispatch => {
    dispatch(setFilterOptions(cars));
    dispatch(clearSelectedOptions());
    dispatch(resetFilter());
  };
}

export function updateFilter(name, value) {
  return {
    type: UPDATE_FILTER,
    field: { name, value }
  };
}

export function setSelectedFilter(name, value) {
  return (dispatch, getState) => {
    dispatch(updateFilter(name, value));
    dispatch(applyFilterCars());

    const { filteredCars } = getState().base;
    dispatch(setFilterOptions(filteredCars));
  };
}
