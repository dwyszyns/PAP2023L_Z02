import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon, FriendsIcon, IconButton, NotificationIcon, UserIcon,
} from '../icons';

import './sidebar.css';
import FriendsSidebar from './friends/friends-sidebar';
import CalendarsSidebar from './calendars/calendars-sidebar';
import LogoutIcon from '../icons/logout-icon';
import NotificationsSidebar from './notifications/notifications-sidebar';

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState('calendars');
  const tabs = [
    { icon: CalendarIcon, name: 'calendars' },
    { icon: FriendsIcon, name: 'friends' },
    { icon: NotificationIcon, name: 'notifications' },
  ];

  const onButtonClick = (tab) => setSelectedTab(tab);

  const renderNested = () => {
    switch (selectedTab) {
      case 'user':
        return <></>;
      case 'calendars':
        return <CalendarsSidebar />;
      case 'friends':
        return <FriendsSidebar />;
      case 'notifications':
        return <NotificationsSidebar />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="logo" />
        <Link to="member/current">
          <IconButton
            selected={selectedTab === 'user'}
            onClick={() => onButtonClick('user')}
            title="user"
          >
            <UserIcon />
          </IconButton>
        </Link>
        {tabs.map((iconWrapper) => (
          <IconButton
            key={iconWrapper.name}
            selected={iconWrapper.name === selectedTab}
            onClick={() => onButtonClick(iconWrapper.name)}
            title={iconWrapper.name}
          >
            {iconWrapper.icon()}
          </IconButton>
        ))}
        <Link to="/logout" className="logout-button">
          <IconButton
            selected={false}
            onClick={() => {}}
            title="logout"
          >
            <LogoutIcon />
          </IconButton>
        </Link>
      </div>
      { renderNested() }
    </>
  );
};

export default Sidebar;
