import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCalendarsForMemberIdQuery } from '../../store';
import '../sidebar.css';

const CalendarsSidebar = () => {
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const { data, isLoading, error } = useGetCalendarsForMemberIdQuery(1);

  const isSelected = (username) => username === selectedCalendar;

  const renderClassName = (CalendarReq) => [
    'nested-sidebar-button',
    isSelected(CalendarReq.name) ? 'selected' : '',
  ].join(' ');

  return (
    <>
      <div className="nested-sidebar">
        <p className="nested-sidebar-title">
          Calendars
        </p>
        {!isLoading && !error && data.map((CalendarReq) => (
          <>
            <button
              type="button"
              key={CalendarReq.name}
              className={renderClassName(CalendarReq)}
              onClick={() => setSelectedCalendar(CalendarReq.friend.username)}
            >
              <Link to={`/calendar/${CalendarReq.id}`} className="nested-sidebar-link">
                <div className="friend-profile-picture" />
                {CalendarReq.name}
              </Link>
            </button>
          </>

        ))}
      </div>
    </>
  );
};

export default CalendarsSidebar;
