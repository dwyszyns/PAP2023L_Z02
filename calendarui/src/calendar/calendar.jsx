import React, { useState } from 'react';
import './calendar.css';
import dayjs from 'dayjs';
import CalendarSidebar from './calendarSidebar';
import CalendarHeader from './calendarHeader';
import Month from './month';

function CalendarElement() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());

  return (
    <>
      <div className="h-screen">
        <CalendarHeader monthIndex={currentMonth} setMonthIndex={setCurrentMonth} />
        <div className="flex calendar-month">
          <CalendarSidebar />
          <Month monthIndex={currentMonth} />
        </div>
      </div>
    </>
  );
}

export default CalendarElement;
