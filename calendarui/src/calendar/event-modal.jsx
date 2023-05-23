import React, { useState } from 'react';
import './event-modal.css';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { useAddEventMutation, useGetCalendarByCalendarIdQuery, useRemoveEventMutation } from '../store/api';

const propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  calendarId: PropTypes.number.isRequired,
  modalDay: PropTypes.number.isRequired,
};

const EventModal = ({ setOpenModal, calendarId, modalDay }) => {
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
  const [removeEvent] = useRemoveEventMutation();
  const { data, isLoading, error } = useGetCalendarByCalendarIdQuery(calendarId);
  const fieldNames = ['name', 'startTime', 'duration'];
  const getEventsForDay = (day) => {
    const formattedDay = day.format('YYYY-MM-DD');
    return !(isLoading || error) && data.events[formattedDay];
  };

  const handleSubmit = () => {
    let newErrors = { ...errors };
    let isValid = true;
    fieldNames.forEach((fieldName) => {
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
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-close-btn">
          <button type="button" onClick={() => { setOpenModal(false); }} className="exit-events-view">
            X
          </button>
        </div>
        <div className="title">
          <h1>
            Events
            {'   '}
            {modalDay.format('DD-MM-YY')}
          </h1>
          {getEventsForDay(modalDay) === undefined ? (<div className="no-events" id={modalDay.format('YY-MM-DD')}>No events for today.</div>) : (
            <div className="event-elems-view" id={modalDay.format('YY-MM-DD')}>
              {getEventsForDay(modalDay) && getEventsForDay(modalDay).map((event) => (
                <div className="event-view-list" key={event.id} id={`event-day-${event.id}`}>
                  <div className="elemx">
                    <p key={event.id} className="event-elem-name">
                      <p>{`${event.name}`}</p>
                      <p>{`${event.startDate.split(' ')[1]} - ${event.endDate.split(' ')[1]}`}</p>
                    </p>
                  </div>
                  <div className="button-del-ev">
                    <button
                      type="button"
                      className="event-del-button"
                      onClick={() => removeEvent(event.id)}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="body" />
        <div className="footer">
          <button
            type="button"
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancel-btn-event"
          >
            Cancel
          </button>

          <Popup trigger={<button type="button"> Add</button>} position="right center">
            <div className="popup-background">
              <div className="modal-container-add-event">
                <h2 className="title-add-event">Add new event</h2>
                {fieldNames.map((fieldName) => (
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
            </div>
          </Popup>

        </div>
      </div>
    </div>
  );
};

EventModal.propTypes = propTypes;

export default EventModal;
