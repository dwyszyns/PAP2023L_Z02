import React from 'react';
import PropTypes from 'prop-types';
import './icons.css';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  onClick: () => {},
  selected: false,
};

const IconButton = ({
  children, onClick, selected, title,
}) => (
  <button type="button" className={['button', selected ? 'selected' : ''].join(' ')} onClick={onClick} title={title}>
    {children}
  </button>
);

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
