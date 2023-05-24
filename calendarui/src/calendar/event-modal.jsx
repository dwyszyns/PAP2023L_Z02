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

  const [timeType, setTimeType] = useState('');
  const [selectedEventName, setSelectedEventName] = useState('');
  const [fieldsAddEvent, setFieldsAddEvent] = useState(defaultFieldsAddEvent);

  const [errorsAddEvent, setErrorsAddEvent] = useState({
    name: false,
    startTime: false,
    endTime: false,
  });

  const [addEvent, { isError, isSuccess }] = useAddEventMutation();
  const [removeEvent] = useRemoveEventMutation();
  const { data, isLoading, error } = useGetCalendarByCalendarIdQuery(calendarId);
  const fieldNamesAddEvent = ['name', 'startTime', 'duration'];
  const getEventsForDay = (day) => {
    const formattedDay = day.format('YYYY-MM-DD');
    return !(isLoading || error) && data.events[formattedDay];
  };

  const defaultFieldsAddNotification = {
    time: '',
    type: false,
  };

  const [fieldsAddNotification, setFieldsAddNotification] = useState(defaultFieldsAddNotification);

  const [errorsAddNotification, setErrorsAddNotification] = useState({
    time: false,
    type: false,
  });

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

  const openAddNotification = async () => {
    (document.getElementById('notification-of-day-list-container')).style.display = 'none';
    (document.getElementById('add-notification-container')).style.display = 'flex';
  };

  const closeAddNotification = async () => {
    (document.getElementById('notification-of-day-list-container')).style.display = 'flex';
    (document.getElementById('add-notification-container')).style.display = 'none';
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
            <button type="button" className="add-notification-button" onClick={openAddNotification}>Add</button>
          </div>
        </div>
      </div>
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
        <div className="auth-footer">
          {render()}
        </div>
      </div>
    </div>
  );
};

EventModal.propTypes = propTypes;

export default EventModal;
