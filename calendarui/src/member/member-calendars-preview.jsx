import React from 'react';
import PropTypes from 'prop-types';
import './member.css';
import { Link } from 'react-router-dom';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  calendars: PropTypes.array.isRequired,
};

const MemberCalendarsPreview = ({ calendars }) => (
  <div className="calendars">
    {calendars.map((calendar) => (
      <Link to={`../../calendar/${calendar.id}`} relative="path" key={calendar.id}>
        <div className="calendar">
          {calendar.name}
        </div>
      </Link>
    ))}
  </div>
);

MemberCalendarsPreview.propTypes = propTypes;

export default MemberCalendarsPreview;
