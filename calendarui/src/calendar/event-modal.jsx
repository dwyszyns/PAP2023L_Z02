import React, { useState } from 'react';
import './modal.css';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { useAddEventMutation, useGetCalendarByCalendarIdQuery } from '../store/api';

const propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  calendarId: PropTypes.number.isRequired,
  modalDay: PropTypes.number.isRequired,
};

const EventModal = ({ setOpenModal, calendarId, modalDay }) => {
  const [fields, setFields] = useState({
    name: '',
    startTime: '',
    endTime: '',
    calendarId,
  });

  const [errors, setErrors] = useState({
    name: false,
    startTime: false,
    endTime: false,
  });

  const [addEvent, { isError, isSuccess }] = useAddEventMutation();
  const { data, isLoading, error } = useGetCalendarByCalendarIdQuery(calendarId);
  const fieldNames = ['name', 'startTime', 'endTime'];
  const getEventsForDay = (day) => {
    const formattedDay = day.format('YYYY-MM-DD');
    return !(isLoading || error) && data.events[formattedDay];
  };

  const handleSubmit = () => {
    let newErrors = { ...errors };
    let isValid = true;
    fieldNames.forEach((fieldName) => {
      if (fields[fieldName].trim() === '') {
        newErrors = { ...newErrors, [fieldName]: true };
        isValid = false;
      } else {
        newErrors = { ...newErrors, [fieldName]: false };
      }
    });
    if (isValid) {
      const { ...body } = fields;
      addEvent(body);
    }
    setErrors(newErrors);
  };

  const render = () => {
    if (isError) {
      return <p className="auth-error-message">Some problems</p>;
    }
    if (isSuccess) {
      return <p>OK</p>;
    }
    return <></>;
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-close-btn">
          <button type="button" onClick={() => { setOpenModal(false); }}>
            X
          </button>
        </div>
        <div className="title">
          <h1>
            Events
            {'   '}
            {modalDay.format('DD-MM-YY')}
          </h1>
          {getEventsForDay(modalDay) === undefined ? (<span className="no-events">No events for today.</span>) : (
            <div className="event-elems-view">
              {getEventsForDay(modalDay) && getEventsForDay(modalDay).map((event) => (
                <div className="event-view-list" key={event.id}>
                  <div className="elemx">
                    <p key={event.id} className="event-elem-name">
                      {`${event.name} : ${event.startDate} - ${event.endDate} `}
                    </p>
                  </div>
                  <div className="button-del-ev">
                    <button type="button" className="event-del-button">X</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="body" />
        <div className="footer">
          <button
            type="button"
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancel-btn-event"
          >
            Cancel
          </button>

          <Popup trigger={<button type="button"> Add</button>} position="right center">
            <div className="popup-background">
              <div className="modal-container">
                <h2 className="title-add-event">Add new event</h2>
                {fieldNames.map((fieldName) => (
                  <>
                    <input
                      key={fieldName}
                      id={`auth-${fieldName}-input`}
                      type="text"
                      name={fieldName}
                      value={fields[fieldName]}
                      placeholder={fieldName.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
                      className="add-event-input"
                      onChange={(e) => setFields({ ...fields, [fieldName]: e.target.value })}
                    />
                    {errors[fieldName] && <p className="auth-error-message">Please enter a valid value</p>}
                  </>
                ))}
                <button type="button" className="auth-submit-button" onClick={handleSubmit}>Add</button>
                <div className="auth-footer">
                  {render()}
                </div>
              </div>
            </div>
          </Popup>

        </div>
      </div>
    </div>
  );
};

EventModal.propTypes = propTypes;

export default EventModal;
