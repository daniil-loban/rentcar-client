import { SHOW_MODAL, HIDE_MODAL } from '../actions/actionTypes.ts';

const initialState = {
  isVisible: false,
  caption: '',
  children: null,
  submitAction: () => {}
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      window.console.log('_MODAL', action.type);
      return {
        isVisible: true,
        caption: action.caption,
        children: action.children,
        submitAction: action.submitAction
      };
    case HIDE_MODAL:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
