import {
  AGREE_WITH_CONDITIONS,
  SET_END_DATE,
  SET_START_DATE,
  SET_CUSTOMER_FIRST_NAME,
  SET_CUSTOMER_LAST_NAME,
  SELECT_CAR,
  RENT_CAR_SUCCESS,
  RENT_CAR_ERROR,
  SET_VALIDATE_STATUS
} from '../actions/actionTypes.ts'

const initialState = {
  isRented: false,
  error: null,
  isAgreeWithCondition:false,
  selectedCarId: -1,
  customerFirstName:'',
  customerLastName:'',
  startDate: new Date(),
  endDate: new Date(),
  isFormValid : false
}

export default function baseReducer(state=initialState, action) {
  switch(action.type) {
    case SET_VALIDATE_STATUS:
      return {
        ...state,
        isFormValid: action.isFormValid
      } 
    case SET_CUSTOMER_FIRST_NAME: 
      return {
        ...state,
        customerFirstName: action.firstName
      } 
    case SET_CUSTOMER_LAST_NAME: 
      return {
        ...state,
        customerLastName: action.lastName
      } 
    case SET_START_DATE: 
      return {
        ...state,
        startDate: action.startDate 
      } 
    case SET_END_DATE: 
      return {
        ...state,
        endDate: action.endDate 
      } 
    case SELECT_CAR:
      return {
        ...state,
        selectedCarId: action.selectedCarId 
      }
    case AGREE_WITH_CONDITIONS:
      return {
        ...state,
        isAgreeWithCondition: action.isAgree 
      }
    case RENT_CAR_SUCCESS:
      return {
        ...state,
        isRented: true
      }
    case RENT_CAR_ERROR:
      return {
        ...state,
        isRented: false,
        error: action.error
      }
    default:
      return state
  }
}