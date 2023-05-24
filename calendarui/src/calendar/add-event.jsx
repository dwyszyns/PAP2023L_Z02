import React, { useState } from 'react';
import './event-modal.css';
import PropTypes from 'prop-types';
import { useAddEventMutation } from '../store/api';

const propTypes = {
  calendarId: PropTypes.number.isRequired,
  modalDay: PropTypes.number.isRequired,
};

const EventModal = ({ calendarId, modalDay }) => {
  const defaultFieldsAddEvent = {
    name: '',
    startTime: '',
    duration: '',
    calendarId,
  };

  const inputTypeAddEvent = {
    name: 'text',
    startTime: 'time',
    duration: 'text',
  };

  const [fieldsAddEvent, setFieldsAddEvent] = useState(defaultFieldsAddEvent);

  const [errorsAddEvent, setErrorsAddEvent] = useState({
    name: false,
    startTime: false,
    endTime: false,
  });

  const [addEvent, { isError, isSuccess }] = useAddEventMutation();
  const fieldNamesAddEvent = ['name', 'startTime', 'duration'];

  const handleSubmit = () => {
    let newErrors = { ...errorsAddEvent };
    let isValid = true;
    fieldNamesAddEvent.forEach((fieldName) => {
      if (fieldsAddEvent[fieldName].trim() === '') {
        newErrors = { ...newErrors, [fieldName]: true };
        isValid = false;
      } else {
        newErrors = { ...newErrors, [fieldName]: false };
      }
    });
    fieldsAddEvent.startTime = `${modalDay.format('YYYY-MM-DD')}T${fieldsAddEvent.startTime}`;
    if (isValid) {
      const { ...body } = fieldsAddEvent;
      addEvent(body);
    }
    setFieldsAddEvent(defaultFieldsAddEvent);
    setErrorsAddEvent(newErrors);
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

  const closeAddEvent = async () => {
    (document.getElementById('events-of-day-list-container')).style.display = 'flex';
    (document.getElementById('add-event-container')).style.display = 'none';
  };

  return (
    <div id="add-event-container" className="modal-container-add-event">
      <div className="header-popup">
        <div className="header-popup-add-event">
          <h2 className="title-add-event">Add new event</h2>
        </div>
        <div className="button-close-popup-add-event">
          <button type="button" onClick={closeAddEvent} className="button-close-popup-add-event-x">X</button>
        </div>
      </div>
      <h3 className="add-event-date">
        {modalDay.format('DD-MM-YYYY')}
      </h3>
      {fieldNamesAddEvent.map((fieldName) => (
        <>
          <input
            key={fieldName}
            id={`auth-${fieldName}-input`}
            type={inputTypeAddEvent[fieldName]}
            name={fieldName}
            value={fieldsAddEvent[fieldName]}
            placeholder={fieldName.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
            className="add-event-input"
            onChange={(e) => setFieldsAddEvent({ ...fieldsAddEvent, [fieldName]: e.target.value })}
          />
          {errorsAddEvent[fieldName] && <p className="auth-error-message">Please enter a valid value</p>}
        </>
      ))}
      <button type="button" className="auth-submit-button" onClick={handleSubmit}>Add</button>
      <div className="auth-footer">
        {render()}
      </div>
    </div>
  );
};

EventModal.propTypes = propTypes;

export default EventModal;
