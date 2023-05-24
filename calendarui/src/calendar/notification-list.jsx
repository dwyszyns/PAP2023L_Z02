import React from 'react';
import './event-modal.css';
import PropTypes from 'prop-types';

const propTypes = {
  selectedEventName: PropTypes.string.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
};

const NotificationList = ({ selectedEventName, setSelectedTab }) => (
  <div className="modal-notification-container" id="notification-of-day-list-container">
    <div className="body-notification-list">
      <div className="list-of-notification-with-header">
        <div className="header-noti">
          <div className="header-popup-add-event">
            <h2 className="header-notification-list">Notification list</h2>
          </div>
          <div className="button-close-popup-add-event">
            <button type="button" onClick={() => setSelectedTab('events')} className="button-close-popup-add-event-x">X</button>
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
        <button type="button" className="add-notification-button" onClick={() => setSelectedTab('add-notification')}>Add</button>
      </div>
    </div>
  </div>
);

NotificationList.propTypes = propTypes;

export default NotificationList;
