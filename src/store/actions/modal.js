import { SHOW_MODAL, HIDE_MODAL } from './actionTypes.ts';

export function showModalAction(caption, children, submitAction) {
  return {
    type: SHOW_MODAL,
    caption,
    children,
    submitAction
  };
}

export function showModal(caption) {
  return dispatch => {
    dispatch(showModalAction(caption));
  };
}

export function hideModalAction() {
  return {
    type: HIDE_MODAL
  };
}

export function hideModal() {
  return (dispatch, getState) => {
    dispatch(hideModalAction());
    const action = getState().modal.submitAction;
    action();
  };
}

export function runSubmitAction() {
  return (dispatch, getState) => {
    const action = getState().modal.submitAction;
    action();
    // dispatch(hideModal);
  };
}
