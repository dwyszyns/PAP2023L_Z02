import React from 'react';
import './CalendarHeader.css';
import './calendar.svg';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const propTypes = {
  monthIndex: PropTypes.number.isRequired,
  setMonthIndex: PropTypes.func.isRequired,
};

export default function CalendarHeader({ monthIndex, setMonthIndex }) {
  const handlePrevMonth = () => setMonthIndex(monthIndex - 1);

  const handleNextMonth = () => setMonthIndex(monthIndex + 1);

  return (
    <header className="calendar-header">
      {/* <img src="calendar.svg" alt="CALENDAR" className="calendar-logo" /> */}
      <h1 className="calendar-title">
        My calendar
      </h1>
      <button className="calendar-change-sth-button" type="button">
        Today
      </button>
      <button onClick={handlePrevMonth} type="button">
        <span className="calendar-cursor-pointer-left">
          LEFT
        </span>
      </button>
      <button onClick={handleNextMonth} type="button">
        <span className="calendar-cursor-pointer-right">
          RIGHT
        </span>
      </button>
      <h2 className="calendar-header-month-year">
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </header>
  );
}

CalendarHeader.propTypes = propTypes;
