import React, { /*  useState, */ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { hideModal, runSubmitAction } from '../../store/actions/modal';

import classes from './modal-dialog.css';

const ModalDialog = props => {
  const { caption, message, isVisible } = props;

  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  });

  return isVisible ? (
    <div className={classes.wrapper}>
      <div className={classes.modal}>
        <div className={classes.modal__header}>{caption}</div>
        <div className={classes.modal__body}>
          <p>{message}</p>
          <button
            type="button"
            onClick={() => {
              props.hideModal();
            }}
          >
            Ок
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

function mapStateToProps(state) {
  return {
    isVisible: state.modal.isVisible,
    caption: state.modal.caption,
    message: state.modal.message
  };
}

const mapDispatchToProps = {
  runSubmitAction,
  hideModal
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModalDialog)
);
