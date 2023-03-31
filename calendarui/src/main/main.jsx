import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './main.css';
import {
  CalendarIcon, FriendsIcon, IconButton, NotificationIcon, UserIcon,
} from '../icons';

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(-1);
  const tabs = [
    { icon: UserIcon, name: 'user', link: 'member/1' },
    { icon: CalendarIcon, name: 'calendars', link: 'calendar/0' },
    { icon: FriendsIcon, name: 'friends', link: 'member/2' },
    { icon: NotificationIcon, name: 'notifications', link: '' },
  ];

  const onButtonClick = (index) => setSelectedTab(index);

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo" />
        {tabs.map((iconWrapper, index) => (
          <Link key={iconWrapper.name} to={iconWrapper.link}>
            <IconButton
              selected={index === selectedTab}
              onClick={() => onButtonClick(index)}
              title={iconWrapper.name}
            >
              {iconWrapper.icon()}
            </IconButton>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
