import React from 'react';
import './calendar-header.css';
import PropTypes from 'prop-types';

const propTypes = {
  calendarName: PropTypes.string.isRequired,
};

const CalendarHeader = ({ calendarName }) => (
  <header className="calendar-header">
    <h1 className="calendar-header-title">
      {calendarName}
    </h1>
  </header>
);

CalendarHeader.propTypes = propTypes;

export default CalendarHeader;
