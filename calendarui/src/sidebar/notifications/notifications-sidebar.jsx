import React from 'react';
import '../sidebar.css';
import { useGetNotificationsForMemberQuery, useRemoveNotificationMutation } from '../../store/api';
import TrashBin from '../calendars/trash-bin.svg';

const NotificationsSidebar = () => {
  const { data, isLoading, error } = useGetNotificationsForMemberQuery(1);
  const [removeNotification] = useRemoveNotificationMutation();

  return (
    <>
      <div className="nested-sidebar">
        <p className="nested-sidebar-title">
          Notifications
        </p>
        <div className="nested-sidebar-list-calendar">
          {data && data.length === 0
            ? (
              <p>
                No notifications for today.
              </p>
            ) : (
              <div>
                {!isLoading && !error && data.map((notification) => (
                  <button
                    type="button"
                    key={notification.id}
                    className="nested-sidebar-button-notification"
                  >
                    <div className="nested-sidebar-notification-info">
                      <p className="nested-sidebar-notification-link">
                        {' '}
                        {notification.message}
                        {' '}
                      </p>
                    </div>
                    <div className="notification-elem-remove">
                      <button type="button" className="calendar-nav-elem-remove" onClick={() => removeNotification(notification.id)}>
                        <img id={`trash${notification.id.toString()}`} src={TrashBin} alt="X" className="trash-bin-icon" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default NotificationsSidebar;
