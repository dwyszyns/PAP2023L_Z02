import React from 'react';
import Icon from './img/notification.svg';
import Iconx from './img/notifications.png';
import './icons.css';
import { useGetNotificationsForMemberQuery } from '../store/api';

const NotificationIcon = () => {
  const { data, isLoading, error } = useGetNotificationsForMemberQuery(1);
  return (
    <>
      {
          data && data.length === 0
            ? (<img src={Iconx} className="icon-notification" alt="notifications" />)
            : (<img src={Icon} className="icon" alt="no-notifications" />)
      }
    </>
  );
};

export default NotificationIcon;
