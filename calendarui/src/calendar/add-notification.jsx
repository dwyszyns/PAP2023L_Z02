import React, { useState } from 'react';
import './event-modal.css';
import PropTypes from 'prop-types';

const propTypes = {
  selectedEventName: PropTypes.string.isRequired,
};

const AddNotification = ({ selectedEventName }) => {
  const [timeType, setTimeType] = useState('');

  const defaultFieldsAddNotification = {
    time: '',
    type: false,
  };

  const [fieldsAddNotification, setFieldsAddNotification] = useState(defaultFieldsAddNotification);

  const [errorsAddNotification, setErrorsAddNotification] = useState({
    time: false,
    type: false,
  });

  const closeAddNotification = async () => {
    (document.getElementById('notification-of-day-list-container')).style.display = 'flex';
    (document.getElementById('add-notification-container')).style.display = 'none';
  };

  return (
    <div id="add-notification-container" className="modal-container-add-notification">
      <div className="header-popup">
        <div className="header-popup-add-event">
          <h2 className="title-add-event">Add new notification</h2>
        </div>
        <div className="button-close-popup-add-event">
          <button type="button" onClick={closeAddNotification} className="button-close-popup-add-event-x">X</button>
        </div>
      </div>
      <h3 className="add-event-date">
        Event:
        {'  '}
        {selectedEventName}
      </h3>
      <label className="choose-number-notification">Choose time before event start:</label>
      <input
        type="text"
        name="time"
        value={fieldsAddNotification.time}
        placeholder={'Time'.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
        className="number-input-notification"
        onChange={(e) => setFieldsAddNotification({ ...fieldsAddNotification, time: e.target.value })}
      />
      {errorsAddNotification.name && <p className="auth-error-message">Please enter a valid value</p>}

      <select className="custom-select-type" onChange={(type) => setTimeType(type.target.value)} name="privacy">
        <option value="m">Minutes</option>
        <option value="h">Hours</option>
        <option value="d">Days</option>
      </select>
      <button type="button" className="submit-noti-button">Add</button>
      <div className="auth-footer" />
    </div>
  );
};

AddNotification.propTypes = propTypes;

export default AddNotification;
