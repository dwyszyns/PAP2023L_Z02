import React from 'react';
import '../sidebar.css';
import { useGetNotificationsForMemberQuery } from '../../store/api';

const NotificationsSidebar = () => {
  const { data, isLoading, error } = useGetNotificationsForMemberQuery(1);

  return (
    <>
      <div className="nested-sidebar">
        <p className="nested-sidebar-title">
          Notifications
        </p>
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
                  className="notification-elem"
                >
                  <p />
                  <button type="button" className="calendar-nav-elem-remove">
                    <img id={`trash${notification.id.toString()}`} src={TrashBin} alt="X" className="trash-bin-icon" />
                  </button>
                </button>
              ))}
            </div>
          )}
      </div>
    </>
  );
};

export default NotificationsSidebar;
