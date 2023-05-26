import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCalendarsForMemberIdQuery } from '../../store';
import '../sidebar.css';
import '../friends/friend-request.css';
import TrashBin from './trash-bin.svg';
import { useRemoveCalendarMutation } from '../../store/api';
import SearchIcon from '../friends/search-icon.svg';

const CalendarsSidebar = () => {
  const [selectedCalendarId, setSelectedCalendarId] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
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
        <div className="searching-friends-container">
          <input
            type="text"
            name="name"
            value={selectedFilter}
            placeholder={'Calendar name'.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
            className="searching-friends-input"
            onChange={(e) => setSelectedFilter(e.target.value)}
          />
          <button
            type="button"
            className="searching-friends-button"
          >
            <img src={SearchIcon} alt="X" className="seen-icon" />
          </button>
        </div>
        <div className="nested-sidebar-list-calendar">
          <>
            {selectedFilter.length !== 0 ? (
              <>
                {!isLoading && !error && data.map((calendar) => (
                  <>
                    {calendar.name.includes(selectedFilter) ? (
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
                    ) : ('')}
                  </>
                ))}
              </>
            ) : (
              <>
                <p className="nested-sidebar-title nested-sidebar-sec-title">
                  Shared
                </p>
                {!isLoading && !error && data.filter((c) => c.role !== 'owner').map((calendar) => (
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
                {!isLoading && !error && data.filter((c) => c.role === 'owner').map((calendar) => (
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
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default CalendarsSidebar;
