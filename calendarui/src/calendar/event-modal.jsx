import React, { useState } from 'react';
import './event-modal.css';
import PropTypes from 'prop-types';
import { useGetCalendarByCalendarIdQuery, useRemoveEventMutation } from '../store/api';
import AddNotification from './add-notification';
import NotificationList from './notification-list';
import AddEvent from './add-event';

const propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  calendarId: PropTypes.number.isRequired,
  modalDay: PropTypes.number.isRequired,
};

const EventModal = ({ setOpenModal, calendarId, modalDay }) => {
  const [selectedEventName, setSelectedEventName] = useState('');
  const [removeEvent] = useRemoveEventMutation();
  const { data, isLoading, error } = useGetCalendarByCalendarIdQuery(calendarId);

  const getEventsForDay = (day) => {
    const formattedDay = day.format('YYYY-MM-DD');
    return !(isLoading || error) && data.events[formattedDay];
  };

  const handleAddEvent = async () => {
    (document.getElementById('add-event-container')).style.display = 'flex';
    (document.getElementById('events-of-day-list-container')).style.display = 'none';
  };

  const openNotificationEdit = async () => {
    (document.getElementById('notification-of-day-list-container')).style.display = 'flex';
    (document.getElementById('events-of-day-list-container')).style.display = 'none';
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
      <AddEvent calendarId={calendarId} modalDay={modalDay} />
      <NotificationList selectedEventName={selectedEventName} />
      <AddNotification selectedEventName={selectedEventName} />
    </div>
  );
};

EventModal.propTypes = propTypes;

export default EventModal;
