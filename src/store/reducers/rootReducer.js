import {combineReducers} from 'redux'
import baseReducer from './base'
import filterOptionsReducer from './filter-options'
import rentReducer from './rent'

export default combineReducers({
  base: baseReducer,
  filterOptions: filterOptionsReducer,
  rent: rentReducer
})