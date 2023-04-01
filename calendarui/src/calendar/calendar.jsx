import React, { useState } from 'react';
import './calendar.css';
import dayjs from 'dayjs';
import CalendarSidebar from './calendarSidebar';
import CalendarHeader from './CalendarHeader';
import Month from './Month';

function CalendarElement() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());

  return (
    <>
      <div className="h-screen">
        <CalendarHeader monthIndex={currentMonth} setMonthIndex={setCurrentMonth} />
        <div className="flex flex-1">
          <CalendarSidebar />
          <Month monthIndex={currentMonth} />
        </div>
      </div>
    </>
  );
}

export default CalendarElement;
