import React, { useState } from 'react';
import './calendar-header.css';
import './event-modal.css';
import PropTypes from 'prop-types';
import CalendarMembersIcon from '../icons/calendar-members-icon';
import CalendarMemberModal from './calendar-member-modal';

const propTypes = {
  calendarName: PropTypes.string.isRequired,
  calendarId: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
};

const CalendarHeader = ({ calendarName, calendarId, role }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className="calendar-header">
        <h1 className="calendar-header-title">
          {calendarName}
        </h1>
        {role === 'owner'
                && (
                <button
                  className="calendar-members-button"
                  type="button"
                  onClick={() => setOpenModal(true)}
                >
                  <CalendarMembersIcon />
                </button>
                )}
      </header>
      {openModal && <CalendarMemberModal calendarId={calendarId} setOpenModal={setOpenModal} />}
    </>
  );
};

CalendarHeader.propTypes = propTypes;

export default CalendarHeader;
