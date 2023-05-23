import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCalendarsForMemberIdQuery } from '../../store';
import '../sidebar.css';
import TrashBin from './trash-bin.svg';
import { useRemoveCalendarMutation } from '../../store/api';

const CalendarsSidebar = () => {
  const [selectedCalendarId, setSelectedCalendarId] = useState('');
  const { data, isLoading, error } = useGetCalendarsForMemberIdQuery('current');
  const [removeCalendar] = useRemoveCalendarMutation();

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
        <div className="nested-sidebar-list-calendar">
          <p className="nested-sidebar-title nested-sidebar-sec-title">
            Shared
          </p>
          {!isLoading && !error && data.filter((c) => !c.owner).map((calendar) => (
            <button
              type="button"
              key={calendar.id}
              className={renderClassName(calendar)}
              onClick={() => setSelectedCalendarId(calendar.id)}
            >
              <Link to={`/calendar/${calendar.id}`} className="nested-sidebar-link">
                <p>{calendar.name}</p>
              </Link>
              <button type="button" className="calendar-nav-elem-remove" onClick={() => removeCalendar(calendar.id)}>
                <img id={`trash${calendar.id.toString()}`} src={TrashBin} alt="X" className="trash-bin-icon" />
              </button>
            </button>
          ))}
          <p className="nested-sidebar-title nested-sidebar-sec-title">
            Personal
          </p>
          {!isLoading && !error && data.filter((c) => c.owner).map((calendar) => (
            <button
              type="button"
              key={calendar.id}
              className={renderClassName(calendar)}
              onClick={() => setSelectedCalendarId(calendar.id)}
            >
              <Link to={`/calendar/${calendar.id}`} className="nested-sidebar-link">
                <p>{calendar.name}</p>
              </Link>
              <button type="button" className="calendar-nav-elem-remove" onClick={() => removeCalendar(calendar.id)}>
                <img id={`trash${calendar.id.toString()}`} src={TrashBin} alt="X" className="trash-bin-icon" />
              </button>
            </button>
          ))}
          <div className="action-btn-calendar">
            <Link to="/calendar/add">
              <button type="button">+</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarsSidebar;
