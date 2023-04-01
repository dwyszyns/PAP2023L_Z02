import React from 'react';
import './day.css';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const propTypes = {
  day: PropTypes.node.isRequired,
  rowIdx: PropTypes.number.isRequired,
};

export default function Day({ day, rowIdx }) {
  function getCurrentDayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'current'
      : '';
  }
  return (
    <div className="border">
      <header className="day-col">
        {rowIdx === 0 && (
          <p className="day">
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p className={`text-day-${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
    </div>
  );
}

Day.propTypes = propTypes;
