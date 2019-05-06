import { SHOW_MODAL, HIDE_MODAL } from '../actions/actionTypes.ts';

const initialState = {
  isVisible: false,
  caption: ''
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        isVisible: true,
        caption: action.caption,
        message: action.message
      };
    case HIDE_MODAL:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
