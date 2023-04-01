import React from 'react';
import './calendarHeader.css';
import './calendar.svg';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import CalendarIcon from '../icons/calendar-icon';

const propTypes = {
  monthIndex: PropTypes.number.isRequired,
  setMonthIndex: PropTypes.func.isRequired,
};

export default function CalendarHeader({ monthIndex, setMonthIndex }) {
  const handlePrevMonth = () => setMonthIndex(monthIndex - 1);

  const handleNextMonth = () => setMonthIndex(monthIndex + 1);

  const handleReset = () => setMonthIndex(
    monthIndex === dayjs().month()
      ? monthIndex + Math.random()
      : dayjs().month(),
  );

  return (
    <header className="calendar-header">
      <CalendarIcon classname="calendar-logo" />
      <h1 className="calendar-title">
        My calendar
      </h1>
      <button onClick={handleReset} className="calendar-change-sth-button" type="button">
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
