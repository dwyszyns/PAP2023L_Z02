import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './calendar-month.css';
import PropTypes from 'prop-types';
import getDayArray from './util';
import { useGetCalendarByCalendarIdQuery } from '../store/api';
import EventModal from './event-modal';

const propTypes = {
  calendarId: PropTypes.number.isRequired,
};

const CalendarMonth = ({ calendarId }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const { data, isLoading, error } = useGetCalendarByCalendarIdQuery(calendarId);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDay, setModalDay] = useState(0);

  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const getDayClass = (day) => {
    const format = 'DD-MM-YY';
    if ((currentMonth % 12) + (currentMonth < 0 ? 12 : 0) !== day.month() % 12) {
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

  useEffect(() => {
    setCurrentMonth(dayjs().month());
  }, []);

  return (
    <div className="small-calendar">
      <div className="small-calendar-h1">
        <div className="l1"> </div>
        <div className="text-header-small-calendar">
          {dayjs(new Date(dayjs().year(), currentMonth)).format('MMMM YYYY')}
        </div>
        <div className="l2">
          <button className="small-calendar-button" onClick={() => setCurrentMonth(dayjs().month())} type="button">
            <span className="small-calendar-reset-button">
              Today
            </span>
          </button>
        </div>
      </div>
      <div className="small-calendar-elems">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          className="small-calendar-cursor-pointer"
          onClick={() => setCurrentMonth(currentMonth - 1)}
          type="button"
        />
        <div className="small-calendar-calendar-body">
          <div className="small-calendar-day-labels">
            {dayNames.map((day) => (
              <p key={day} className="text-day-small-calendar">
                {day}
              </p>
            ))}
          </div>
          <div className="small-calendar-array">
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
                  <div className="event-elems" id={day.format('YYYY-MM-DD')}>
                    {getEventsForDay(day) && getEventsForDay(day).length > 2 ? (
                      <>
                        <div className="event-of-day">
                          <p key={getEventsForDay(day)[0].id} className="event-of-day-name" id={getEventsForDay(day)[0].id}>
                            {getEventsForDay(day)[0].name}
                          </p>
                        </div>
                        <div className="event-of-day">
                          <p key={getEventsForDay(day)[1].id} className="event-of-day-name" id={getEventsForDay(day)[1].id}>
                            {getEventsForDay(day)[1].name}
                          </p>
                        </div>
                        <div className="event-of-day">
                          <p className="event-of-day-name">
                            {`+${(getEventsForDay(day).length - 2).toString()}`}
                          </p>
                        </div>
                      </>
                    ) : '' }

                    {getEventsForDay(day)
                      && getEventsForDay(day).length < 3
                      && getEventsForDay(day).map((event) => (
                        <div className="event-of-day" key={event.id} id={`event-day-${event.id}`}>
                          <p key={event.id} id={event.id} className="event-of-day-name">
                            {event.name}
                          </p>
                        </div>
                      ))}
                  </div>
                </span>
              </button>
            ))}
            {modalOpen && (
              <EventModal
                setOpenModal={setModalOpen}
                calendarId={calendarId}
                modalDay={modalDay}
              />
            )}
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="small-calendar-cursor-pointer right" onClick={() => setCurrentMonth(currentMonth + 1)} type="button" />
      </div>
    </div>
  );
};

CalendarMonth.propTypes = propTypes;

export default CalendarMonth;
