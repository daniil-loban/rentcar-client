import {
  UPDATE_FILTER,
  CLEAR_FILTER_SELECTED_OPTIONS
} from '../actions/actionTypes.ts';

const initialState = {
  selectedFilter: {
    model: '',
    price: '',
    year: '',
    seats: '',
    bags: '',
    doors: '',
    ac: '',
    tms: ''
  }
};

export default function filterOptionsReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_FILTER_SELECTED_OPTIONS:
      return {
        ...state,
        selectedFilter: initialState.selectedFilter
      };
    case UPDATE_FILTER:
      return {
        ...state,
        selectedFilter: {
          ...state.selectedFilter,
          ...{ [action.field.name]: action.field.value }
        }
      };
    default:
      return state;
  }
}
