import React from 'react';
import PropTypes from 'prop-types';
import { useGetCalendarMembersByCalendarIdQuery } from '../store/api';

const propTypes = {
  calendarId: PropTypes.number.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

const CalendarMemberModal = ({ calendarId, setOpenModal }) => {
  const { data, isLoading, isError } = useGetCalendarMembersByCalendarIdQuery(calendarId);

  const render = () => {
    console.log(data);
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (isError) {
      return <p>Error</p>;
    }
    return data && data.map((member) => (
      <div className="member" key={member.id}>
        <p>{member.name}</p>
        <p>{member.role}</p>
      </div>
    ));
  };

  return (
    <div className="modal-background-member">
      <div className="modal-container">
        <div className="title-close-btn">
          <button type="button" onClick={() => { setOpenModal(false); }} className="exit-events-view">
            X
          </button>
        </div>
        <div className="title">
          <h1>
            Members
          </h1>
        </div>
        <div className="body">
          {render()}
        </div>
      </div>
    </div>
  );
};

CalendarMemberModal.propTypes = propTypes;

export default CalendarMemberModal;
