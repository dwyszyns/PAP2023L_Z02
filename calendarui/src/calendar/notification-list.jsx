import React from 'react';
import './event-modal.css';
import PropTypes from 'prop-types';

const propTypes = {
  selectedEventName: PropTypes.string.isRequired,
};

const NotificationList = ({ selectedEventName }) => {
  const closeNotificationEdit = async () => {
    (document.getElementById('notification-of-day-list-container')).style.display = 'none';
    (document.getElementById('events-of-day-list-container')).style.display = 'flex';
  };

  const openAddNotification = async () => {
    (document.getElementById('notification-of-day-list-container')).style.display = 'none';
    (document.getElementById('add-notification-container')).style.display = 'flex';
  };

  return (
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
  );
};

NotificationList.propTypes = propTypes;

export default NotificationList;
