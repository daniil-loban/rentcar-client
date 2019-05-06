import { SHOW_MODAL, HIDE_MODAL } from './actionTypes.ts';

export function showModalAction(caption, message) {
  return {
    type: SHOW_MODAL,
    caption,
    message
  };
}

export function showModal(caption, message) {
  return dispatch => {
    dispatch(showModalAction(caption, message));
  };
}

export function hideModalAction() {
  return {
    type: HIDE_MODAL
  };
}

export function hideModal() {
  return dispatch => {
    dispatch(hideModalAction());
  };
}

export function runSubmitAction() {
  return (dispatch, getState) => {
    const action = getState().modal.submitAction;
    action();
    // dispatch(hideModal);
  };
}
