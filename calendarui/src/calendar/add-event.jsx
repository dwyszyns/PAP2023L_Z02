import React, { useState } from 'react';
import './event-modal.css';
import PropTypes from 'prop-types';
import { useAddEventMutation } from '../store/api';

const propTypes = {
  calendarId: PropTypes.number.isRequired,
  modalDay: PropTypes.number.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
};

const AddEvent = ({ calendarId, modalDay, setSelectedTab }) => {
  const defaultFields = {
    name: '',
    startTime: '',
    duration: '',
    calendarId,
  };

  const inputType = {
    name: 'text',
    startTime: 'time',
    duration: 'text',
  };

  const [fields, setFields] = useState(defaultFields);

  const [errors, setErrors] = useState({
    name: false,
    startTime: false,
    endTime: false,
  });

  const [addEvent, { isError, isSuccess }] = useAddEventMutation();
  const fieldNamesAddEvent = ['name', 'startTime', 'duration'];

  const handleSubmit = () => {
    let newErrors = { ...errors };
    let isValid = true;
    fieldNamesAddEvent.forEach((fieldName) => {
      if (fields[fieldName].trim() === '') {
        newErrors = { ...newErrors, [fieldName]: true };
        isValid = false;
      } else {
        newErrors = { ...newErrors, [fieldName]: false };
      }
    });
    fields.startTime = `${modalDay.format('YYYY-MM-DD')}T${fields.startTime}`;
    if (isValid) {
      const { ...body } = fields;
      addEvent(body);
    }
    setFields(defaultFields);
    setErrors(newErrors);
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
    <div id="add-event-container" className="modal-container-add-event">
      <div className="header-popup">
        <div className="header-popup-add-event">
          <h2 className="title-add-event">Add new event</h2>
        </div>
        <div className="button-close-popup-add-event">
          <button
            type="button"
            onClick={() => setSelectedTab('events')}
            className="button-close-popup-add-event-x"
          >
            X
          </button>
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
            type={inputType[fieldName]}
            name={fieldName}
            value={fields[fieldName]}
            placeholder={fieldName.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
            className="add-event-input"
            onChange={(e) => setFields({ ...fields, [fieldName]: e.target.value })}
          />
          {errors[fieldName] && <p className="auth-error-message">Please enter a valid value</p>}
        </>
      ))}
      <button type="button" className="auth-submit-button" onClick={handleSubmit}>Add</button>
      <div className="auth-footer">
        {render()}
      </div>
    </div>
  );
};

AddEvent.propTypes = propTypes;

export default AddEvent;
