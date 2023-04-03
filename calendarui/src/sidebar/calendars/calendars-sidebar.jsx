import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCalendarsForMemberIdQuery } from '../../store';
import '../sidebar.css';

const CalendarsSidebar = () => {
  const [selectedCalendarId, setSelectedCalendarId] = useState('');
  const { data, isLoading, error } = useGetCalendarsForMemberIdQuery(1);

  const isSelected = (id) => id === selectedCalendarId;

  const renderClassName = (calendar) => [
    'nested-sidebar-button',
    isSelected(calendar.id) ? 'selected' : '',
  ].join(' ');

  return (
    <>
      <div className="nested-sidebar">
        <p className="nested-sidebar-title">
          Calendars
        </p>
        {!isLoading && !error && data.map((calendar) => (
          <>
            <button
              type="button"
              key={calendar.id}
              className={renderClassName(calendar)}
              onClick={() => setSelectedCalendarId(calendar.id)}
            >
              <Link to={`/calendar/${calendar.id}`} className="nested-sidebar-link">
                {calendar.name}
              </Link>
            </button>
          </>

        ))}
      </div>
    </>
  );
};

export default CalendarsSidebar;
