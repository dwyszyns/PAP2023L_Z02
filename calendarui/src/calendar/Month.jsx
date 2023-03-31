import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import './Month.css';
import { getMonth } from './util';

const propTypes = {
  monthIndex: PropTypes.number.isRequired,
};

const Month = ({ monthIndex }) => (
  <div className="flex-1">
    {getMonth(monthIndex).map((row, index) => (
      <React.Fragment key={row}>
        {row.map((day) => (
          <div className="flex-1-day">
            <Day day={day} key={day} rowIdx={index} />
          </div>
        ))}
      </React.Fragment>
    ))}
  </div>
);

Month.propTypes = propTypes;

export default Month;
