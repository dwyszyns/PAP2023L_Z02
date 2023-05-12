import React, { useState } from 'react';
import dayjs from 'dayjs';
import './calendar-month.css';
import PropTypes from 'prop-types';
import { getDayArray } from './util';
import { useGetCalendarByCalendarIdQuery } from '../store/api';

const propTypes = {
  calendarId: PropTypes.number.isRequired,
};

const CalendarMonth = ({ calendarId }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const { data, isLoading, error } = useGetCalendarByCalendarIdQuery(calendarId);

  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const getDayClass = (day) => {
    console.log(day.format('YYYY-MM-DD'));
    const format = 'DD-MM-YY';
    if (currentMonth !== day.month()) {
      return 'other';
    }
    const today = dayjs().format(format);
    const currentDay = day.format(format);
    return (currentDay === today) ? 'current' : '';
  };

  const getEventsForDay = (day) => {
    const formattedDay = day.format('YYYY-MM-DD');
    return !(isLoading || error) && data.events[formattedDay];
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
              <div>{day.format('D')}</div>
              <div>{getEventsForDay(day) && getEventsForDay(day).map((event) => <p key={event.id}>{event.name}</p>)}</div>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

CalendarMonth.propTypes = propTypes;

export default CalendarMonth;
