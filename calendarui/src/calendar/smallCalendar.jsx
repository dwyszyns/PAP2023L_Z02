import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import './smallCalendar.css';
import { getMonth } from './util';

const propTypes = {
  currentMonthIndex: PropTypes.number.isRequired,
  setCurrentMonthIndex: PropTypes.func.isRequired,
  currentMonth: PropTypes.node.isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
};

function SmallCalendar() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => () => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  const handlePrevMonth = () => setCurrentMonthIndex(currentMonthIndex - 1);

  const handleNextMonth = () => setCurrentMonthIndex(currentMonthIndex + 1);

  return (
    <div className="small-calendar">
      <header className="small-calendar-header">
        <p className="text-header-small-calendar">
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format('MMMM YYYY')}
        </p>
        {/* eslint-disable-next-line react/button-has-type */}
        <button className="small-calendar-button-sideways" onClick={handlePrevMonth} type="button">
          <span className="small-calendar-cursor-pointer-left">
            LEFT
          </span>
        </button>
        <button className="small-calendar-button-sideways" onClick={handleNextMonth} type="button">
          <span className="small-calendar-cursor-pointer-right">
            RIGHT
          </span>
        </button>
      </header>
      <div className="small-calendar-array">
        {currentMonth[0].map((day, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={i} className="text-small-calendar-button">
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={i}>
            {row.map((day, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <button key={index} type="button" className="small-calendar-button">
                <span className="small-calendar-day">
                  {day.format('D')}
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

SmallCalendar.propTypes = propTypes;

export default SmallCalendar;
