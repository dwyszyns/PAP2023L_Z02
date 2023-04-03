import React from 'react';
import './calendar.css';
import { useParams } from 'react-router-dom';
import CalendarHeader from './calendar-header';
import SmallCalendar from './small-calendar';
import { useGetCalendarByCalendarIdQuery } from '../store/api';

const Calendar = () => {
  const { calendarId } = useParams();
  const { error, data, isLoading } = useGetCalendarByCalendarIdQuery(calendarId);

  return (
    data ? (
      <div className="calendar-container">
        <CalendarHeader calendarName={data.name} />
        <div className="calendar-main-view">
          <SmallCalendar />
        </div>
      </div>
    ) : <></>
  );
};

export default Calendar;
