import React, { useState } from 'react';
import dayjs from 'dayjs';
import './small-calendar.css';
import { getDayArray } from './util';

const SmallCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());

  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const getDayClass = (day) => {
    const format = 'DD-MM-YY';
    if (dayjs().month() !== day.month()) {
      return 'other';
    }
    const today = dayjs().format(format);
    const currentDay = day.format(format);
    return (currentDay === today) ? 'current' : '';
  };

  return (
    <div className="small-calendar">
      <header className="small-calendar-header">
        <p className="text-header-small-calendar">
          {dayjs(new Date(dayjs().year(), currentMonth)).format('MMMM YYYY')}
        </p>
      </header>
      <div className="small-calendar-array">
        {dayNames.map((day) => (
          <p key={day} className="text-day-small-calendar">
            {day}
          </p>
        ))}
        {getDayArray(currentMonth).filter((day) => day !== undefined).map((day) => (
          <button key={day.format('DD-MM-YYYY')} type="button" className={`small-calendar-button-${getDayClass(day)}`}>
            <span className="small-calendar-day">
              {day.format('D')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
