import React, { useState } from 'react';
import './modal.css';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { useGetCalendarByCalendarIdQuery } from '../store/api';

const propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  calendarId: PropTypes.number.isRequired,
  modalDay: PropTypes.number.isRequired,
};

const Modal = ({ setOpenModal, calendarId, modalDay }) => {
  const { data, isLoading, error } = useGetCalendarByCalendarIdQuery(calendarId);
  const fieldNames = ['name', 'startTime', 'startDay', 'endTime', 'endDay'];
  const [fields, setFields] = useState({
    name: '',
    startTime: '',
    endTime: '',
    startDay: '',
    endDay: '',
  });

  const getEventsForDay = (day) => {
    const formattedDay = day.format('YYYY-MM-DD');
    return !(isLoading || error) && data.events[formattedDay];
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
                <div className="event-view-list">
                  <div className="elemx">
                    <p key={event.id} className="event-elem-name">
                      {event.name}
                      {' : '}
                      {event.startDate.substr(11, 5)}
                      {' - '}
                      {event.endDate.substr(11, 5)}
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
                      type={fieldName === 'password' || fieldName === 'confirmPassword' ? 'password' : 'text'}
                      name={fieldName}
                      value={fields[fieldName]}
                      placeholder={fieldName.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
                      className="add-event-input"
                      onChange={(e) => setFields({ ...fields, [fieldName]: e.target.value })}
                    />
                  </>
                ))}
                <button type="button" className="auth-submit-button">Add</button>
              </div>
            </div>
          </Popup>

        </div>
      </div>
    </div>
  );
};

Modal.propTypes = propTypes;

export default Modal;
