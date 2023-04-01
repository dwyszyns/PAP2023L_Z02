import React from 'react';
import CreateEventButton from './createEventButton';
import './calendarSidebar.css';
import SmallCalendar from './smallCalendar';

const CalendarSidebar = () => (
  <aside className="calendar_sidebar">
    <CreateEventButton />
    <SmallCalendar />
  </aside>
);

export default CalendarSidebar;
