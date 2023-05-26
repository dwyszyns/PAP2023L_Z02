import React from 'react';
import PropTypes from 'prop-types';
import {
  useGetCalendarMembersByCalendarIdQuery,
  useRemoveMemberFromCalendarMutation,
  useUpdateMemberRoleMutation,
} from '../store/api';
import MemberIcon from '../icons/member-icon';
import TrashBin from '../sidebar/calendars/trash-bin.svg';

const propTypes = {
  calendarId: PropTypes.number.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

const CalendarMemberModal = ({ calendarId, setOpenModal }) => {
  const { data, isLoading, isError } = useGetCalendarMembersByCalendarIdQuery(calendarId);
  const [updateRole] = useUpdateMemberRoleMutation();
  const [removeMember] = useRemoveMemberFromCalendarMutation();

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
        <MemberIcon />
        <p>{member.name}</p>
        <select
          className="member-role-select"
          value={member.role}
          onChange={(type) => updateRole({ calendarId, memberId: member.id, role: type.target.value })}
          name="guest"
          disabled={member.role === 'owner'}
        >
          <option value="owner" disabled>Owner</option>
          <option value="maintainer">Maintainer</option>
          <option value="guest">Guest</option>
        </select>
        {member.role !== 'owner' && (
        <button type="button" className="calendar-nav-elem-remove" onClick={() => removeMember({ calendarId, memberId: member.id })}>
          <img id={`trash${member.id.toString()}`} src={TrashBin} alt="X" className="trash-bin-icon" />
        </button>
        )}
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
