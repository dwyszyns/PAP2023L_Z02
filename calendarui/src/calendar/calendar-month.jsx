import React, { useState } from 'react';
import dayjs from 'dayjs';
import './calendar-month.css';
import PropTypes from 'prop-types';
import { getDayArray } from './util';
import { useGetCalendarByCalendarIdQuery } from '../store/api';
import Modal from './modal';

const propTypes = {
  calendarId: PropTypes.number.isRequired,
};

const CalendarMonth = ({ calendarId }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const { data, isLoading, error } = useGetCalendarByCalendarIdQuery(calendarId);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDay, setModalDay] = useState(0);

  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const handlePrevMonth = () => setCurrentMonth(currentMonth - 1);

  const handleNextMonth = () => setCurrentMonth(currentMonth + 1);

  const handleReset = () => setCurrentMonth(dayjs().month());

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
      <div className="small-calendar-h1">
        <div className="l1"> </div>
        <div className="text-header-small-calendar">
          {dayjs(new Date(dayjs().year(), currentMonth)).format('MMMM YYYY')}
        </div>
        <div className="l2">
          <button className="small-calendar-button" onClick={handleReset} type="button">
            <span className="small-calendar-reset-button">
              Today
            </span>
          </button>
        </div>
      </div>
      <div className="small-calendar-elems">
        <button className="small-calendar-cursor-pointer-left" onClick={handlePrevMonth} type="button" />
        <div className="small-calendar-array">
          {dayNames.map((day) => (
            <p key={day} className="text-day-small-calendar">
              {day}
            </p>
          ))}
          {getDayArray(currentMonth).filter((day) => day !== undefined).map((day) => (
            <button
              key={day.format('DD-MM-YYYY')}
              onClick={() => {
                setModalDay(day);
                setModalOpen(true);
              }}
              type="button"
              className={`small-calendar-button-${getDayClass(day)}`}
            >
              <span className="small-calendar-day">
                <div className>{day.format('D')}</div>
                <div className="event-elems">{getEventsForDay(day) && getEventsForDay(day).map((event) => <p key={event.id}>{event.name}</p>)}</div>
              </span>
            </button>
          ))}
          {modalOpen && (
          <Modal setOpenModal={setModalOpen} calendarId={calendarId} modalDay={modalDay} />
          )}
        </div>
        <button className="small-calendar-cursor-pointer-right" onClick={handleNextMonth} type="button" />
      </div>
    </div>
  );
};

CalendarMonth.propTypes = propTypes;

export default CalendarMonth;
