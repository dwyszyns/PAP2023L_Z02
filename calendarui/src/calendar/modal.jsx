import React from 'react';
import './modal.css';
import PropTypes from 'prop-types';

const propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};

const Modal = ({ setOpenModal }) => (
  <div className="modalBackground">
    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button
          type="button"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          X
        </button>
      </div>
      <div className="title">
        <h1>New event</h1>
      </div>
      <div className="body">
        <p>Formularz - dane</p>
      </div>
      <div className="footer">
        <button
          type="button"
          onClick={() => {
            setOpenModal(false);
          }}
          id="cancelBtn"
        >
          Cancel
        </button>
        <button type="button">Add</button>
      </div>
    </div>
  </div>
);

Modal.propTypes = propTypes;

export default Modal;
