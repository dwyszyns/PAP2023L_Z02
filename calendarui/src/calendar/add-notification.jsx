import React, { useState } from 'react';
import './event-modal.css';
import PropTypes from 'prop-types';
import { useAddNotificationMutation } from '../store/api';

const propTypes = {
  selectedEventName: PropTypes.string.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
  eventStartDate: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
};

const AddNotification = ({
  selectedEventName, setSelectedTab, eventStartDate, eventId,
}) => {
  const [unit, setUnit] = useState('m');

  const defaultFields = {
    time: '',
    type: 'm',
  };

  const bodyFields = {
    notifyTime: '',
    eventId,
  };

  const [fields, setFields] = useState(defaultFields);
  const [addNotification, { isError, isSuccess }] = useAddNotificationMutation();

  const [errors, setErrors] = useState({
    time: false,
    type: false,
  });

  const findDate = () => {
    const inputDate = new Date(eventStartDate);

    if (unit === 'm') {
      inputDate.setMinutes(inputDate.getMinutes() - parseInt(fields.time, 10));
    } else if (unit === 'h') {
      inputDate.setHours(inputDate.getHours() - parseInt(fields.time, 10));
    } else if (unit === 'd') {
      inputDate.setDate(inputDate.getDate() - parseInt(fields.time, 10));
    }

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const hours = inputDate.getHours().toString().padStart(2, '0');
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');

    bodyFields.notifyTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleAdd = () => {
    let newErrors = { ...errors };
    let isValid = true;
    if (fields.time.length === 0) {
      newErrors = { ...newErrors, time: true };
      isValid = false;
    } else {
      newErrors = { ...newErrors, time: false };
    }
    if (isValid) {
      const { ...body } = bodyFields;
      addNotification(body);
    }
    setErrors(newErrors);
    setFields(defaultFields);
  };

  const render = () => {
    if (isError) {
      return <p className="event-error-message">Please provide correct details.</p>;
    }
    if (isSuccess) {
      return <p className="added-event">The event has been added successfully.</p>;
    }
    return <></>;
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
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="choose-number-notification">Choose time before event start:</label>
      <input
        type="text"
        name="time"
        value={fields.time}
        placeholder={'Time'.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
        className="number-input-notification"
        onChange={(event) => setFields({ ...fields, time: event.target.value })}
      />
      {errors.name && <p className="auth-error-message-noti">Please enter a valid value</p>}

      <select
        className="custom-select-type"
        onChange={(type) => setUnit(type.target.value)}
        name="privacy"
      >
        <option value="m">Minutes</option>
        <option value="h">Hours</option>
        <option value="d">Days</option>
      </select>
      <button
        type="button"
        className="submit-noti-button"
        onClick={() => {
          findDate();
          handleAdd();
        }}
      >
        Add
      </button>
      <div className="noti-footer">
        {render()}
      </div>
    </div>
  );
};

AddNotification.propTypes = propTypes;

export default AddNotification;
