import React from 'react';
import './event-modal.css';
import PropTypes from 'prop-types';
import { useGetNotificationsForEventQuery, useRemoveNotificationMutation } from '../store/api';

const propTypes = {
  selectedEventName: PropTypes.string.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
  eventId: PropTypes.number.isRequired,
};

const NotificationList = ({ selectedEventName, setSelectedTab, eventId }) => {
  const { data } = useGetNotificationsForEventQuery(eventId);
  const [removeNotification] = useRemoveNotificationMutation();

  return (
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
          {data && data.length === 0 ? (<div className="no-notification">No notifications for this event.</div>) : (
            <div className="notifications-elems-view">
              {data && data.map((notification) => (
                <div className="event-view-list" key={notification.id}>
                  <div className="elemx">
                    <p className="event-elem-name">
                      <p>
                        Reminder on
                      </p>
                      <p>
                        {`${notification.notifyTime.substring(8, 10)}`
                            + `/${notification.notifyTime.substring(5, 7)}`
                            + ` ${notification.notifyTime.split('T')[1]}`}
                      </p>
                    </p>
                    <div className="button-del-ev">
                      <button
                        type="button"
                        className="event-del-button"
                        onClick={() => removeNotification(notification.id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          )}
          <div className="button-add-noti-area">
            <button type="button" className="add-notification-button" onClick={() => setSelectedTab('add-notification')}>Add</button>
          </div>

        </div>
      </div>
    </div>
  );
};

NotificationList.propTypes = propTypes;

export default NotificationList;
