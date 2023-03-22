import React, { useState } from 'react';
import './main.css';
import {
  CalendarIcon, FriendsIcon, IconButton, NotificationIcon, UserIcon,
} from '../icons';

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(-1);
  const tabs = [
    { icon: UserIcon, name: 'user' },
    { icon: CalendarIcon, name: 'calendars' },
    { icon: FriendsIcon, name: 'friends' },
    { icon: NotificationIcon, name: 'notifications' },
  ];

  const onButtonClick = (index) => setSelectedTab(index);

  return (
    <div className="navbar">
      {tabs.map((iconWrapper, index) => (
        <IconButton
          key={iconWrapper.name}
          selected={index === selectedTab}
          onClick={() => onButtonClick(index)}
          title={iconWrapper.name}
        >
          {iconWrapper.icon()}
        </IconButton>
      ))}
    </div>
  );
};

export default Main;
