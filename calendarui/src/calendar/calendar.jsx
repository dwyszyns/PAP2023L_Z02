import React from 'react';
import './calendar.css';
import {useParams} from 'react-router-dom';
import CalendarHeader from './calendar-header';
import CalendarMonth from './calendar-month';
import {useGetCalendarByCalendarIdQuery} from '../store/api';

const Calendar = () => {
  const { calendarId } = useParams();
  const { error, data, isLoading } = useGetCalendarByCalendarIdQuery(calendarId);

    if (!isLoading && error) {
        return <div className="calendar-private-message">Sorry, this calendar is private.</div>;
    }

  return (
    data ? (
      <div className="calendar-container">
        <CalendarHeader calendarId={data.id} calendarName={data.name} role={data.role} />
        <div className="calendar-main-view">
          <CalendarMonth calendarId={calendarId} />
        </div>
      </div>
    ) : <></>
  );
};

export default Calendar;
