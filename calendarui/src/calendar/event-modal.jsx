import React, { useState } from 'react';
import './event-modal.css';
import PropTypes from 'prop-types';
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

  const [selectedEventName, setSelectedEventName] = useState('');
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

  const handleAddEvent = async () => {
    (document.getElementById('add-event-container')).style.display = 'flex';
    (document.getElementById('events-of-day-list-container')).style.display = 'none';
  };

  const closeAddEvent = async () => {
    (document.getElementById('events-of-day-list-container')).style.display = 'flex';
    (document.getElementById('add-event-container')).style.display = 'none';
  };

  const openNotificationEdit = async () => {
    (document.getElementById('notification-of-day-list-container')).style.display = 'flex';
    (document.getElementById('events-of-day-list-container')).style.display = 'none';
  };

  const closeNotificationEdit = async () => {
    (document.getElementById('notification-of-day-list-container')).style.display = 'none';
    (document.getElementById('events-of-day-list-container')).style.display = 'flex';
  };

  return (
    <div className="modal-background">
      <div className="modal-container" id="events-of-day-list-container">
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
                  <div
                    className="elemx"
                    onClick={() => {
                      setSelectedEventName(event.name);
                      openNotificationEdit();
                    }}
                  >
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
        <div className="info-about-notification">Click on an event to modify its notifications</div>
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

          <button type="button" onClick={handleAddEvent}> Add</button>
        </div>
      </div>
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
      <div className="modal-notification-container" id="notification-of-day-list-container">
        <div className="body-notification-list">
          <div className="list-of-notification-with-header">
            <div className="header-noti">
              <div className="header-popup-add-event">
                <h2 className="header-notification-list">Notification list</h2>
              </div>
              <div className="button-close-popup-add-event">
                <button type="button" onClick={closeNotificationEdit} className="button-close-popup-add-event-x">X</button>
              </div>
            </div>
            <h3 className="event-name-notification">
              Event:
              {'  '}
              {selectedEventName}
            </h3>
            <div className="notification-view-list">
              <div className="elemx">
                <p className="event-elem-name">
                  <p> Data powiadomienia - do zmiany</p>
                </p>
              </div>
              <div className="button-del-ev">
                <button type="button" className="event-del-button">X</button>
              </div>
            </div>
          </div>
          <div className="button-add-noti-area">
            <button type="button" className="add-notification-button">Add</button>
          </div>
        </div>
      </div>
    </div>

  );
};

EventModal.propTypes = propTypes;

export default EventModal;
