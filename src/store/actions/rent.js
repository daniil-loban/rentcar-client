// import React from 'react';
import axios from 'axios';

import {
  AGREE_WITH_CONDITIONS,
  SELECT_CAR,
  RENT_CAR_SUCCESS,
  RENT_CAR_ERROR,
  SET_CUSTOMER_FIRST_NAME,
  SET_CUSTOMER_LAST_NAME,
  SET_END_DATE,
  SET_START_DATE,
  SET_VALIDATE_STATUS
} from './actionTypes.ts';

// import { showModal } from './modal';

export function setValidateStatus(isFormValid) {
  return {
    type: SET_VALIDATE_STATUS,
    isFormValid
  };
}

function validate() {
  return (dispatch, getState) => {
    const props = getState().rent;
    const isFormValid =
      // eslint-disable-next-line no-restricted-globals
      props.startDate instanceof Date &&
      // eslint-disable-next-line no-restricted-globals
      !isNaN(props.startDate.valueOf()) &&
      // eslint-disable-next-line no-restricted-globals
      (props.endDate instanceof Date && !isNaN(props.endDate.valueOf())) &&
      props.customerFirstName.trim() !== '' &&
      props.customerLastName.trim() !== '';
    dispatch(setValidateStatus(isFormValid));
  };
}

export function setPreValidateCustomerFirstName(firstName) {
  return {
    type: SET_CUSTOMER_FIRST_NAME,
    firstName
  };
}

export function setCustomerFirstName(firstName) {
  return dispatch => {
    dispatch(setPreValidateCustomerFirstName(firstName));
    dispatch(validate());
  };
}

export function setPreValidateCustomerLastName(lastName) {
  return {
    type: SET_CUSTOMER_LAST_NAME,
    lastName
  };
}

export function setCustomerLastName(lastName) {
  return dispatch => {
    dispatch(setPreValidateCustomerLastName(lastName));
    dispatch(validate());
  };
}

export function setPreValidateStartDate(startDate) {
  return {
    type: SET_START_DATE,
    startDate
  };
}

export function setStartDate(startDate) {
  return dispatch => {
    dispatch(setPreValidateStartDate(startDate));
    dispatch(validate());
  };
}

export function setPreValidateEndDate(endDate) {
  return {
    type: SET_END_DATE,
    endDate
  };
}

export function setEndDate(endDate) {
  return dispatch => {
    dispatch(setPreValidateEndDate(endDate));
    dispatch(validate());
  };
}

export function selectCar(id) {
  return {
    type: SELECT_CAR,
    selectedCarId: id
  };
}

export function agreeWithConditions(isAgree) {
  return {
    type: AGREE_WITH_CONDITIONS,
    isAgree
  };
}

export function rentCarSuccess(status) {
  return {
    type: RENT_CAR_SUCCESS,
    status
  };
}

export function rentCarError(error) {
  return {
    type: RENT_CAR_ERROR,
    error
  };
}

export function rentCar(data) {
  return async dispatch => {
    return axios({
      method: 'post',
      url: '/rent',
      data,
      config: { headers: { 'Content-Type': 'application/javascript' } }
    })
      .then(response => {
        return dispatch(rentCarSuccess(response.data));
      })
      .catch(error => {
        return dispatch(rentCarError(error));
      });
  };
}
