import React, { useState } from 'react';
import './event-modal.css';
import PropTypes from 'prop-types';
import { useAddNotificationMutation } from '../store/api';

const propTypes = {
  selectedEventName: PropTypes.string.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
};

const AddNotification = ({ selectedEventName, setSelectedTab }) => {
  const [timeType, setTimeType] = useState('');

  const defaultFields = {
    time: '',
    type: 'm',
  };

  const [fields, setFields] = useState(defaultFields);
  const [addNotification] = useAddNotificationMutation();

  const [errors, setErrors] = useState({
    time: false,
    type: false,
  });

  const handleAdd = () => {
    let newErrors = { ...errors };
    let isValid = true;
    if (!fields.name) {
      newErrors = { ...newErrors, name: true };
      isValid = false;
    } else {
      newErrors = { ...newErrors, name: false };
    }
    if (isValid) {
      const { ...body } = fields;
      addNotification(body);
    }
    setErrors(newErrors);
    setFields(defaultFields);
  };

  return (
    <div id="add-notification-container" className="modal-container-add-notification">
      <div className="header-popup">
        <div className="header-popup-add-event">
          <h2 className="title-add-event">Add new notification</h2>
        </div>
        <div className="button-close-popup-add-event">
          <button
            type="button"
            onClick={() => setSelectedTab('notifications')}
            className="button-close-popup-add-event-x"
          >
            X
          </button>
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
        value={fields.time}
        placeholder={'Time'.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
        className="number-input-notification"
        onChange={(event) => setFields({ ...fields, time: event.target.value })}
      />
      {errors.name && <p className="auth-error-message">Please enter a valid value</p>}

      <select
        className="custom-select-type"
        onChange={(type) => setTimeType(type.target.value)}
        name="privacy"
      >
        <option value="m">Minutes</option>
        <option value="h">Hours</option>
        <option value="d">Days</option>
      </select>
      <button type="button" className="submit-noti-button" onClick={handleAdd}>Add</button>
      <div className="auth-footer" />
    </div>
  );
};

AddNotification.propTypes = propTypes;

export default AddNotification;
